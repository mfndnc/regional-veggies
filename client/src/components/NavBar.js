import { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { AuthContext } from '../context/auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const elfahome = <FontAwesomeIcon icon={faHome} />;

export default function NavbarApp() {
  const {
    authObj: { logged },
  } = useContext(AuthContext);
  const navMainBody = logged ? (
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link as={NavLink} to="/explore">
          Explore
        </Nav.Link>
        <Nav.Link as={NavLink} to="/eventsview">
          Offers View
        </Nav.Link>
        <Nav.Link as={NavLink} to="/bookmarkview">
          Bookmarked
        </Nav.Link>
      </Nav>
      <NavDropdown.Divider />
      <Nav>
        <Nav.Link as={NavLink} to="/eventsmanage">
          Offers
        </Nav.Link>
        <Nav.Link as={NavLink} to="/profile">
          Profile
        </Nav.Link>
        <Nav.Link as={NavLink} to="/logout">
          Logout
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  ) : (
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link as={NavLink} to="/">
          Regional Veggies
        </Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link as={NavLink} to="/login">
          Login
        </Nav.Link>
        <Nav.Link as={NavLink} to="/signup">
          Signup
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  );
  return (
    <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">
        {elfahome}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      {navMainBody}
    </Navbar>
  );
}
