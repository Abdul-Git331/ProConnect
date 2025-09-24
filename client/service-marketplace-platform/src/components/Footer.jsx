import logo from "../assets/logo.png";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-light py-2 mt-4 border-top">
      <div className="container">
        <footer className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="d-flex align-items-center mb-2 mb-md-0">
            <a
              href="/"
              className="d-flex align-items-center link-dark text-decoration-none me-2"
            >
              <img src={logo} alt="logo" width="100" />
            </a>
            <small className="text-body-secondary">
              © 2025 Market Service Platform
            </small>
          </div>

          <div className="d-flex gap-3">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark fs-5 social-link"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark fs-5 social-link"
            >
              <FaInstagram />
            </a>
          </div>
        </footer>
      </div>

      <div className="text-center mt-2">
        <small className="text-body-secondary">
          Built with ❤️ by Market Service Platform
        </small>
      </div>

      <style>{`
        .social-link {
          transition: transform 0.2s ease, color 0.2s ease;
        }
        .social-link:hover {
          transform: scale(1.15);
          color: #0d6efd;
        }
      `}</style>
    </div>
  );
};

export default Footer;
