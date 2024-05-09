import { useForm } from 'react-hook-form';
import { User } from '../../models/user';
import { SignUpCredentials } from '../../network/notes_api';
import * as NotesApi from '../../network/notes_api';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import TextInputField from '../form/TextInputField';
import styleUtils from '../../styles/utils.module.css';
import { useState } from 'react';
import { ConflictError } from '../../errors/http_errors';

interface SignUpModalProps {
  onDismiss: () => void;
  onSignUpSuccessful: (user: User) => void;
}

const SignUpModal = ({ onDismiss, onSignUpSuccessful }: SignUpModalProps) => {
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCredentials>();

  async function onSubmit(credentials: SignUpCredentials) {
    try {
      const newUser = await NotesApi.signUp(credentials);
      onSignUpSuccessful(newUser);
    } catch (error) {
      if (error instanceof ConflictError) {
        setError(error.message);
      } else {
        alert(error);
      }
      console.error(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
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
            errors={errors.username}
          />
          <TextInputField
            name='email'
            label='Email'
            type='email'
            placeholder='Email'
            register={register}
            registerOptions={{ required: 'Email is required' }}
            errors={errors.email}
          />
          <TextInputField
            name='password'
            label='Password'
            type='password'
            placeholder='Password'
            register={register}
            registerOptions={{ required: 'Password is required' }}
            errors={errors.password}
          />
          <Button
            type='submit'
            disabled={isSubmitting}
            className={styleUtils.width100}
          >
            Sign Up
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpModal;
