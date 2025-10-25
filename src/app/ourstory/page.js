"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./ourstory.module.css";
import dashboardStyles from "../dashboard/dashboard.module.css"; // ← Import CSS dashboard juga

export default function OurStoryPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // close dropdown saat klik luar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(`.${dashboardStyles.profileWrapper}`)) {
        setIsDropdownOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      {/* ===== HEADER ===== */}
      <header className={dashboardStyles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            className={dashboardStyles.hamburger}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className={dashboardStyles.headerLogo}>
            ThePortify<span className={dashboardStyles.demoTag}>(demo V1.5)</span>
          </div>
        </div>

        <div className={dashboardStyles.profileWrapper}>
          <div className={dashboardStyles.profileCircle} onClick={toggleDropdown}></div>

          {isDropdownOpen && (
            <div className={dashboardStyles.dropdownMenu}>
              <Link href="/viewprofile" className={dashboardStyles.dropdownItem}>
                <img src="/logo1.jpg" alt="pic1" className={dashboardStyles.dropdownIcon} />
                View Profile
              </Link>
              <Link href="/dashboard" className={dashboardStyles.dropdownItem}>
                <img src="/logo2.jpg" alt="pic2" className={dashboardStyles.dropdownIcon} />
                Home
              </Link>
              <Link href="/settings" className={dashboardStyles.dropdownItem}>
                <img src="/logo3.png" alt="pic3" className={dashboardStyles.dropdownIcon} />
                Settings
              </Link>
              <Link href="/ourstory" className={dashboardStyles.dropdownItem}>
                <img src="/logo4.png" alt="pic4" className={dashboardStyles.dropdownIcon} />
                Our Story
              </Link>
              <Link href="/help" className={dashboardStyles.dropdownItem}>
                <img src="/logo5.jpg" alt="pic5" className={dashboardStyles.dropdownIcon} />
                Help
              </Link>
              <Link href="/" className={dashboardStyles.dropdownItem}>
                <img src="/logo6.png" alt="pic6" className={dashboardStyles.dropdownIcon} />
                Sign Out
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* ===== SIDEBAR ===== */}
      <div className={`${dashboardStyles.sidebar} ${isSidebarOpen ? dashboardStyles.show : ""}`}>
        <Link href="/dashboard" className={dashboardStyles.sidebarItem}>
          <img src="/logo2.1.png" alt="home-icon" className={dashboardStyles.sidebarIcon} />
          Home
        </Link>
        <Link href="/viewprofile" className={dashboardStyles.sidebarItem}>
          <img src="/logo2.2.png" alt="profile-icon" className={dashboardStyles.sidebarIcon} />
          Profile
        </Link>
      </div>

      {/* ===== ISI HALAMAN OUR STORY ===== */}
      <div className={styles.container}>

        <h1 className={styles.heading}>
          Everyone deserves a simple way to show who they are.
        </h1>

        <p className={styles.paragraph}>
          ThePortify was built for people who struggle to create a portfolio, those who know
          what they can do, but dont know how to show it. For students chasing internships,
          for graduates preparing their first job application, or for HR professionals who
          need a cleaner, faster way to review talent. ThePortify makes portfolios that are
          structured, clear, and ready in minutes.
        </p>

        <h2 className={styles.vision}>
          Ultimately, our goal is to make showing your work effortless.
        </h2>

        <p className={styles.paragraph}>
          We believe that a portfolio shouldnt be a design challenge it should be a
          reflection of real skill. Thats why ThePortify focuses on simplicity, speed, and
          clarity. With one clean layout and no unnecessary steps, anyone can build a
          professional portfolio that speaks for itself.
        </p>

        <p className={styles.paragraph}>
          We want to save people from hours of formatting and confusion, and help HR
          reviewers skip the noise. No cluttered pages, no endless scrolling just a
          straightforward view of someones best work. And if you need it offline? One
          click, and its a polished PDF.
        </p>

        <p className={styles.paragraph}>
          ThePortify exists to bring order to the chaos of digital portfolios. Because your
          story isnt about fancy effects or login walls its about your work, your journey,
          and how clearly you can share it with the world.
        </p>

        <div className="image-showcase-item" style={{ textAlign: "center", marginTop: "40px" }}>
          <img
            src="/goodluck.png"
            alt="fotogudlak"
            style={{ maxWidth: "300px", borderRadius: "12px" }}
          />
          <p className="image-caption" style={{ fontSize: "14px", marginTop: "10px" }}>
            cekrek
          </p>
        </div>
      </div>
    </>
  );
}


