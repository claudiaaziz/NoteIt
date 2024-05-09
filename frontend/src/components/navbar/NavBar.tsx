import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { User } from '../../models/user';
import SignedInView from './SignedInView';
import SignedOutView from './SignedOutView';

interface NavBarProps {
  sessionUser: User | null;
  onSignUpClicked: () => void;
  onSignInClicked: () => void;
  onSignOutSuccessful: () => void;
}

const NavBar = ({
  sessionUser,
  onSignInClicked,
  onSignOutSuccessful,
  onSignUpClicked,
}: NavBarProps) => {
  return (
    <Navbar bg='primary' variant='dark' expand='sm' sticky='top'>
      <Container>
        <Navbar.Brand as={Link} to='/'>Notes App</Navbar.Brand>
        <Navbar.Toggle aria-controls='main-navbar' />
        <Navbar.Collapse id='main-navbar'>
          <Nav>
            <Nav.Link as={Link} to='/privacy'>
              Privacy
            </Nav.Link>
          </Nav>
          <Nav className='ms-auto'>
            {sessionUser ? (
              <SignedInView
                user={sessionUser}
                onSignOutSuccessful={onSignOutSuccessful}
              />
            ) : (
              <SignedOutView
                onSignInClicked={onSignInClicked}
                onSignUpClicked={onSignUpClicked}
              />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
