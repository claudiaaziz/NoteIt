import * as NotesApi from '../../network/notes_api';

interface SignedInViewProps {
  onSignOutSuccessful: () => void;
}

const SignedInView = ({ onSignOutSuccessful }: SignedInViewProps) => {
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
    <span onClick={signOut} className='pointer'>Sign Out</span>
  );
};

export default SignedInView;
