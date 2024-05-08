import { Button } from 'react-bootstrap';
import { User } from '../../models/user';
import * as NotesApi from '../../network/notes_api';

interface SignedInViewProps {
  user: User;
  onSignOutSuccessful: () => void;
}

const SignedInView = ({ user, onSignOutSuccessful }: SignedInViewProps) => {
  async function signOut() {
    try {
      await NotesApi.signOut()
      onSignOutSuccessful()
    } catch (error) {
      alert(error)
      console.error(error)
    }
  }

  return (
    <Button onClick={signOut}>Sign Out</Button>
  );
};

export default SignedInView;
