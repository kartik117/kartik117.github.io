import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiX, FiSend, FiMessageCircle } from 'react-icons/fi';
import './ChatWidget.css';

const API_URL = import.meta.env.VITE_CHAT_API_URL || 'http://localhost:8000';

const WELCOME = {
  role: 'assistant',
  content: "Hi! I'm Kartik's AI assistant. Ask me about his experience, projects, or skills.",
};

const APPLE_EASE = [0.25, 0.46, 0.45, 0.94];

const TypingIndicator = () => (
  <div className="cw-msg cw-msg-assistant">
    <div className="cw-typing">
      <span /><span /><span />
    </div>
  </div>
);

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const openedOnce = useRef(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      openedOnce.current = true;
      inputRef.current?.focus();
    }
  }, [open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const newUserMsg = { role: 'user', content: text };
    const history = messages.slice(-12);
    setMessages((prev) => [...prev, newUserMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "Sorry, I'm having trouble connecting right now. Try again in a moment." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="cw-root" aria-live="polite">
      {/* ─── Panel ─────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="cw-panel"
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.97 }}
            transition={{ duration: 0.28, ease: APPLE_EASE }}
            role="dialog"
            aria-label="Chat with Kartik's AI assistant"
          >
            {/* Header */}
            <div className="cw-header">
              <div className="cw-avatar">K</div>
              <div className="cw-header-info">
                <span className="cw-name">Kartik's AI</span>
                <span className="cw-status">
                  <span className="cw-status-dot" />
                  Online
                </span>
              </div>
              <button
                className="cw-close"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
              >
                <FiX size={17} />
              </button>
            </div>

            {/* Messages */}
            <div className="cw-messages">
              {messages.map((m, i) => (
                <div key={i} className={`cw-msg cw-msg-${m.role}`}>
                  <p>{m.content}</p>
                </div>
              ))}
              {loading && <TypingIndicator />}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="cw-input-row">
              <input
                ref={inputRef}
                className="cw-input"
                type="text"
                placeholder="Ask about Kartik…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                disabled={loading}
                maxLength={400}
                aria-label="Message input"
              />
              <button
                className="cw-send"
                onClick={send}
                disabled={!input.trim() || loading}
                aria-label="Send message"
              >
                <FiSend size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Bubble + label ────────────────────────────────── */}
      <div className="cw-bubble-row">
        <AnimatePresence>
          {!open && (
            <motion.span
              className="cw-label"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{
                duration: 0.35,
                ease: APPLE_EASE,
                delay: openedOnce.current ? 0 : 1.4,
              }}
            >
              Ask me anything
            </motion.span>
          )}
        </AnimatePresence>

        <motion.button
          className="cw-bubble"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close chat' : "Chat with Kartik's AI assistant"}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 420, damping: 22 }}
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.16 }}
              >
                <FiX size={22} />
              </motion.span>
            ) : (
              <motion.span
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.16 }}
              >
                <FiMessageCircle size={22} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
};

export default ChatWidget;
