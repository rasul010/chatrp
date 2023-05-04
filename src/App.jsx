/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import "./App.css";
import { Icon } from '@iconify/react';
import Loader from "./loader";

function App() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [Chatlog, setChatLog] = useState([]);
  function handleSubmit(event) {
    event.preventDefault();
    setChatLog((prevetChatlog) => [...prevetChatlog, { type: "user", message: input }]);

    sendMessenge(input);
    setInput("");
  }
  function sendMessenge(messenge) {
    const url = "https://api.openai.com/v1/chat/completions";
    const API_KEY = "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";
    const data = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: messenge }],
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    };
    setLoading(true);
    axios
      .post(url, data, { headers: headers })
      .then((res) => {
        setChatLog((prevetChatlog) => [
          ...prevetChatlog,
          { type: "bot", message: res.data.choices[0].message.content },
        ]);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }

  return (
    <div className="container">
      <h1>ChatRP Ai</h1>
      <div className="chat_block">
        {Chatlog?.map((message, index) => {
          return (
            <div
              key={index}
              className={message.type === "user" ? "right" : "left"}
            >
              {message.message}
            </div>
          );
        })}
      </div>
      {loading ? <Loader /> : ""}
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Type you question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button>
        <Icon icon="lucide:send" />
        </button>
      </form>
    </div>
  );
}

export default App;
