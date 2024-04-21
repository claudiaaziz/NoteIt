import { useEffect, useState } from 'react';
import { Note as NoteModel } from './models/notes';
import Note from './components/Note';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './styles/NotePage.module.css'

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const res = await fetch('/api/notes', {
          method: 'GET',
        });
        const notes = await res.json();
        setNotes(notes);
      } catch (error) {
        console.error(error);
      }
    };
    loadNotes();
  }, []);

  return (
    <Container>
      <Row xs={1} md={2} xl={3} className='g-4'>
        {notes.map((note) => (
          <Col key={note._id}>
            <Note note={note} className={styles.note} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
