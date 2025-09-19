import React, { useMemo } from "react";
import styles from "./Dashboard.module.css";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#60a5fa", "#5eead4", "#f472b6", "#f59e0b", "#34d399"];

export default function Dashboard({ feedbacks = [] }) {
  // rating distribution 1..10 -> aggregated into buckets 1-2,3-4,5-6,7-8,9-10
  const ratingBuckets = useMemo(() => {
    const buckets = { "1-2":0, "3-4":0, "5-6":0, "7-8":0, "9-10":0 };
    for (const f of feedbacks) {
      const r = Number(f.rating) || 0;
      if (r <= 2) buckets["1-2"]++;
      else if (r <= 4) buckets["3-4"]++;
      else if (r <= 6) buckets["5-6"]++;
      else if (r <= 8) buckets["7-8"]++;
      else buckets["9-10"]++;
    }
    return Object.entries(buckets).map(([k,v],i) => ({ name:k, count:v, color:COLORS[i%COLORS.length] }));
  }, [feedbacks]);

  const deptStats = useMemo(() => {
    const map = {};
    for (const f of feedbacks) {
      const d = f.department || "Unknown";
      map[d] = (map[d] || 0) + 1;
    }
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [feedbacks]);

  const total = feedbacks.length;
  const avg = total ? Math.round(feedbacks.reduce((s,f)=> s + (Number(f.rating)||0),0) / total * 10)/10 : 0;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div><h3 className={styles.title}>Dashboard</h3><div className={styles.sub}>Live insights • Use these metrics on your resume</div></div>
        <div className={styles.metrics}>
          <div className={styles.metric}>
            <div className={styles.num}>{total}</div>
            <div className={styles.label}>Total Feedback</div>
          </div>
          <div className={styles.metric}>
            <div className={styles.num}>{avg}</div>
            <div className={styles.label}>Avg Rating</div>
          </div>
        </div>
      </div>

      <div className={styles.charts}>
        <div className={styles.chartBox}>
          <div className={styles.chartTitle}>Rating distribution</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={ratingBuckets}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" >
                {ratingBuckets.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chartBox}>
          <div className={styles.chartTitle}>By department</div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={deptStats} dataKey="value" nameKey="name" outerRadius={80} label>
                {deptStats.map((entry, idx) => <Cell key={`c-${idx}`} fill={COLORS[idx % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={styles.hint}>
        Resume-ready line example:
        <div className={styles.badge}>“Built a realtime feedback UI with live charts; tracked <strong>{total}</strong> responses and maintained a <strong>{avg}</strong> average rating (frontend implementation).”</div>
      </div>
    </div>
  );
}
