"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dashboardStyles from "../dashboard/dashboard.module.css";

export default function HelpPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // tutup dropdown saat klik di luar area
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
                <img src="/logo1.png" alt="pic1" className={dashboardStyles.dropdownIcon} />
                View Profile
              </Link>
              <Link href="/dashboard" className={dashboardStyles.dropdownItem}>
                <img src="/logo2.png" alt="pic2" className={dashboardStyles.dropdownIcon} />
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
                <img src="/logo5.png" alt="pic5" className={dashboardStyles.dropdownIcon} />
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
      </>
  );
}
