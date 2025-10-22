"use client";

import { useState } from "react";
import "./AuthModal.css";
import OtpInput from "./OtpInput";

export default function AuthModal({ mode, onClose }) {
  const [authMode, setAuthMode] = useState(mode); // 'login' or 'signup'
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  const handleGoogle = () => {
    // simulasi langsung ke dashboard
    window.location.href = "/dashboard";
  };

  const handleEmailNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleOtpValidate = (code) => {
    console.log("Kode OTP:", code);
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 500);
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        {/* ===== STEP 1: Choose Method ===== */}
        {step === 1 && (
          <>
            <h2>{authMode === "login" ? "Welcome Back." : "Join ThePortify."}</h2>
            

            <button className="auth-google-btn" onClick={handleGoogle}>
              <img src="logogoogle.jpg" alt="Google" />
              Continue with Google
            </button>
          {/*
            <button className="auth-email-btn" onClick={() => setStep(2)}>
              <img src="/logoemail.jpg" alt="Email" />
              Continue with Email
            </button>*/}

            <p className="auth-footer-text">
              {authMode === "login" ? (
                <>
                  Dont have an account?{" "}
                  <span
                    className="auth-link"
                    onClick={() => {
                      setAuthMode("signup");
                      setStep(1);
                    }}
                  >
                    Create one
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span
                    className="auth-link"
                    onClick={() => {
                      setAuthMode("login");
                      setStep(1);
                    }}
                  >
                    Sign in
                  </span>
                </>
              )}
            </p>

            {/* 🔽 Tambahan baru: Terms of Service text */}
            <p className="terms-text">
              By clicking “{authMode === "login" ? "Sign in" : "Sign up"}”, you
              accept ThePortifys{" "}
              <span className="auth-link">Terms of Service</span> and{" "}
              <span className="auth-link">Privacy Policy</span>.
            </p>
          </>
        )}

        {/* ===== STEP 2: Enter Email ===== */}
        {step === 2 && (
          <>
            <h2>
              {authMode === "login" ? "Sign in with Email" : "Sign up with Email"}
            </h2>
            <p>Your email</p>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
            />

            <button className="auth-next-btn" onClick={handleEmailNext}>
              Continue
            </button>

            {/* 🔽 Tambahan baru: tombol Back */}
            <p
              className="back-option"
              onClick={() => setStep(1)}
            >
            Back to {authMode === "login" ? "sign in" : "sign up"} options
            </p>
          </>
        )}

        {/* ===== STEP 3: Enter Code ===== */}
        {/* 
        {step === 3 && (
          <>
            <h2>Check your email inbox</h2>
            <p>Enter the code we sent to {email || "your email"}.</p>
            <OtpInput length={6} onValidate={handleOtpValidate} />
            <p className="resend-text">
              Didnt get the code? <span>Resend</span>
            </p>
          </>
        )}*/}
      </div>
    </div>
  );
}
