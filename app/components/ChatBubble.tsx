import { useState } from "react";
import styles from "./ChatBubble.module.css";
import Chatbot from "./chatbot";
import { MessageCircle } from "lucide-react";

const ChatBubble: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.chatBubbleContainer}>
      <button className={styles.chatBubble} onClick={() => setIsOpen(!isOpen)}>
        <MessageCircle size={50} />
      </button>
      {isOpen && <Chatbot onClose={() => setIsOpen(false)} />}
    </div>
  );
};

export default ChatBubble;