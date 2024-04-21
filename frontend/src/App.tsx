import React, { useEffect, useState } from 'react';
import { Note as NoteModel } from './models/notes';
import Note from './components/Note';

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
    <div>
      {notes.map((note) => (
        <Note note={note} key={note._id} />
      ))}
    </div>
  );
}

export default App;
