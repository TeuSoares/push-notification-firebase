"use client";
import Notification from "./Notification";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2>Home Page</h2>
        <Notification />
      </main>
    </div>
  );
}
