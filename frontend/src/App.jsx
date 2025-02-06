import { useState } from "react";
import axios from "axios";
import "./App.css"; // Import CSS for styling

function App() {
  const [message, setMessage] = useState(""); // User input
  const [chat, setChat] = useState([]); // Chat history

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newChat = [...chat, { text: message, sender: "user" }];
    setChat(newChat);
    setMessage(""); // Clear input after sending

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        message: message,
      });

      setChat([...newChat, { text: res.data.reply, sender: "bot" }]); // Add bot response
    } catch (error) {
      console.error("Error:", error);
      setChat([...newChat, { text: "Error getting response", sender: "bot" }]);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {chat.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="input-box">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
