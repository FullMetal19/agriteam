import React, { useRef, useLayoutEffect, useState } from "react";
import { DiscussionApi } from "../api-services/discussion.api";

export default function ChatSender({
  sessionId,
  replyData,
  refetch,
  parentMessage,
  closeReplyBox,
}) {
  const textareaRef = useRef(null);
  const [isMaxHeight, setIsMaxHeight] = useState(false);
  const maxHeightRef = useRef(0);

  useLayoutEffect(() => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = "auto";
    const singleLineHeight = textareaRef.current.scrollHeight;
    maxHeightRef.current = singleLineHeight * 5;

    const adjustHeight = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        const newHeight = Math.min(
          textareaRef.current.scrollHeight,
          maxHeightRef.current
        );
        textareaRef.current.style.height = `${newHeight}px`;
        setIsMaxHeight(textareaRef.current.scrollHeight > maxHeightRef.current);
      }
    };

    adjustHeight();
    textareaRef.current.addEventListener("input", adjustHeight);

    return () => {
      if (textareaRef.current) {
        textareaRef.current.removeEventListener("input", adjustHeight);
      }
    };
  }, []);

 

  const [file, setFile] = useState(null);
  const [inputs, setInputs] = useState({});
  const [status, setStatus] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputs = (event) => {
    const { name, value, files } = event.target;
    setStatus(0);

    if (name === "image") {
      const selectedFile = files[0];
      setFile(selectedFile);
      setInputs((prev) => ({ ...prev, image: selectedFile }));
    } else {
      setInputs((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleForm = async (event) => {

    event.preventDefault();
    const discussion = DiscussionApi("multipart/form-data");
    setStatus(0);
    setIsLoading(true);

    try {
      const formData = new FormData();

      if (replyData && parentMessage?.userId) {
        formData.append("parentId", parentMessage.id);
      }

      for (const key in inputs) {
        formData.append(key, inputs[key]);
      }

      const res = await discussion.insert(sessionId, formData);
      setIsLoading(false);
      closeReplyBox();

      res.data.success ? setStatus(1) : setStatus(-1);

      event.target.reset();
      setFile(null);
      setInputs({});
      refetch();
    } catch (err) {
      setStatus(-1);
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column w-100 align-items-center">
      {/* 🔹 Preview image & Reply box */}
      <div className="d-flex mb-2 gap-3">
        {file && (
          <div className="d-flex gap-2 border rounded py-1 px-2 bg-white shadow">
            <img src={URL.createObjectURL(file)} alt="preview" width="50" height="40" style={{ objectFit: "cover", borderRadius: "8px" }} />
            <span className="cursor" title="Supprimer"
              onClick={() => {
                setFile(null);
                setInputs((prev) => ({ ...prev, image: null }));
              }}
            >
              <i className="bi bi-x-circle text-secondary"></i>
            </span>
          </div>
        )}

        { 
         replyData && (
          <div className="d-flex gap-2 rounded p-1 bg-white shadow px-3">
            <div className="d-flex flex-column px-3 py-2 rounded-3">
              <small className="text-muted mb-1">
              { parentMessage?.author?.fname + " " + parentMessage?.author?.lname}
              </small>
              <span className="text-secondary">
                <TextReducer text={parentMessage?.message} maxsize={30} />
              </span>
            </div>
            <i
              className="bi bi-x-circle text-secondary cursor"
              onClick={closeReplyBox}
            ></i>
          </div>
        )}
      </div>

      {/* 🔹 Formulaire */}
      <form className="search-container position-relative d-flex align-items-end rounded-4 border p-3 bg-white" onSubmit={handleForm} encType="multipart/form-data">
        <label className="cursor" htmlFor="img1" title="Importer une image">
          <i className="bi bi-plus-circle text-secondary"></i>
        </label>
        <input type="file" name="image" className="hidden" accept="image/*" id="img1" onChange={handleInputs} />
        <textarea ref={textareaRef} name="message" className="input bg-transparent flex-grow-1 mx-2" placeholder="Écrire ici ..." onChange={handleInputs} rows="1"
          style={{
            resize: "none",
            lineHeight: "1.5",
            overflowY: isMaxHeight ? "auto" : "hidden",
          }}
        ></textarea>

        <div className="d-flex align-items-end ms-2">
          <button type="submit" className="btn bg-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: "32px", height: "32px" }} disabled={isLoading}>
            <i className="bi bi-arrow-up-circle-fill fs-5 text-white cursor-pointer"></i>
          </button>
        </div>
      </form>

      {status === 1 && <p className="text-success mt-2"> <i className="bi bi-check-circle-fill text-success me-3" ></i> Message envoyé</p>}
      {status === -1 && (
        <p className="text-danger mt-2"> <i className="bi bi-x-circle-fill text-danger me-3" ></i> Erreur lors de l’envoi</p>
      )}
    </div>
  );
}

function TextReducer({ text, maxsize }) {
  if (text?.length <= maxsize) return <span>{text}</span>;
  const reducer = text?.slice(0, maxsize) + "...";
  return <span>{reducer}</span>;
}
