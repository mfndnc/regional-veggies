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
          explore
        </Nav.Link>
        <Nav.Link as={NavLink} to="/test1">
          test1
        </Nav.Link>
        <Nav.Link as={NavLink} to="/test2">
          test2
        </Nav.Link>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item as={NavLink} to="/test1">
            f User
          </NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/test2">
            f addr
          </NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/test2/60a13dc2c63cd551eca2150a">
            addrID 1
          </NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/test2/60a144a4ef25851fccd0acb9">
            addrID 2
          </NavDropdown.Item>

          <NavDropdown.Item as={NavLink} to="/test2/60a13dc2c63cd551eca2150a">
            addrID
          </NavDropdown.Item>

          <NavDropdown.Item as={NavLink} to="/test3/60a244b285d2cc2234d3b45f">
            eventID id1
          </NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/test3/60a24539570bca64c4f2def8">
            eventID id2
          </NavDropdown.Item>
          <Nav.Link as={NavLink} to="/test2/60a13dc2c63cd551eca2150a/event">
            add event addr1
          </Nav.Link>
          <Nav.Link as={NavLink} to="/test2/60a144a4ef25851fccd0acb9/event">
            add event addr2
          </Nav.Link>
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
