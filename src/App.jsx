import { useState } from "react";
import Conversation from "./components/Conversation";

function App() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState(null);

  // Start a new conversation
  const startNewConversation = () => {
    const newConversation = { id: Date.now(), messages: [] };
    setConversations((prev) => [newConversation, ...prev]);
    setSelectedConversationId(newConversation.id);
  };

  // Update messages in a specific conversation
  const updateConversation = (id, messages) => {
    setConversations((prevConversations) =>
      prevConversations.map((conv) =>
        conv.id === id ? { ...conv, messages } : conv
      )
    );
  };

  return (
    <div>
      <button onClick={startNewConversation}>New Conversation</button>
      <div className="conversations-list">
        {conversations.map((conv) => (
          <button
            key={conv.id}
            onClick={() => setSelectedConversationId(conv.id)}
          >
            Conversation {conv.id}
          </button>
        ))}
      </div>
      {selectedConversationId && (
        <Conversation
          conversation={conversations.find(
            (conv) => conv.id === selectedConversationId
          )}
          updateConversation={updateConversation} // Pass the function as a prop
        />
      )}
    </div>
  );
}

export default App;
