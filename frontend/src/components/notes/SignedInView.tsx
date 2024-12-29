import { useEffect, useState } from 'react';
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import styles from '../../styles/NotePage.module.css';
import styleUtils from '../../styles/utils.module.css';
import Note from './Note';
import NoteForm from './NoteForm';
import * as NotesApi from '../../network/notes_api';
import { Note as NoteModel } from '../../models/notes';

const SignedInView = () => {
	const [notes, setNotes] = useState<NoteModel[]>([]);
	const [notesLoading, setNotesLoading] = useState(true);
	const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);
	const [isNoteFormVisible, setIsNoteFormVisible] = useState(false);
	const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

	useEffect(() => {
		const loadNotes = async () => {
			try {
				setShowNotesLoadingError(false);
				setNotesLoading(true);
				const notes = await NotesApi.fetchNotes();
				setNotes(notes);
			} catch (error) {
				console.error(error);
				setShowNotesLoadingError(true);
			} finally {
				setNotesLoading(false);
			}
		};
		loadNotes();
	}, []);

	async function deleteNote(note: NoteModel) {
		try {
			await NotesApi.deleteNote(note._id);
			setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
		} catch (error) {
			console.error(error);
			alert(error);
		}
	}

	const notesGrid = (
		<Row xs={1} md={2} xl={3} className={`g-4 ${styles.notesGrid}`}>
			{notes.map((note) => (
				<Col key={note._id}>
					<Note note={note} className={styles.note} onDeleteNoteClicked={deleteNote} onNoteClicked={setNoteToEdit} />
				</Col>
			))}
		</Row>
	);

	return (
		<>
			<Button
				onClick={() => setIsNoteFormVisible(true)}
				className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
				id='button'
			>
				<FaPlus />
				Add New Note
			</Button>
			{notesLoading && <Spinner animation='border' variant='light' />}
			{showNotesLoadingError && <p>Something went wrong. Please refresh the page.</p>}
			{!notesLoading && !showNotesLoadingError && <>{notes.length > 0 ? notesGrid : <p>You don't have any notes yet</p>}</>}
			{isNoteFormVisible && (
				<NoteForm
					onDismiss={() => setIsNoteFormVisible(false)}
					onNoteSaved={(newNote) => {
						setNotes([...notes, newNote]);
						setIsNoteFormVisible(false);
					}}
				/>
			)}
			{noteToEdit && (
				<NoteForm
					noteToEdit={noteToEdit}
					onDismiss={() => setNoteToEdit(null)}
					onNoteSaved={(updatedNote) => {
						setNotes(
							notes.map((existingNote) => (existingNote._id === updatedNote._id ? updatedNote : existingNote))
						);
						setNoteToEdit(null);
					}}
				/>
			)}
		</>
	);
};

export default SignedInView;
