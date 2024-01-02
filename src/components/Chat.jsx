import { useEffect, useState } from "react";
import io from "socket.io-client";
const domain = "";
const socket = io.connect(domain);

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("send_message", message);
    setMessage("");
  };

  const addMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    socket.emit("content_change", e.target.value);
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      addMessage(data);
    });

    // socket.on("received_change", (data) => {
    //   setMessage(data);
    // });
  }, [socket]);

  return (
    <div className="App">
      <ul id="messages">
        {messages.map((message) => (
          <li key={message}>{message}</li>
        ))}
      </ul>
      <form id="form">
        <input
          id="input"
          onChange={handleChange}
          value={message}
          autoComplete="off"
        />
        <button onClick={sendMessage}>Send</button>
      </form>
    </div>
  );
};

export default Chat;
