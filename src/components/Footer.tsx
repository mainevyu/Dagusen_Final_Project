import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="py-3 mt-auto border-top footer-container-block">
      <div className="container-fluid px-4 px-md-5 footer-content-container">
        <div className="d-flex flex-column align-items-center text-center gap-2">
          <div>
            <p className="mb-0 small text-white">
              © 2026 EventConnect. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
