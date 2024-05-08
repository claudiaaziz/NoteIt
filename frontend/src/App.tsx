import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import styles from './styles/NotePage.module.css';
import SignUpModal from './components/session/SignUpModal';
import SignInModal from './components/session/SignInModal';
import NavBar from './components/navbar/NavBar';
import { User } from './models/user';
import * as NotesApi from './network/notes_api';
import SignedInView from './components/notes/SignedInView';
import SignedOutView from './components/notes/SignedOutView';

function App() {
  const [sessionUser, setSessionUser] = useState<User | null>(null);
  const [showSignUpModal, setshowSignUpModal] = useState(false);
  const [showSignInModal, setshowSignInModal] = useState(false);

  useEffect(() => {
    async function fetchSessionUser() {
      try {
        const user = await NotesApi.getSessionUser();
        setSessionUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchSessionUser();
  }, []);

  return (
    <div>
      <NavBar
        sessionUser={sessionUser}
        onSignInClicked={() => setshowSignInModal(true)}
        onSignOutSuccessful={() => setSessionUser(null)}
        onSignUpClicked={() => setshowSignUpModal(true)}
      />
      <Container className={styles.notesPage}>
        {sessionUser ? <SignedInView /> : <SignedOutView />}
      </Container>
      {showSignUpModal && (
        <SignUpModal
          onDismiss={() => setshowSignUpModal(false)}
          onSignUpSuccessful={(user) => {
            setSessionUser(user);
            setshowSignUpModal(false);
          }}
        />
      )}
      {showSignInModal && (
        <SignInModal
          onDismiss={() => setshowSignInModal(false)}
          onSignInSuccessful={(user) => {
            setSessionUser(user);
            setshowSignInModal(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
