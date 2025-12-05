// components/LoginRedirectModal.jsx
import React from "react";

export default function LoginRedirectModal({ show, onClose }) {
  if (!show) return null;

  return (
    <div className="modal-backdrop fade show d-flex justify-content-center align-items-center" style={{ zIndex: 1050 }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-3">
          <div className="modal-header">
            <h5 className="modal-title">Authentication Required</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          
          <div className="modal-body">
            <p>You need to log in to access this page.</p>
            <p>
              Please connect on 
              <strong> agrospace.xelkoomai.sn</strong>.
            </p>
          </div>

          <div className="modal-footer d-flex justify-content-between">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn btn-success"
              onClick={() => (window.location.href = "https://agrospace.xelkoomai.sn")}
            >
              Go to login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
