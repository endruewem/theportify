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
      ThePortify
    </div>
  </div>

  <div className={styles.profileWrapper}>
    <div className={styles.profileCircle} onClick={toggleDropdown}></div>

    {isDropdownOpen && (
      <div className={styles.dropdownMenu}>
        <Link href="/viewprofile" className={styles.dropdownItem}>
          <img src="/viewprofile.jpg" alt="pic1" className={styles.dropdownIcon} />
          View Profile
        </Link>
        <Link href="/settings" className={styles.dropdownItem}>
          <img src="/logo3.jpg" alt="pic2" className={styles.dropdownIcon} />
          Settings
        </Link>
        <Link href="/ourstory" className={styles.dropdownItem}>
          <img src="/buku.jpg" alt="pic3" className={styles.dropdownIcon} />
          Our Story
        </Link>
        <Link href="/help" className={styles.dropdownItem}>
          <img src="/logo5.jpg" alt="pic4" className={styles.dropdownIcon} />
          Help
        </Link>
        <Link href="/" className={styles.dropdownItem}>
          <img src="/signout.jpg" alt="pic5" className={styles.dropdownIcon} />
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
          Show, dont tell.
        </h1>
        
      </main>

      
    </>
  );
}
