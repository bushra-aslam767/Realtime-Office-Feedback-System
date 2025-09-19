import React from "react";
import styles from "./FeedbackList.module.css";
import { timeAgo } from "../utils/format";

export default function FeedbackList({ feedbacks = [] }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Recent feedback</h3>
      <ul className={styles.list}>
        {feedbacks.slice(0, 20).map((f) => (
          <li key={f.id} className={styles.item}>
            <div className={styles.meta}>
              <div className={styles.name}>{f.name}</div>
              <div className={styles.department}>{f.department}</div>
              <div className={styles.time}>{timeAgo(f.createdAt)}</div>
            </div>
            <div className={styles.body}>
              <div className={styles.msg}>{f.message}</div>
              <div className={styles.rating}>⭐ {f.rating}/10</div>
            </div>
          </li>
        ))}
        {feedbacks.length === 0 && <li className={styles.empty}>No feedback yet — be first! ✨</li>}
      </ul>
    </div>
  );
}

