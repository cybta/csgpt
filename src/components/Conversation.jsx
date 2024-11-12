import { useState } from "react";
import axios from "axios";

const Conversation = ({ conversation, updateConversation }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return; // Ignore empty input

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...conversation.messages, userMessage];

    // Update the conversation locally with the user message
    updateConversation(conversation.id, updatedMessages);
    setInput(""); // Clear input field
    setLoading(true); // Set loading state

    try {
      // Send request to OpenAI API
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4-turbo",
          messages: updatedMessages,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
        }
      );

      const botMessage = {
        role: "assistant",
        content: response.data.choices[0].message.content,
      };

      // Update conversation with bot's response
      updateConversation(conversation.id, [...updatedMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      alert("Failed to fetch response. Please try again.");
    } finally {
      setLoading(false); // Remove loading state
    }
  };

  return (
    <div>
      <div className="messages">
        {conversation.messages.map((msg, idx) => (
          <div key={idx} className={msg.role}>
            {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSendMessage} disabled={loading}>
        {loading ? "Sending..." : "Send"}
      </button>
    </div>
  );
};

export default Conversation;
