import React, { useState } from "react";
import styles from "./FeedbackForm.module.css";

export default function FeedbackForm({ onSubmit }) {
  const [form, setForm] = useState({ name: "", message: "", rating: 8, department: "Engineering" });
  const departments = ["Engineering", "HR", "Design", "Ops"];

  const submit = (e) => {
    e.preventDefault();
    const item = { ...form, id: `u-${Date.now()}`, createdAt: new Date().toISOString() };
    onSubmit(item);
    // reset
    setForm({ name: "", message: "", rating: 8, department: form.department });
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.h}>Send Feedback</h3>
      <form className={styles.form} onSubmit={submit}>
        <input
          className={styles.input}
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <select
          className={styles.select}
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        >
          {departments.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <textarea
          className={styles.textarea}
          placeholder="Write your feedback..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
          rows={3}
        />
        <div className={styles.row}>
          <label className={styles.rangeLabel}>
            Rating: <strong>{form.rating}</strong>
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
          />
        </div>

        <div className={styles.actions}>
          <button className={styles.btn} type="submit">Send</button>
          <div className={styles.small}>“Developed a realtime feedback app in React where employees can instantly submit and view feedback.” like product thinking.</div>
        </div>
      </form>
    </div>
  );
}




