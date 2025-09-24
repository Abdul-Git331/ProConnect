import logo from "../assets/logo.png";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom shadow-sm px-3">
      <div className="container-fluid">
        <a href="/" className="navbar-brand d-flex align-items-center">
          <img
            src={logo}
            alt="Logo"
            width="40"
            height="40"
            className="me-2"
          />
          <span className="fw-bold text-primary">ProConnect</span>
        </a>

      </div>
    </nav>
  );
};

export default NavBar;
