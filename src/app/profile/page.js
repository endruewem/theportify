"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./profile.module.css";

export default function ProfilePage() {
  // ====== STATE BAGIAN ATAS (IDENTITAS) ======
  const [profile, setProfile] = useState({
    name: "",
    profession: "",
    description: "",
    contact: "",
    photo: null,
  });

  const descRef = useRef(null);
  const contactRef = useRef(null);

  // ====== STATE UNTUK BAGIAN LIST (education, skills, dsb) ======
  const [lists, setLists] = useState([]);

  // ====== STATE UNTUK PROOF (gambar, judul, deskripsi) ======
  const [proofs, setProofs] = useState([]);

  // ====== STATE UNTUK LET’S CONNECT ======
  const [connects, setConnects] = useState([]);

  // =============== HANDLER FOTO PROFILE ===============
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile({ ...profile, photo: imageUrl });
    }
  };

  // === AUTO-EXPAND TEXTAREA ===
  useEffect(() => {
    const resize = (el) => {
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    };
    if (descRef.current) {
      resize(descRef.current);
      descRef.current.addEventListener("input", () => resize(descRef.current));
    }
    if (contactRef.current) {
      resize(contactRef.current);
      contactRef.current.addEventListener("input", () =>
        resize(contactRef.current)
      );
    }
    return () => {
      if (descRef.current)
        descRef.current.removeEventListener("input", () =>
          resize(descRef.current)
        );
      if (contactRef.current)
        contactRef.current.removeEventListener("input", () =>
          resize(contactRef.current)
        );
    };
  }, []);

  // =============== HANDLER UNTUK LIST ===============
  const addList = () => setLists([...lists, { title: "", items: [] }]);
  const addSubItem = (listIndex) => {
    const newLists = [...lists];
    newLists[listIndex].items.push({ subTitle: "", description: "" });
    setLists(newLists);
  };
  const updateListTitle = (index, value) => {
    const newLists = [...lists];
    newLists[index].title = value;
    setLists(newLists);
  };
  const updateSubItem = (listIndex, subIndex, field, value) => {
    const newLists = [...lists];
    newLists[listIndex].items[subIndex][field] = value;
    setLists(newLists);
  };

  // =============== HANDLER UNTUK PROOF ===============
  const addProofSection = () => setProofs([...proofs, { title: "", cards: [] }]);
  const addProofCard = (sectionIndex) => {
    const newProofs = [...proofs];
    newProofs[sectionIndex].cards.push({
      image: null,
      title: "",
      desc: "",
    });
    setProofs(newProofs);
  };
  const handleProofImage = (sectionIndex, cardIndex, file) => {
    const imageUrl = URL.createObjectURL(file);
    const newProofs = [...proofs];
    newProofs[sectionIndex].cards[cardIndex].image = imageUrl;
    setProofs(newProofs);
  };
  const updateProofField = (sectionIndex, cardIndex, field, value) => {
    const newProofs = [...proofs];
    newProofs[sectionIndex].cards[cardIndex][field] = value;
    setProofs(newProofs);
  };

  // =============== HANDLER UNTUK LET’S CONNECT ===============
  const addConnect = () => setConnects([...connects, ""]);
  const updateConnect = (i, v) => {
    const newC = [...connects];
    newC[i] = v;
    setConnects(newC);
  };

  // ===========================================================
  return (
    <>
      {/* ===== HEADER ===== */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.logo}>ThePortify</div>
          <button
            className={styles.backBtn}
            onClick={() => (window.location.href = "/dashboard")}
          >
            Home
          </button>
        </div>
        <button className={styles.shareBtn}>Share Profile</button>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className={styles.main}>
        {/* ---------- BAGIAN IDENTITAS ---------- */}
        <section className={styles.identity}>
          {/* FOTO */}
          <div className={styles.photoBox}>
            {profile.photo ? (
              <img
                src={profile.photo}
                alt="profile"
                className={styles.photoPreview}
              />
            ) : (
              <label className={styles.uploadLabel}>
                Insert your photo
                <input type="file" onChange={handleImageUpload} hidden />
              </label>
            )}
          </div>

          {/* INFO */}
          <div className={styles.infoBox}>
            <input
              type="text"
              placeholder="Your Name"
              value={profile.name}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Your Job/Major"
              value={profile.profession}
              onChange={(e) =>
                setProfile({ ...profile, profession: e.target.value })
              }
              className={styles.input}
            />

            {/* DESKRIPSI */}
            <textarea
              ref={descRef}
              placeholder="Your Description"
              value={profile.description}
              onChange={(e) =>
                setProfile({ ...profile, description: e.target.value })
              }
              className={styles.textarea}
            />

            {/* CONTACT */}
            <h3>Contact :</h3>
            <textarea
              ref={contactRef}
              placeholder="Your Contact (Ex: Instagram: @yourinstagram)"
              value={profile.contact}
              onChange={(e) =>
                setProfile({ ...profile, contact: e.target.value })
              }
              className={styles.textarea}
            />
          </div>
        </section>

        {/* ---------- BAGIAN LIST SECTION ---------- */}
<section className={styles.listSection}>
  <h2>My Journey</h2>

  <div className={styles.listWrapper}>
    {/* Kolom kiri */}
    <div className={styles.leftColumn}>
      {lists
        .filter((_, i) => i % 2 === 0)
        .map((list, i) => (
          <div key={i} className={styles.listItem}>
            <input
              type="text"
              placeholder="Title (Ex: Education/Skills/Experience)"
              value={list.title}
              onChange={(e) => updateListTitle(i * 2, e.target.value)}
              className={styles.listTitle}
            />
            {list.items.map((sub, j) => (
              <div key={j} className={styles.subItem}>
                <input
                  type="text"
                  placeholder="List Title"
                  value={sub.subTitle}
                  onChange={(e) =>
                    updateSubItem(i * 2, j, "subTitle", e.target.value)
                  }
                  className={styles.subTitle}
                />
                <textarea
                  placeholder="Description"
                  value={sub.description}
                  onInput={(e) => {
                    updateSubItem(i, j, "description", e.target.value);
                    e.target.style.height = "auto";
                    e.target.style.height = e.target.scrollHeight + "px";
                  }}
                  className={styles.subDesc}
                />
              </div>
            ))}
            <button
              className={styles.addBtnSmall}
              onClick={() => addSubItem(i * 2)}
            >
              +
            </button>
          </div>
        ))}
    </div>

    {/* Garis tengah */}
    <div className={styles.middleLine}></div>

    {/* Kolom kanan */}
    <div className={styles.rightColumn}>
      {lists
        .filter((_, i) => i % 2 !== 0)
        .map((list, i) => (
          <div key={i} className={styles.listItem}>
            <input
              type="text"
              placeholder="Title (Ex: Education/Skills/Experience)"
              value={list.title}
              onChange={(e) => updateListTitle(i * 2 + 1, e.target.value)}
              className={styles.listTitle}
            />
            {list.items.map((sub, j) => (
              <div key={j} className={styles.subItem}>
                <input
                  type="text"
                  placeholder="List Title"
                  value={sub.subTitle}
                  onChange={(e) =>
                    updateSubItem(i * 2 + 1, j, "subTitle", e.target.value)
                  }
                  className={styles.subTitle}
                />
                <textarea
                  placeholder="Description"
                  value={sub.description}
                  onInput={(e) => {
                    updateSubItem(i * 2 + 1, j, "description", e.target.value);
                    e.target.style.height = "auto";
                    e.target.style.height = e.target.scrollHeight + "px";
                  }}
                  className={styles.subDesc}
                />
              </div>
            ))}
            <button
              className={styles.addBtnSmall}
              onClick={() => addSubItem(i * 2 + 1)}
            >
              +
            </button>
          </div>
        ))}
    </div>
  </div>

  <button className={styles.addBtn} onClick={addList}>
    + Add List
  </button>
</section>



        {/* ---------- BAGIAN PROOF ---------- */}
        <section className={styles.proofSection}>
          <h2>Documentation</h2>
          {proofs.map((p, i) => (
            <div key={i} className={styles.proofBox}>
              <input
  type="text"
  placeholder="Documentation Title (Ex: Certificate/Documentation of Experience) Here:"
  value={p.title}
  onChange={(e) => {
    const newProofs = [...proofs];
    newProofs[i].title = e.target.value;
    setProofs(newProofs);
  }}
  className={`${styles.input} ${styles.proofBoxTitle}`}
/>



              <div className={styles.proofGrid}>
                {p.cards.map((c, j) => (
                  <div key={j} className={styles.proofCard}>
                    {c.image ? (
                      <img
                        src={c.image}
                        alt="proof"
                        className={styles.proofImage}
                      />
                    ) : (
                      <label className={styles.uploadLabelSmall}>
                        Upload Documentation Image
                        <input
                          type="file"
                          hidden
                          onChange={(e) =>
                            handleProofImage(i, j, e.target.files[0])
                          }
                        />
                      </label>
                    )}
                    <input
                type="text"
                placeholder="Judul"
                value={c.title}
                onChange={(e) =>
                  updateProofField(i, j, "title", e.target.value)
                }
                className={`${styles.inputSmall} ${styles.proofTitle}`}
              />
                  <textarea
  placeholder="Deskripsi"
  value={c.desc}
  onChange={(e) => {
    updateProofField(i, j, "desc", e.target.value);
    e.target.style.height = "auto"; // reset tinggi dulu
    e.target.style.height = e.target.scrollHeight + "px"; // sesuaikan tinggi isi
  }}
  className={`${styles.inputSmall} ${styles.proofDesc}`}
/>



                  </div>
                ))}
              </div>
              <button
                className={styles.addBtnSmall}
                onClick={() => addProofCard(i)}
              >
                + 
              </button>
            </div>
          ))}
          <button className={styles.addBtn} onClick={addProofSection}>
            + Add Documentation
          </button>
        </section>

        {/* ---------- LET’S CONNECT ---------- */}
<section className={styles.connectSection}>
  <h2>Lets Connect</h2>
  <div className={styles.connectList}>
    {connects.map((item, i) => (
      <textarea
        key={i}
        placeholder="Your Contact (Ex: Instagram: @yourinstagram)"
        value={item}
        onChange={(e) => updateConnect(i, e.target.value)}
        className={styles.contactInput}
        rows={1}
        onInput={(e) => {
          e.target.style.height = "auto";
          e.target.style.height = e.target.scrollHeight + "px";
        }}
      />
    ))}
  </div>
  <button className={styles.addBtn} onClick={addConnect}>
    + Add Contact
  </button>
</section>


    
      </main>

      {/* ===== FOOTER ===== */}
              <footer className={styles.footer}>
          <div className={styles.saveBar}>
            <button className={styles.saveBtn}>Save</button>
            <button className={styles.pdfBtn}>Save as PDF</button>
          </div>
        </footer>
    </>
  );
}