import { Card } from 'react-bootstrap';
import { Note as NoteModel } from '../models/notes';
import styles from '../styles/Note.module.css'

interface NoteProps {
  note: NoteModel;
}

const Note = ({ note }: NoteProps) => {
  const { title, body, createdAt, updatedAt } = note;
  return (
    <Card className={styles.noteCard}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text className={styles.cardBody}>{body}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Note;
