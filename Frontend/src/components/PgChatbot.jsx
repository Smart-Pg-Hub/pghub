import React, { useState, useRef, useEffect, useContext } from "react";
import { Send, KeyRound, Loader2 } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { sendChatMessage } from "../services/chatbot";

const STARTERS = [
  { label: "Rent due", text: "What is my rent due?" },
  { label: "My complaints", text: "Show my complaints" },
];

export default function PgChatbot() {
  const { token, isLoggedIn } = useContext(AuthContext);
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  if (!isLoggedIn) return null; // chat requires a logged-in tenant/owner

  async function sendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setError(null);
    setMessages((m) => [...m, { role: "user", content: trimmed }]);
    setInput("");
    setLoading(true);

    const result = await sendChatMessage(trimmed, sessionId, token);

    if (result.status === "success") {
      const data = result.data;
      setSessionId(data.sessionId);
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.reply, intent: data.intent, actions: data.suggestedActions },
      ]);
    } else {
      setError("Couldn't reach PG Assistant. Please try again.");
    }
    setLoading(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <>
      <button onClick={() => setOpen((o) => !o)} style={styles.launcher} aria-label="Open PG Assistant">
        <KeyRound size={22} color="#1D1913" />
      </button>

      {open && (
        <div style={styles.card}>
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600&family=JetBrains+Mono:wght@500&family=Inter:wght@400;500&display=swap');
            * { box-sizing: border-box; }
            @keyframes pgFadeUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes pgSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            .pg-msg { animation: pgFadeUp 0.2s ease-out; }
            .pg-spin { animation: pgSpin 0.8s linear infinite; }
          `}</style>

          <div style={styles.header}>
            <KeyRound size={16} color="#C9982E" />
            <span style={styles.headerTitle}>PG Assistant</span>
          </div>

          <div ref={scrollRef} style={styles.messages}>
            {messages.length === 0 && (
              <div style={styles.starterRow}>
                {STARTERS.map((s) => (
                  <button key={s.label} onClick={() => sendMessage(s.text)} style={styles.starterChip}>
                    {s.label}
                  </button>
                ))}
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className="pg-msg" style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ ...styles.bubble, ...(m.role === "user" ? styles.bubbleUser : styles.bubbleAssistant) }}>
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={styles.loadingBubble}>
                  <Loader2 size={12} className="pg-spin" color="#C9982E" />
                </div>
              </div>
            )}

            {error && <div style={styles.errorBox}>{error}</div>}
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              style={styles.textInput}
            />
            <button type="submit" disabled={loading || !input.trim()} style={styles.sendBtn}>
              <Send size={14} color="#1D1913" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

const styles = {
  launcher: {
    position: "fixed", bottom: 24, right: 24, width: 52, height: 52, borderRadius: "50%",
    background: "#C9982E", border: "none", boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
    display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 1000,
  },
  card: {
    position: "fixed", bottom: 88, right: 24, width: 340, height: 460, background: "#1D1913",
    borderRadius: 14, border: "1px solid #332C22", boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
    display: "flex", flexDirection: "column", overflow: "hidden", zIndex: 1000,
    fontFamily: "'Inter', sans-serif",
  },
  header: { display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", borderBottom: "1px solid #332C22" },
  headerTitle: { fontFamily: "'Space Grotesk', sans-serif", color: "#F5F0E6", fontSize: 14, fontWeight: 600 },
  messages: { flex: 1, overflowY: "auto", padding: 12, display: "flex", flexDirection: "column", gap: 8 },
  starterRow: { display: "flex", gap: 6, flexWrap: "wrap" },
  starterChip: {
    fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: "#C9982E",
    border: "1px solid #3D3627", background: "#241F17", borderRadius: 999, padding: "5px 10px", cursor: "pointer",
  },
  bubble: { fontSize: 13, lineHeight: 1.4, padding: "8px 12px", borderRadius: 14, whiteSpace: "pre-wrap", maxWidth: "85%" },
  bubbleUser: { background: "#C9982E", color: "#1D1913" },
  bubbleAssistant: { background: "#241F17", color: "#EDE8DF", border: "1px solid #332C22" },
  loadingBubble: { background: "#241F17", border: "1px solid #332C22", borderRadius: 14, padding: "8px 12px" },
  errorBox: { fontSize: 11, color: "#C97957", background: "#241712", border: "1px solid #3D2A22", borderRadius: 8, padding: "6px 10px" },
  form: { display: "flex", gap: 6, padding: 10, borderTop: "1px solid #332C22" },
  textInput: { flex: 1, background: "#15120F", border: "1px solid #332C22", borderRadius: 8, padding: "8px 10px", color: "#EDE8DF", fontSize: 13, outline: "none" },
  sendBtn: { width: 32, height: 32, borderRadius: 8, border: "none", background: "#C9982E", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 },
};