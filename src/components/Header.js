import logo from "../assets/img/logo.png";
import Nav from "./Nav";

export default function Header() {
  return (
    <header id="Header">
      <menu className="header-container">
        <div className="invisible-squares-1vw"></div>
        <img src={logo} alt="logo" />
        <div className="invisible-squares-1vw"></div>
        <Nav />
      </menu>
    </header>
  );
}
