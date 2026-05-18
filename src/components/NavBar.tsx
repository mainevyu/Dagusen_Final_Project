import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollToSection = (targetId: string) => {
    if (location.pathname === "/") {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/#${targetId}`, { replace: true });
      
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
    }
  };

  const handleHomeLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleScrollToSection("home");
  };

  const handleExploreLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleScrollToSection("list");
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top border-bottom border-dark shadow-sm custom-dark-navbar">
      <div className="container px-3">
        
        <Link 
          to="/" 
          onClick={handleHomeLinkClick} 
          className="navbar-brand d-flex align-items-center gap-2 fw-bold text-decoration-none brand-name"
        >
          <i className="bi bi-tree-fill fs-4 text-white"></i>
          <span className="tracking-tight text-white brand-text-spacing">
            Event<span className="text-white-50">Connect</span>
          </span>
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCommunityDashboard"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarCommunityDashboard">
          <div className="navbar-nav ms-auto gap-2 align-items-md-center nav-links">
            
            <Link 
              to="/" 
              onClick={handleHomeLinkClick} 
              className="nav-link fw-semibold px-3 navbar-link-item text-white-50"
            > Home
            </Link>

            <Link 
              to="/create" 
              className="nav-link fw-semibold px-3 navbar-link-item text-white-50"
            > Add Event
            </Link>

            <a 
              href="/#list" 
              onClick={handleExploreLinkClick} 
              className="btn btn-sm btn-light px-3 fw-bold shadow-sm ms-md-2 custom-explore-btn"
            > Explore Events
            </a>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
