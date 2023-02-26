import React, { useState, useEffect } from "react";
import "./App.css";
import { w3cwebsocket as WebSocket } from "websocket";

const client = new WebSocket("ws://localhost:8080");

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      message.data.text().then((text) => {
        console.log(text);
        setMessages([...messages, text]);
      });
    };
    client.onclose = () => {
      console.log("WebSocket Closed");
    };
  }, [messages]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      client.send(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="App">
      <h1>Chat App</h1>
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
