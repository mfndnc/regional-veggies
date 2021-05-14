import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/auth';

export default function Navbar() {
  const {
    authObj: { logged },
  } = useContext(AuthContext);
  const rightBar = logged ? (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <NavLink to="/logout" className="nav-link">
          Logout
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/profile" className="nav-link">
          Profile
        </NavLink>
      </li>
    </ul>
  ) : (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <NavLink to="/login" className="nav-link">
          Login
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/signup" className="nav-link">
          Signup
        </NavLink>
      </li>
    </ul>
  );
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink to="/" className="navbar-brand">
        Navbar
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <NavLink to="/" className="nav-link">
              Home <span className="sr-only">(current)</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/test1" className="nav-link">
              f user
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/test2" className="nav-link">
              f addr
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/test2/609ea7f09b161b9914e04e22" className="nav-link">
              addrID
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/test2/609ea7f09b161b9914e04e22/event"
              className="nav-link"
            >
              f event
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/test3/609ea7f09b161b9914e04e22" className="nav-link">
              eventID
            </NavLink>
          </li>
          <li className="nav-item dropdown">
            <NavLink
              to="/"
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Dropdown
            </NavLink>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <NavLink to="/" className="dropdown-item">
                Action
              </NavLink>
              <NavLink to="/" className="dropdown-item">
                Another action
              </NavLink>
              <div className="dropdown-divider"></div>
              <NavLink to="/" className="dropdown-item">
                Something else here
              </NavLink>
            </div>
          </li>
          <li className="nav-item">
            <NavLink
              to="/"
              className="nav-link disabled"
              tabIndex="-1"
              aria-disabled="true"
            >
              Disabled
            </NavLink>
          </li>
        </ul>
        {rightBar}
      </div>
    </nav>
  );
}
