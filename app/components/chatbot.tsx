import { useState, useEffect } from "react";
import styles from "./Chatbot.module.css";
import chatBubbleStyles from "./ChatBubble.module.css";
import { MessageCircle } from "lucide-react";
import { useSession } from "next-auth/react";

interface ChatbotProps {
    onClose: () => void;
}

interface Message {
    text: string;
    sender: "user" | "gemini";
}

const Chatbot: React.FC<ChatbotProps> = ({ onClose }) => {
    const { data: session } = useSession();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (session?.user?.email) {
                    const response = await fetch(`/api/user-data?email=${session.user.email}`);
                    if (!response.ok) {
                        const errorText = await response.text();
                        throw new Error(`Failed to fetch user data: ${response.status} ${response.statusText} - ${errorText}`);
                    }
                    const data = await response.json();
                    setUserData(data);
                    console.log("Fetched user data:", data); // Log fetched user data
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        
        fetchUserData();
    }, [session]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { text: input, sender: "user" };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        
        const currentInput = input;
        setInput("");

        console.log("User Data before sending message:", userData); // Log userData to verify

        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: [
                            { parts: [{ text: `User data: ${JSON.stringify(userData)}\nQuestion: ${currentInput}` }] },
                        ],
                    }),
                }
            );
            
            const data = await response.json();
            console.log("API Response:", data);
            
            if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
                let botMessageText = data.candidates[0].content.parts[0].text;
                
                // Process the bot's response to make it shorter and cleaner
                botMessageText = botMessageText
                    .replace(/\*/g, '') // Remove asterisks
                    .replace(/Positive Aspects:/, '<strong>Positive Aspects:</strong>')
                    .replace(/Good Credit Score:/, '<li><strong>Good Credit Score:</strong>')
                    .replace(/High Income:/, '<li><strong>High Income:</strong>')
                    .replace(/:/g, ': </li>')
                    .replace(/\n/g, '<br>');

                const botMessage: Message = {
                    text: `<p>${botMessageText}</p>`,
                    sender: "gemini",
                };
                setMessages((prevMessages) => [...prevMessages, botMessage]);
            } else {
                console.error("Unexpected response format:", data);
            }
        } catch (error) {
            console.error("Error fetching response:", error);
        }
    };

    return (
        <div>
            <div className={chatBubbleStyles.chatBubbleContainer}>
                <button className={chatBubbleStyles.chatBubble}>
                    <MessageCircle size={32} />
                </button>
            </div>
            <div className={styles.container}>
                <button className={styles.close} onClick={onClose}>X</button>
                <div className={styles.chatWindow}>
                    {messages.map((msg, index) => (
                        <div key={index} className={msg.sender === "user" ? styles.user : styles.gemini}>
                            <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                        </div>
                    ))}
                </div>
                <div className={styles.inputArea}>
                    <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;