import { useEffect, useState } from 'react';
import { Note as NoteModel } from './models/notes';
import Note from './components/Note';
import { Button, Col, Container, Row } from 'react-bootstrap';
import styles from './styles/NotePage.module.css';
import styleUtils from './styles/utils.module.css';
import * as NotesApi from './network/notes_api';
import NoteForm from './components/AddNoteDialog';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [isNoteFormVisible, setIsNoteFormVisible] = useState(false);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
      }
    };
    loadNotes();
  }, []);

  return (
    <Container>
      <Button onClick={() => setIsNoteFormVisible(true)} className={`mb-4 ${styleUtils.blockCenter}`}>Add New Note</Button>
      <Row xs={1} md={2} xl={3} className='g-4'>
        {notes.map((note) => (
          <Col key={note._id}>
            <Note note={note} className={styles.note} />
          </Col>
        ))}
      </Row>
      {isNoteFormVisible && (
        <NoteForm
          onDismiss={() => setIsNoteFormVisible(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setIsNoteFormVisible(false);
          }}
        />
      )}
    </Container>
  );
}

export default App;
