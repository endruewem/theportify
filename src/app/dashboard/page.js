"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import TiltedCard from "../components/TiltedCard";
import styles from "./dashboard.module.css";

export default function DashboardPage() {
  // === STATE UNTUK DROPDOWN ===
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  


  // === FUNCTION UNTUK TOGGLE DROPDOWN ===
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // === TUTUP DROPDOWN SAAT KLIK DI LUAR AREA ===
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(`.${styles.profileWrapper}`)) {
        setIsDropdownOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      {/* ===== HEADER ===== */}
     <header className={styles.header}>
  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    <div className={styles.hamburger} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
      <span></span>
      <span></span>
      <span></span>
    </div>

    <div className={styles.headerLogo}>
      ThePortify<span className={styles.demoTag}>(demo V1.9)</span>
    </div>
  </div>

  <div className={styles.profileWrapper}>
    <div className={styles.profileCircle} onClick={toggleDropdown}></div>

    {isDropdownOpen && (
      <div className={styles.dropdownMenu}>
        <Link href="/viewprofile" className={styles.dropdownItem}>
          <img src="/potomata.jpg" alt="pic1" className={styles.dropdownIcon} />
          View Profile
        </Link>
        <Link href="/dashboard" className={styles.dropdownItem}>
          <img src="/logo2.jpg" alt="pic2" className={styles.dropdownIcon} />
          Home
        </Link>
        <Link href="/settings" className={styles.dropdownItem}>
          <img src="/logo3.png" alt="pic3" className={styles.dropdownIcon} />
          Settings
        </Link>
        <Link href="/ourstory" className={styles.dropdownItem}>
          <img src="/logokopi.jpg" alt="pic4" className={styles.dropdownIcon} />
          Our Story
        </Link>
        <Link href="/help" className={styles.dropdownItem}>
          <img src="/logo5.jpg" alt="pic5" className={styles.dropdownIcon} />
          Help
        </Link>
        <Link href="/" className={styles.dropdownItem}>
          <img src="/logo6.png" alt="pic6" className={styles.dropdownIcon} />
          Sign Out
        </Link>
      </div>
    )}
  </div>
</header>


<div className={`${styles.sidebar} ${isSidebarOpen ? styles.show : ""}`}>
  <Link href="/dashboard" className={styles.sidebarItem}>
    <img src="/logo2.1.jpg" alt="home-icon" className={styles.sidebarIcon} />
    Home
  </Link>
  <Link href="/viewprofile" className={styles.sidebarItem}>
    <img src="/logo2.2.jpg" alt="profile-icon" className={styles.sidebarIcon} />
    Profile
  </Link>
</div>






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

        <Link href="/profile2">
          <button className={styles.btnPrimary}>My Profile</button>
        </Link>

        <h1 className={styles.mainTitle}>
          Welcome, to <span className={styles.highlight}>ThePortify</span>!
        </h1>
        <p>Show, dont tell</p>
        
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




        


        {/* ===== MADING SECTION ===== */}
        <section className={styles.madingSection}>
          <img
            src="/mading.png"
            alt="ThePortify Creative Board"
            className={styles.madingImage}
          />

          
        </section>
        <p className="feature-quote">
          "Every project tells a story. Make yours unforgettable."
        </p>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="footer-left">
          <div className="footer-logo">ThePortify</div>
          <p className="footer-social">"Thank you for visiting ThePortify and taking a moment to discover what were building with passion and purpose"</p>
          <p className="footer-social">
            Made with ❤️ by ThePortify Team &nbsp; - &nbsp; © 2025 &nbsp; | &nbsp; All right reserved. &nbsp; | &nbsp; @theportify 
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
