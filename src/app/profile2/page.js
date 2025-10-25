"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./profile2.module.css";
import dashboardStyles from "../dashboard/dashboard.module.css";

export default function HelpPage() {
  const [image, setImage] = useState(null);
  const [hashtags, setHashtags] = useState([]);
  const [inputTag, setInputTag] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleTagInput = (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      const tag = inputTag.trim();
      if (tag && !hashtags.includes(tag)) {
        setHashtags([...hashtags, tag]);
      }
      setInputTag("");
    }
  };

  return (
    <>
      {/* ===== HEADER ===== */}
      <header className={`${dashboardStyles.header} ${styles.headerCustom}`}>
        {/* === KIRI: Logo + Home === */}
        <div className={styles.leftSection}>
          <div className={dashboardStyles.headerLogo}>ThePortify</div>
          <Link href="/dashboard" className={styles.homeButton}>
            Home
          </Link>
        </div>

        {/* === KANAN: Tombol Save / PDF / Share === */}
        <div className={styles.rightSection}>
          <button className={styles.saveButton}>Save</button>
          <button className={styles.pdfButton}>Save as PDF</button>
          <button className={styles.shareButton}>Share</button>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
     <main className={styles.mainContainer}>
  <div className={styles.profileSection}>
    {/* FOTO */}
    <label className={styles.photoWrapper}>
      {image ? (
        <img src={image} alt="Preview" className={styles.photoPreview} />
      ) : (
        <span>+ Upload Foto</span>
      )}
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
    </label>

    {/* === KANAN (INFO + DESKRIPSI DALAM WRAPPER) === */}
    <div className={styles.infoRightWrapper}>
      {/* BOX INFO */}
      <div className={styles.infoSection}>
        <input
          type="text"
          placeholder="Your Name"
          className={styles.nameInput}
        />
        <input
          type="text"
          placeholder="Your Job"
          className={styles.jobInput}
        />
        <input
          type="text"
          placeholder="''One sentence describe what you're doing''"
          className={styles.motoInput}
        />
      </div>

      {/* BOX DESKRIPSI */}
      <div className={styles.descBox}>
        <textarea
          placeholder="Your description"
          className={styles.descInput}
        />
      </div>
    </div>
  </div>

  {/* HASHTAG BOX */}
  <div className={styles.hashtagSection}>
    {hashtags.map((tag, idx) => (
      <div key={idx} className={styles.hashtag}>
        #{tag}
      </div>
    ))}
    <input
      type="text"
      placeholder="Tambah hashtag..."
      value={inputTag}
      onChange={(e) => setInputTag(e.target.value)}
      onKeyDown={handleTagInput}
      className={styles.hashtagInput}
    />
  </div>
</main>

    </>
  );
}

