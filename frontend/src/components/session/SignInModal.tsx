import { useForm } from 'react-hook-form';
import { User } from '../../models/user';
import { SignInCredentials } from '../../network/notes_api';
import * as NotesApi from '../../network/notes_api';
import { Button, Form, Modal } from 'react-bootstrap';
import TextInputField from '../form/TextInputField';
import styleUtils from '../../styles/utils.module.css';

interface SignInModalProps {
  onDismiss: () => void;
  onSignInSuccessful: (user: User) => void;
}

const SignInModal = ({ onDismiss, onSignInSuccessful }: SignInModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInCredentials>();

  async function onSubmit(credentials: SignInCredentials) {
    try {
      const user = await NotesApi.signIn(credentials);
      onSignInSuccessful(user);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header>
        <Modal.Title>Sign In</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name='username'
            label='Username'
            type='text'
            placeholder='Username'
            register={register}
            registerOptions={{ required: 'Username is required' }}
            error={errors.username}
          />
          <TextInputField
            name='password'
            label='Password'
            type='password'
            placeholder='Password'
            register={register}
            registerOptions={{ required: 'Password is required' }}
            error={errors.password}
          />
          <Button
            type='submit'
            disabled={isSubmitting}
            className={styleUtils.width100}
          >
            Sign In
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignInModal;
