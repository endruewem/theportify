"use client";
import { useRef, useState } from "react";
import styles from "./OtpInput.module.css";

export default function OtpInput({ length = 6, onValidate }) {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return; // hanya angka
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // pindah otomatis ke kotak berikutnya
    if (value && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleValidate = () => {
    const code = otp.join("");
    if (code.length === length) {
      onValidate(code); // kirim ke parent
    } else {
      alert("Please enter all 6 digits");
    }
  };

  return (
    <div className={styles.otpWrapper}>
      <div className={styles.otpContainer}>
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={(el) => (inputsRef.current[i] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={styles.otpBox}
          />
        ))}
      </div>

      <button
        className={styles.validateButton}
        onClick={handleValidate}
      >
        Validate
      </button>
    </div>
  );
}
