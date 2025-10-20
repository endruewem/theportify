"use client";

import Link from "next/link";
import TiltedCard from "../components/TiltedCard"; // tetap sama seperti di homepage
import styles from "./dashboard.module.css";

export default function DashboardPage() {
  return (
    <>
      {/* ===== HEADER ===== */}
      <header className={styles.header}>
        <div className={styles.headerLogo}>
          ThePortify<span className={styles.demoTag}>(demo V1.4)</span>
        </div>

        <div className={styles.profileCircle}></div>


      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className={styles.mainContent}>
        <div className="flex justify-center items-center mt-10">
          <TiltedCard
            imageSrc="/logogede.png"
            altText="THEPORTIFY"
            containerHeight="200px"
            containerWidth="200px"
            imageHeight="200px"
            imageWidth="200px"
            rotateAmplitude={18}
            scaleOnHover={1.1}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true}
          />
        </div>

        <Link href="/profile">
          <button className={styles.btnPrimary}>My Profile</button>
        </Link>

        <h1 className={styles.mainTitle}>
          Welcome, to <span className={styles.highlight}>ThePortify</span>!
        </h1>
        <p className={styles.mainSubtitle}>
          ThePortify is the portfolio workspace where creators <br />
          showcase their work in minutes.
        </p>
      </main>

      {/* ===== FEATURE SECTION ===== */}
      <section className={styles.features}>
        <h2 className={styles.featuresTitle}>
          Heres some of the highlights of the features you get <br />
          when you build portfolio with <span className={styles.highlight}>ThePortify</span>
        </h2>

        <div className={styles.featureList}>
          <div className={styles.featureItem}>
            <div className={styles.featureText}>
              <h3>Guided Template</h3>
              <p>
                <b>No guesswork.</b> Our single, structured template shows you exactly
                where to place titles, images, and content. Just fill in your details
                and your portfolio is ready — clean, organized, and professional.
              </p>
            </div>
            <div className={styles.featureImage}>
              <img src="/gambar1.png" alt="Guided Template" />
            </div>
          </div>

          <div className={styles.featureItem}>
            <div className={styles.featureText}>
              <h3>Instant Share</h3>
              <p>
                <b>Show it to the world.</b> Share your portfolio with a simple link,
                no login required for viewers. Let people explore your work instantly,
                wherever they are.
              </p>
            </div>
            <div className={styles.featureImage}>
              <img src="/gambar2.png" alt="Instant Share" />
            </div>
          </div>

          <div className={styles.featureItem}>
            <div className={styles.featureText}>
              <h3>Download as PDF</h3>
              <p>
                <b>One click download.</b> Convert your portfolio into a polished PDF
                in seconds. Perfect for sharing offline or sending directly to clients
                and employers.
              </p>
            </div>
            <div className={styles.featureImage}>
              <img src="/gambar3.png" alt="Download as PDF" />
            </div>
          </div>
        </div>

        {/* ===== IMAGE SHOWCASE SECTION ===== */}
        <section className="image-showcase">
          <h2 className="image-showcase-title">
            Meet our team
          </h2>

          <div className="image-showcase-list">
            <div className="image-showcase-item">
              <img src="/muka1.png" alt="Member 1" />
              <p className="image-caption">member1</p>
            </div>

            <div className="image-showcase-item">
              <img src="/muka2.png" alt="Member 2" />
              <p className="image-caption">member2</p>
            </div>

            <div className="image-showcase-item">
              <img src="/muka3.png" alt="Member 3" />
              <p className="image-caption">member3</p>
            </div>
          </div>
        </section>




        <p className="feature-quote">
          "Every project tells a story. Make yours unforgettable."
        </p>


        {/* ===== MADING SECTION ===== */}
        <section className={styles.madingSection}>
          <img
            src="/mading.png"
            alt="ThePortify Creative Board"
            className={styles.madingImage}
          />
        </section>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="footer-left">
          <div className="footer-logo">ThePortify</div>
          <p className="footer-social">
            Follow us on: Instagram: <b>@theportify</b> &nbsp; | &nbsp; YouTube:{" "}
            <b>@theportifyoutube</b> ps: blom ada, nanti dibuat
          </p>
        </div>


      {/* Tambahan: teks besar di bawah */}
          <div className="footer-bottom">
            THEPORTIFY
          </div>
      </footer>
    </>
  );
}
