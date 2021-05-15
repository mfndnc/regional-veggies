import { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';
import { AuthContext } from '../context/auth';

export default function NavbarApp() {
  const {
    authObj: { logged },
  } = useContext(AuthContext);
  const navMainBody = logged ? (
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link as={NavLink} to="/">
          Home
        </Nav.Link>
        <Nav.Link as={NavLink} to="/test2/609ea7f09b161b9914e04e22/event">
          add event addr1
        </Nav.Link>
        <Nav.Link as={NavLink} to="/test2/609ead8ebedaaab1943e778e/event">
          add event addr2
        </Nav.Link>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item as={NavLink} to="/test1">
            f User
          </NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/test2">
            f addr
          </NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/test2/609ea7f09b161b9914e04e22">
            addrID 1
          </NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/test2/609ead8ebedaaab1943e778e">
            addrID 2
          </NavDropdown.Item>

          <NavDropdown.Item as={NavLink} to="/test2/609ea7f09b161b9914e04e22">
            addrID
          </NavDropdown.Item>

          <NavDropdown.Item as={NavLink} to="/test3/609ebf473eab2535e8c145a2">
            eventID id1
          </NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/test3/609ec048c09c4e8a8005dd59">
            eventID id2
          </NavDropdown.Item>

          <NavDropdown.Divider />
          <NavDropdown.Item as={NavLink} to="/">
            Separated link
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Nav>
        <Nav.Link as={NavLink} to="/logout">
          Logout
        </Nav.Link>
        <Nav.Link as={NavLink} to="/profile">
          Profile
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  ) : (
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link as={NavLink} to="/">
          Home
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
    <Navbar collapseOnSelect bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
        LOGO
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      {navMainBody}
    </Navbar>
  );
}
