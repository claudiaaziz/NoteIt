import { RequestHandler } from 'express';
import NoteModel from '../models/note';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { assertIsDefined } from '../util/assertIsDefined';

export const getNotes: RequestHandler = async (req, res, next) => {
  const sessionUserId = req.session.userId;

  try {
    assertIsDefined(sessionUserId);
    const notes = await NoteModel.find({ userId: sessionUserId }).exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  const sessionUserId = req.session.userId;
  const noteId = req.params.noteId;

  try {
    assertIsDefined(sessionUserId);

    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, 'Invalid note id.');
    }

    const note = await NoteModel.findById(noteId).exec();

    if (!note) throw createHttpError(404, 'Note not found.');

    if (!note.userId.equals(sessionUserId)) {
      throw createHttpError(401, 'You cannot access this note');
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

interface CreateNoteBody {
  title?: string;
  body?: string;
}

export const createNote: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody,
  unknown
> = async (req, res, next) => {
  const sessionUserId = req.session.userId;
  const title = req.body.title;
  const body = req.body.body;

  try {
    assertIsDefined(sessionUserId);

    if (!title) throw createHttpError(400, 'Note must have a title.');
    const newNote = await NoteModel.create({
      userId: sessionUserId,
      title,
      body,
    });

    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

interface UpdateNoteParams {
  noteId: string;
}

interface UpdateNoteBody {
  title?: string;
  body?: string;
}

export const updateNote: RequestHandler<
  UpdateNoteParams,
  unknown,
  UpdateNoteBody,
  unknown
> = async (req, res, next) => {
  const sessionUserId = req.session.userId;
  const noteId = req.params.noteId;
  const newTitle = req.body.title;
  const newBody = req.body.body;

  try {
    assertIsDefined(sessionUserId);

    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, 'Invalid note id.');
    }

    if (!newTitle) throw createHttpError(400, 'Note must have a title.');

    const note = await NoteModel.findById(noteId).exec();

    if (!note) throw createHttpError(404, 'Note not found.');

    if (!note.userId.equals(sessionUserId)) {
      throw createHttpError(401, 'You cannot access this note');
    }

    note.title = newTitle;
    note.body = newBody;
    const updatedNote = await note.save();
    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

export const deleteNote: RequestHandler = async (req, res, next) => {
  const sessionUserId = req.session.userId;
  const noteId = req.params.noteId;

  try {
    assertIsDefined(sessionUserId);

    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, 'Invalid note id.');
    }

    const note = await NoteModel.findById(noteId).exec();

    if (!note) throw createHttpError(404, 'Note not found.');

    if (!note.userId.equals(sessionUserId)) {
      throw createHttpError(401, 'You cannot access this note');
    }

    await NoteModel.deleteOne({ _id: noteId }); // or note.remove()
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
