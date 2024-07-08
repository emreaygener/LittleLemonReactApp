import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav id="Navigation">
      <menu className="nav-container">
        <li>
          <Link className="header" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="header" to="/about">
            About
          </Link>
        </li>
        <li>
          <Link className="header" to="/menu">
            Menu
          </Link>
        </li>
        <li>
          <Link className="header" to="/reservations">
            Reservations
          </Link>
        </li>
        <li>
          <Link className="header" to="/order">
            Order Online
          </Link>
        </li>
        <li>
          <Link className="header" to="/login">
            Login
          </Link>
        </li>
      </menu>
    </nav>
  );
}
