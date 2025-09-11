import React from "react";

export default function Footer() {
  return (
    <footer className="">

        <div className="container-fluid p-4 bg-green-light border-top">
          {/* Bottom Section */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center pt-3">
            <p className="mb-2 mb-md-0 text-secondary"> © 2025 Agrospace pack. Tout droit réservé. </p>
            <div className="d-flex flex-wrap gap-3">
              <p className="mb-2 mb-md-0 text-secondary"> powered by Xelkoom-AI </p>
            </div>
          </div>
          {/* Social Icons */}
          <div className="d-flex justify-content-center gap-3 my-3">
              <i className="bi bi-plus-circle"></i>
              <p className="mb-2 mb-md-0 lead"> Application Agriteam </p>
              <i className="bi bi-plus-circle"></i>
          </div>
        </div>

    </footer>
  );
}
