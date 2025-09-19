import React from "react";
import styles from "./Topbar.module.css";

export default function Topbar({ online = false }) {
  return (
    <header className={styles.topbar}>
      <div className={styles.brand}>
        <div className={styles.logo}>RF</div>
        <div>
          <div className={styles.title}>Realtime Office Feedback</div>
          <div className={styles.subtitle}>Frontend demo • CSS Modules • Recruiter-ready</div>
        </div>
      </div>
      <div className={styles.status}>
        <span className={`${styles.dot} ${online ? styles.online : styles.offline}`} />
        <span className={styles.text}>{online ? "Realtime ON" : "Disconnected (demo mode)"}</span>
      </div>
    </header>
  );
}
