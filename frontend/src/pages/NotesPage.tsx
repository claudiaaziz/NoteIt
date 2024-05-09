import { Container } from 'react-bootstrap';
import SignedInView from '../components/notes/SignedInView';
import SignedOutView from '../components/notes/SignedOutView';
import styles from '../styles/NotePage.module.css';
import { User } from '../models/user';

interface NotesPageProps {
  sessionUser: User | null;
}

const NotesPage = ({ sessionUser }: NotesPageProps) => {
  return (
    <Container className={styles.notesPage}>
      {sessionUser ? <SignedInView /> : <SignedOutView />}
    </Container>
  );
};

export default NotesPage;
