"use client";
import Notification from "./Notification";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Notification />
      </main>
    </div>
  );
}
