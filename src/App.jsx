import React, { useEffect, useState } from "react";
import Topbar from "./components/Topbar";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";
import Dashboard from "./components/Dashboard";
import styles from "./App.module.css";
import { createMockSocket } from "./data/mockSocket";

/*
  App shows:
  - Topbar
  - Left column: form + recent feedback
  - Right column: dashboard (charts + stats)
  The app uses a mockSocket that emits simulated feedback in realtime.
*/

export default function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Start mock socket (simulates realtime server)
    const socket = createMockSocket();

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    socket.on("newFeedback", (fb) => {
      setFeedbacks((prev) => [fb, ...prev].slice(0, 200)); // keep recent 200
    });

    // load initial demo items
    setFeedbacks(socket.getInitial());

    return () => socket.close();
  }, []);

  const handleLocalSubmit = (item) => {
    // push immediately to UI (like optimistic UI)
    setFeedbacks((prev) => [item, ...prev]);
  };

  return (
    <div className={styles.app}>
      <Topbar online={connected} />
      <div className={styles.container}>
        <div className={styles.left}>
          <FeedbackForm onSubmit={handleLocalSubmit} />
          <FeedbackList feedbacks={feedbacks} />
        </div>
        <div className={styles.right}>
          <Dashboard feedbacks={feedbacks} />
        </div>
      </div>

      <footer className={styles.footer}>
        Built with ❤️ — Realtime UI (frontend-only demo) • CSS Modules • Professional-ready
      </footer>
    </div>
  );
}


