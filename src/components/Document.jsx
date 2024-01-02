import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import io from "socket.io-client";
const domain = "https://jaisocket-server.onrender.com";
const socket = io.connect(domain);

const Document = () => {
  const [document, setDocument] = useState("Hi");

  const handleChange = (content, delta, source, editor) => {
    setDocument(content);
    socket.emit("change_content", content);
  };

  useEffect(() => {
    socket.on("changed", (data) => {
      setDocument(data);
    });
  }, [socket]);

  return (
    <div>
      <ReactQuill
        theme="snow"
        onChange={handleChange}
        value={document}
        preserveWhitespace
      />
    </div>
  );
};

export default Document;
