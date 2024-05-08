import { Note } from '../models/notes';
import { User } from '../models/user';

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

export async function getSessionUser(): Promise<User> {
  const res = await fetchData('/api/users', { method: 'GET' });
  return res.json();
}

export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
  const res = await fetchData('/api/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  return res.json();
}

export interface SignInCredentials {
  username: string;
  password: string;
}

export async function signIn(credentials: SignInCredentials): Promise<User> {
  const res = await fetchData('/api/users/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  return res.json();
}

export async function signOut() {
  await fetchData('/api/users/signout', { method: 'POST' });
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

export async function updateNote(
  noteId: string,
  note: NoteInput
): Promise<Note> {
  const res = await fetchData(`/api/notes/${noteId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });

  return res.json();
}

export async function deleteNote(noteId: string) {
  await fetchData(`/api/notes/${noteId}`, { method: 'DELETE' });
}
