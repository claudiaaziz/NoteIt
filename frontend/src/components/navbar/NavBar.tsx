import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { User } from '../../models/user';
import SignedInView from './SignedInView';
import SignedOutView from './SignedOutView';
import styles from '../../styles/NavBar.module.css';

interface NavBarProps {
	sessionUser: User | null;
	onSignUpClicked: () => void;
	onSignInClicked: () => void;
	onSignOutSuccessful: () => void;
}

const NavBar = ({ sessionUser, onSignInClicked, onSignOutSuccessful, onSignUpClicked }: NavBarProps) => {
	return (
		<Navbar variant='dark' expand='sm' sticky='top' className={styles.navbar}>
			<Container>
				<Navbar.Brand as={Link} to='/' style={{ color: 'black' }}>
					NoteIt
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='main-navbar' />
				<Navbar.Collapse id='main-navbar'>
					<Nav>
						<Nav.Link as={Link} to='/privacy' style={{ color: 'black' }}>
							Privacy
						</Nav.Link>
					</Nav>
					<Nav className='ms-auto'>
						{sessionUser ? (
							<SignedInView onSignOutSuccessful={onSignOutSuccessful} />
						) : (
							<SignedOutView onSignInClicked={onSignInClicked} onSignUpClicked={onSignUpClicked} />
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavBar;
