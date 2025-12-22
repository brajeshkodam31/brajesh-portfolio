import { useState, useEffect, useRef } from "react";
import { getBotReply } from "./messages"; // ✅ fixed replies
import "./chatbot.css";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi 👋 I’m Chitti, Brajesh’s AI assistant."
    }
  ]);
  const [input, setInput] = useState("");

  const bottomRef = useRef(null);
  const chatRef = useRef(null);

  const [position, setPosition] = useState({
    x: window.innerWidth - 420,
    y: window.innerHeight - 560
  });

  const dragData = useRef({
    dragging: false,
    offsetX: 0,
    offsetY: 0
  });

  // auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // drag handlers
  const onMouseDown = (e) => {
    dragData.current.dragging = true;
    dragData.current.offsetX = e.clientX - position.x;
    dragData.current.offsetY = e.clientY - position.y;
  };

  const onMouseMove = (e) => {
    if (!dragData.current.dragging) return;
    setPosition({
      x: e.clientX - dragData.current.offsetX,
      y: e.clientY - dragData.current.offsetY
    });
  };

  const onMouseUp = () => {
    dragData.current.dragging = false;
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  // ✅ FIXED REPLY LOGIC (NO API)
  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    const botReply = getBotReply(input);

    setMessages((prev) => [
      ...prev,
      userMessage,
      { role: "assistant", text: botReply }
    ]);

    setInput("");
  };

  return (
    <>
      {/* Floating Toggle */}
      {!open && (
        <div
          className="chatbot-toggle"
          onClick={() => setOpen(true)}
          style={{ right: 24, bottom: 24 }}
        >
          🤖
        </div>
      )}

      {/* Chat Window */}
      {open && (
        <div
          ref={chatRef}
          className="chatbot"
          style={{
            left: position.x,
            top: position.y,
            width: "380px",
            height: "520px"
          }}
        >
          {/* Header = drag handle */}
          <div className="chat-header" onMouseDown={onMouseDown}>
            <span>CHITTI🤖</span>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="chat-body">
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.role}`}>
                {m.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>➤</button>
          </div>
        </div>
      )}
    </>
  );
}
