import React, { useState } from "react";
import axios from "axios";
import config from "./config";

const Chatbot = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const handleQuestionSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!question.trim()) {
      setError("Please enter a question.");
      return;
    }

    if (!config.apiToken) {
      setError("Chatbot is not configured. Please set REACT_APP_DIALOGFLOW_TOKEN.");
      return;
    }

    try {
      const res = await axios.post(
        config.dialogflowApiUrl,
        {
          query: question,
          lang: "en",
          sessionId: config.sessionId,
        },
        {
          headers: {
            Authorization: `Bearer ${config.apiToken}`,
          },
        }
      );
      setResponse(res.data?.result?.fulfillment?.speech || "No response received.");
    } catch (err) {
      setError("Unable to get a response. Please try again later.");
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleQuestionSubmit} className="mb-4">
        <input
          type="text"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </form>
      {error && <div className="text-red-600">{error}</div>}
      <div className="text-gray-800">{response}</div>
    </div>
  );
};

export default Chatbot;
