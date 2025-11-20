"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./codepass.module.css";

export default function CodePassPage() {
  const router = useRouter();
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    // hanya izinkan angka
    if (!/^[0-9]?$/.test(value)) return;

    // isi value & fokus ke input berikutnya
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }

    // kalau semua terisi, langsung redirect
    const allFilled = inputsRef.current.every((input) => input?.value);
    if (allFilled) {
      setTimeout(() => router.push("/dashboard"), 500);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <main className={styles.wrapper}>
      {/* ===== LEFT IMAGE SIDE ===== */}
      <div className={styles.left}>
        <div className={styles.overlay}>
          <h1 className={styles.brand}>ThePortify</h1>
          <p className={styles.tagline}>Secure your account with verification code.</p>
        </div>
      </div>

      {/* ===== RIGHT FORM SIDE ===== */}
      <div className={styles.right}>
        <div className={styles.card}>
          <h2 className={styles.title}>Enter Verification Code</h2>
          <p className={styles.subtitle}>Weve sent a 6-digit code to your email.</p>

          <div className={styles.codeInputs}>
            {[...Array(6)].map((_, i) => (
              <input
                key={i}
                type="text"
                maxLength="1"
                className={styles.codeInput}
                ref={(el) => (inputsRef.current[i] = el)}
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

