"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./signup.module.css";

export default function SignupPage() {
  const router = useRouter();

  const handleSignup = (e) => {
    e.preventDefault(); // biar gak reload page
    router.push("/dashboard"); // redirect sementara
  };

  return (
    <main className={styles.wrapper}>
      {/* ===== LEFT IMAGE SIDE ===== */}
      <div className={styles.left}>
        <div className={styles.overlay}>
          <h1 className={styles.brand}>ThePortify</h1>
          <p className={styles.tagline}>Create your portfolio and share your story.</p>
        </div>
      </div>

      {/* ===== RIGHT SIGNUP FORM ===== */}
      <div className={styles.right}>
        <div className={styles.card}>
          <h2 className={styles.title}>Create Account.</h2>
          <p className={styles.subtitle}>Sign up your 'ThePortify' account to get started</p>

          <form className={styles.form} onSubmit={handleSignup}>
            <label htmlFor="name" className={styles.label}>
              Your Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className={styles.input}
              required
            />

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

            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className={styles.input}
              required
            />

            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Re-enter your password"
              className={styles.input}
              required
            />

            <button type="submit" className={styles.button}>
              Register
            </button>
          </form>

          <p className={styles.registerText}>
            Already have an account?{" "}
            <Link href="/auth/login" className={styles.link}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
