"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault(); // supaya nggak reload page
    router.push("/dashboard"); // arahkan ke dashboard
  };

  return (
    <main className={styles.wrapper}>
      {/* ===== LEFT IMAGE SIDE ===== */}
      <div className={styles.left}>
        <div className={styles.overlay}>
          <h1 className={styles.brand}>ThePortify</h1>
          <p className={styles.tagline}>Show your best portfolio to the world.</p>
        </div>
      </div>

      {/* ===== RIGHT LOGIN FORM ===== */}
      <div className={styles.right}>
        <div className={styles.card}>
          <h2 className={styles.title}>Welcome Back Bung!</h2>
          <p className={styles.subtitle}>Login to your account</p>

          <form className={styles.form} onSubmit={handleLogin}>
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

            <div className={styles.forgotContainer}>
              <Link href="/auth/forgotpass" className={styles.forgot}>
                Forgot password?
              </Link>
            </div>

            <button type="submit" className={styles.button}>
              Login
            </button>
          </form>

          <p className={styles.registerText}>
            Dont have an account?{" "}
            <Link href="/auth/signup" className={styles.link}>
              Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}


