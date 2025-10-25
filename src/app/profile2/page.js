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

const handleAutoResize = (e) => {
  e.target.style.height = "auto";
  e.target.style.height = e.target.scrollHeight + "px";
};


const handleRemoveTag = (indexToRemove) => {
  setHashtags((prevTags) => prevTags.filter((_, idx) => idx !== indexToRemove));
};


const [showOptions, setShowOptions] = useState(false);

const toggleOptions = () => {
  setShowOptions((prev) => !prev);
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
        <span> + Insert Image</span>
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
      {/* BOX INFO */}
<div className={styles.infoSection}>
  <textarea
    placeholder="Your Name"
    className={styles.nameInput}
    rows={1}
    onInput={handleAutoResize}
  />
  <textarea
    placeholder="Your Job"
    className={styles.jobInput}
    rows={1}
    onInput={handleAutoResize}
  />
  <textarea
    placeholder="''One sentence describe what you're doing''"
    className={styles.motoInput}
    rows={1}
    onInput={handleAutoResize}
  />
</div>



      {/* BOX DESKRIPSI */}
      <div className={styles.descBox}>
        <textarea
  placeholder="Your description"
  className={styles.descInput}
  rows={1}
  onInput={handleAutoResize}
/>

      </div>
    </div>
  </div>

  {/* HASHTAG BOX */}
  <div className={styles.hashtagSection}>
    {hashtags.map((tag, idx) => (
  <div
    key={idx}
    className={styles.hashtag}
    onClick={() => handleRemoveTag(idx)}   // 🟢 klik = hapus
    title="Klik untuk hapus"               // 🟢 tooltip kecil
  >
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






{/* ADD MORE BUTTON */}
<div className={styles.addMoreWrapper}>
  <button onClick={toggleOptions} className={styles.addMoreButton}>
    + Add more
  </button>

  {/* OPTION BUTTONS (List & Card) */}
  <div className={`${styles.optionBox} ${showOptions ? styles.show : ""}`}>
    <button className={styles.optionButton}>List</button>
    <button className={styles.optionButton}>Card</button>
  </div>
</div>


</main>

    </>
  );
}

