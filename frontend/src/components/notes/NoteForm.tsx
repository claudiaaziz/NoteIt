import { Button, Form, Modal } from 'react-bootstrap';
import { Note } from '../../models/notes';
import { useForm } from 'react-hook-form';
import { NoteInput } from '../../network/notes_api';
import * as NotesApi from '../../network/notes_api';
import TextInputField from '../form/TextInputField';
import styles from '../../styles/utils.module.css';

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
			body: noteToEdit?.body || '',
		},
	});

	async function onSubmit(input: NoteInput) {
		try {
			let noteRes: Note;

			if (noteToEdit) {
				noteRes = await NotesApi.updateNote(noteToEdit._id, input);
			} else {
				noteRes = await NotesApi.createNote(input);
			}
			onNoteSaved(noteRes);
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
					<TextInputField
						name='title'
						label='Title'
						type='text'
						placeholder='Title'
						register={register}
						registerOptions={{ required: 'Title is Required' }}
						error={errors.title}
					/>
					<TextInputField name='body' label='Body' as='textarea' placeholder='Body' register={register} rows={5} />
				</Form>
			</Modal.Body>

			<Modal.Footer>
				<Button type='submit' form='addNoteForm' disabled={isSubmitting} id='button' className={styles.width100}>
					{noteToEdit?._id ? 'Edit Note' : 'Add Note'}
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default NoteForm;
