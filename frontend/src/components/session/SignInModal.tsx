import { useForm } from 'react-hook-form';
import { User } from '../../models/user';
import { SignInCredentials } from '../../network/notes_api';
import * as NotesApi from '../../network/notes_api';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import TextInputField from '../form/TextInputField';
import styleUtils from '../../styles/utils.module.css';
import { useState } from 'react';
import { UnauthorizedError } from '../../errors/http_errors';

interface SignInModalProps {
  onDismiss: () => void;
  onSignInSuccessful: (user: User) => void;
}

const SignInModal = ({ onDismiss, onSignInSuccessful }: SignInModalProps) => {
  const [error, setError] = useState<string | null>(null)

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
      if (error instanceof UnauthorizedError) {
        setError(error.message)
      } else {
        alert(error)
      }
      console.error(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Sign In</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <Alert variant='danger'>{error}</Alert>}
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
            id='button'
          >
            Sign In
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignInModal;
