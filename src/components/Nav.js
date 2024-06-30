export default function Nav() {
  return (
    <nav id="Navigation">
      <menu className="nav-container">
        <li>
          <a className="header" href="/">
            Home
          </a>
        </li>
        <li>
          <a className="header" href="/about">
            About
          </a>
        </li>
        <li>
          <a className="header" href="/menu">
            Menu
          </a>
        </li>
        <li>
          <a className="header" href="/reservations">
            Reservations
          </a>
        </li>
        <li>
          <a className="header" href="/order">
            Order Online
          </a>
        </li>
        <li>
          <a className="header" href="/login">
            Login
          </a>
        </li>
      </menu>
    </nav>
  );
}
