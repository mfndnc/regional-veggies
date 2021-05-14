import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MyContextData } from '../context/auth';

export default function Navbar() {
  const {
    myState: { logged },
  } = useContext(MyContextData);
  const rightBar = logged ? (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <Link to="/logout" className="nav-link active" aria-current="page">
          Logout
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/profile" className="nav-link">
          Profile
        </Link>
      </li>
    </ul>
  ) : (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <Link to="/login" className="nav-link active" aria-current="page">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/signup" className="nav-link">
          Signup
        </Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand">
        Navbar
      </Link>
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
            <Link to="/" className="nav-link">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Link
            </Link>
          </li>
          <li className="nav-item dropdown">
            <Link
              to="/"
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Dropdown
            </Link>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link to="/" className="dropdown-item">
                Action
              </Link>
              <Link to="/" className="dropdown-item">
                Another action
              </Link>
              <div className="dropdown-divider"></div>
              <Link to="/" className="dropdown-item">
                Something else here
              </Link>
            </div>
          </li>
          <li className="nav-item">
            <Link
              to="/"
              className="nav-link disabled"
              tabIndex="-1"
              aria-disabled="true"
            >
              Disabled
            </Link>
          </li>
        </ul>
        {rightBar}
      </div>
    </nav>
  );
}
