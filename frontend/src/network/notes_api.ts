import { Note } from '../models/notes';

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const res = await fetch(input, init);

  if (res.ok) {
    return res;
  } else {
    const errorBody = await res.json();
    const errorMsg = errorBody.error;
    throw Error(errorMsg);
  }
}

export async function fetchNotes(): Promise<Note[]> {
  const res = await fetchData('/api/notes', { method: 'GET' });
  return res.json();
}

export interface NoteInput {
  title: string;
  body?: string;
}

export async function createNote(note: NoteInput): Promise<Note> {
  const res = await fetchData('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
  
  return res.json();
}
