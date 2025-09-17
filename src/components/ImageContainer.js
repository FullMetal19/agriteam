import React, { useState } from "react";
import { Modal } from "react-bootstrap";

export function ImageContainer ({ images }) 
{
  const [show, setShow] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const handleShow = (img) => {
    setCurrentImage(img);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  return (
    <div className="d-flex flex-wrap gap-2">
      {images?.map((item, index) => (
        <div
          key={index}
          className="overflow-hidden rounded border"

          style={{
            flex: images.length === 1 ? "1 1 100%" : "1 1 calc(50% - 10px)",
            maxHeight: images.length === 1 || images.length === 2 ? '100%' : "270px",
            cursor: "pointer",
          }}

          onClick={() => handleShow(item.image)}
        >
          <img src={`${item.image}`} alt={`post-img-${index}`} className="w-100 h-100 object-fit-cover" />
        </div>
      ))}

      {/* Modal pour afficher l’image en grand */}
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Body className="p-0">
          {currentImage && (
            <img
              src={`${currentImage}`}
              alt="large"
              className="w-100 h-auto"
              style={{ maxHeight: "90vh", objectFit: "contain" }}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};


