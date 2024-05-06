import { Button, Form, Modal } from 'react-bootstrap';
import { Note } from '../models/notes';
import { useForm } from 'react-hook-form';
import { NoteInput } from '../network/notes_api';
import * as NotesApi from '../network/notes_api';

interface NoteFormProps {
  noteToEdit?: Note;
  onDismiss: () => void;
  onNoteSaved: (note: Note) => void;
}

const NoteForm = ({ noteToEdit, onDismiss, onNoteSaved }: NoteFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>({
    defaultValues: {
      title: noteToEdit?.title || '',
      body: noteToEdit?.body || ''
    }
  });

  async function onSubmit(input: NoteInput) {
    try {
      let noteRes: Note;

      if (noteToEdit) {
        noteRes = await NotesApi.updateNote(noteToEdit._id, input)
      } else {
        noteRes = await NotesApi.createNote(input);
      }
      onNoteSaved(noteRes)
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>{noteToEdit?._id ? 'Edit Note' : 'Add Note'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id='addNoteForm' onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className='mb-3'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              placeholder='Title'
              isInvalid={!!errors.title}
              {...register('title', { required: 'Title is Required' })}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Body</Form.Label>
            <Form.Control
              as='textarea'
              rows={5}
              placeholder='Body'
              {...register('body')}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button type='submit' form='addNoteForm' disabled={isSubmitting}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NoteForm;
