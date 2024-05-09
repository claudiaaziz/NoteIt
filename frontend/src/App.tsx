import { useEffect, useState } from 'react';
import SignUpModal from './components/session/SignUpModal';
import SignInModal from './components/session/SignInModal';
import NavBar from './components/navbar/NavBar';
import { User } from './models/user';
import * as NotesApi from './network/notes_api';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NotesPage from './pages/NotesPage';
import PrivacyPage from './pages/PrivacyPage';
import NotFoundPage from './pages/NotFoundPage';
import styles from './styles/App.module.css'

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
    <BrowserRouter>
      <div>
        <NavBar
          sessionUser={sessionUser}
          onSignInClicked={() => setshowSignInModal(true)}
          onSignOutSuccessful={() => setSessionUser(null)}
          onSignUpClicked={() => setshowSignUpModal(true)}
        />
        <Container className={styles.pageContainer}>
          <Routes>
            <Route path='/' element={<NotesPage sessionUser={sessionUser} />} />
            <Route path='/privacy' element={<PrivacyPage />} />
            <Route path='/*' element={<NotFoundPage />} />
          </Routes>
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
    </BrowserRouter>
  );
}

export default App;
