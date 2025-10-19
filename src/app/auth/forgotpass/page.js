"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./forgotpass.module.css";

export default function ForgetPassPage() {
  const router = useRouter();

  const handleSendCode = (e) => {
    e.preventDefault();
    router.push("/auth/codepass"); // direct ke halaman codepass
  };

  return (
    <main className={styles.wrapper}>
      {/* ===== LEFT IMAGE SIDE ===== */}
      <div className={styles.left}>
        <div className={styles.overlay}>
          <h1 className={styles.brand}>ThePortify</h1>
          <p className={styles.tagline}>
            Reset your password and get back on track.
          </p>
        </div>
      </div>

      {/* ===== RIGHT FORGET PASSWORD FORM ===== */}
      <div className={styles.right}>
        <div className={styles.card}>
          <h2 className={styles.title}>Forgot Password</h2>
          <p className={styles.subtitle}>
            Enter your email address to receive a reset code
          </p>

          <form className={styles.form} onSubmit={handleSendCode}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className={styles.input}
              required
            />

            <button type="submit" className={styles.button}>
              Send Code
            </button>
          </form>

          <p className={styles.registerText}>
            Remembered your password?{" "}
            <Link href="/auth/login" className={styles.link}>
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
