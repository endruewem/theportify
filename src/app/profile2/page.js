"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./profile2.module.css";
import dashboardStyles from "../dashboard/dashboard.module.css";

export default function HelpPage() {
  // ===== STATE DASAR =====
  const [image, setImage] = useState(null);
  const [hashtags, setHashtags] = useState([]);
  const [hashtagInput, setHashtagInput] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [listSections, setListSections] = useState([]);
  const [cardSections, setCardSections] = useState([]);
  
  // ===== POPUP STATE =====
  const [showPopup, setShowPopup] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [popupData, setPopupData] = useState(null);

  // ===== CONTACT STATE =====
  const [contactLinks, setContactLinks] = useState([]);
  const [showLogoOptions, setShowLogoOptions] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  // ===== LOGO OPTIONS =====
  const logoOptions = [
    { id: "email", name: "Email", icon: "📧" },
    { id: "linkedin", name: "LinkedIn", icon: "💼" },
    { id: "github", name: "GitHub", icon: "🐙" },
    { id: "twitter", name: "Twitter", icon: "🐦" },
    { id: "instagram", name: "Instagram", icon: "📷" },
    { id: "facebook", name: "Facebook", icon: "📘" },
    { id: "whatsapp", name: "WhatsApp", icon: "💬" },
    { id: "website", name: "Website", icon: "🌐" },
  ];

  // ===== HANDLE FOTO =====
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // ===== HANDLE CARD IMAGE =====
  const handleCardImageUpload = (e, sectionId, cardIndex) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCardSections((prevSections) =>
          prevSections.map((section) =>
            section.id === sectionId
              ? {
                  ...section,
                  cards: section.cards.map((card, idx) =>
                    idx === cardIndex ? { ...card, image: reader.result } : card
                  ),
                }
              : section
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  // ===== HANDLE POPUP IMAGE =====
  const handlePopupImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPopupData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // ===== AUTO RESIZE TEXTAREA =====
  const handleAutoResize = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  // ===== HASHTAG =====
  const handleHashtagKeyDown = (e) => {
    if (e.key === "Enter" && hashtagInput.trim() !== "") {
      e.preventDefault();
      const newTag = hashtagInput.trim();
      if (!hashtags.includes(newTag)) {
        setHashtags((prev) => [...prev, newTag]);
      }
      setHashtagInput("");
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    setHashtags((prevTags) => prevTags.filter((_, idx) => idx !== indexToRemove));
  };

  // ===== OPTION BUTTONS =====
  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  // ===== TAMBAH LIST SECTION BARU =====
  const handleAddListSection = () => {
    const newSection = {
      id: Date.now(),
      type: "list",
      title: "",
      items: [{ title: "", subtitle: "", description: "" }],
    };
    setListSections((prev) => [...prev, newSection]);
    setShowOptions(false);
  };

  // ===== TAMBAH ITEM DALAM LIST =====
  const handleAddListItem = (sectionId) => {
    setListSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              items: [...section.items, { title: "", subtitle: "", description: "" }],
            }
          : section
      )
    );
  };

  // ===== UPDATE ISI ITEM LIST =====
  const handleItemChange = (sectionId, itemIndex, field, value) => {
    setListSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map((item, idx) =>
                idx === itemIndex ? { ...item, [field]: value } : item
              ),
            }
          : section
      )
    );
  };

  // ===== UPDATE JUDUL LIST SECTION =====
  const handleListTitleChange = (sectionId, value) => {
    setListSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId ? { ...section, title: value } : section
      )
    );
  };

  // ===== TAMBAH CARD SECTION BARU =====
  const handleAddCardSection = () => {
    const newSection = {
      id: Date.now(),
      type: "card",
      title: "",
      cards: [],
    };
    setCardSections((prev) => [...prev, newSection]);
    setShowOptions(false);
  };

  // ===== TAMBAH CARD BARU =====
  const handleAddCard = (sectionId) => {
    setCardSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              cards: [
                ...section.cards,
                {
                  id: Date.now(),
                  image: null,
                  title: "",
                  description: "",
                  fullTitle: "",
                  fullDescription: "",
                  links: [{ text: "", url: "" }],
                },
              ],
            }
          : section
      )
    );
  };

  // ===== UPDATE CARD TITLE & DESC (PREVIEW) =====
  const handleCardChange = (sectionId, cardIndex, field, value) => {
    setCardSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              cards: section.cards.map((card, idx) =>
                idx === cardIndex ? { ...card, [field]: value } : card
              ),
            }
          : section
      )
    );
  };

  // ===== UPDATE CARD SECTION TITLE =====
  const handleCardTitleChange = (sectionId, value) => {
    setCardSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId ? { ...section, title: value } : section
      )
    );
  };

  // ===== OPEN POPUP =====
  const handleOpenPopup = (sectionId, cardIndex) => {
    const section = cardSections.find((s) => s.id === sectionId);
    const card = section.cards[cardIndex];
    setEditingCard({ sectionId, cardIndex });
    setPopupData({ ...card });
    setShowPopup(true);
  };

  // ===== CLOSE POPUP (CANCEL) =====
  const handleClosePopup = () => {
    setShowPopup(false);
    setEditingCard(null);
    setPopupData(null);
  };

  // ===== SAVE POPUP =====
  const handleSavePopup = () => {
    if (editingCard) {
      setCardSections((prevSections) =>
        prevSections.map((section) =>
          section.id === editingCard.sectionId
            ? {
                ...section,
                cards: section.cards.map((card, idx) =>
                  idx === editingCard.cardIndex ? { ...popupData } : card
                ),
              }
            : section
        )
      );
    }
    handleClosePopup();
  };

  // ===== ADD LINK IN POPUP =====
  const handleAddLink = () => {
    setPopupData((prev) => ({
      ...prev,
      links: [...prev.links, { text: "", url: "" }],
    }));
  };

  // ===== UPDATE LINK =====
  const handleLinkChange = (index, field, value) => {
    setPopupData((prev) => ({
      ...prev,
      links: prev.links.map((link, idx) =>
        idx === index ? { ...link, [field]: value } : link
      ),
    }));
  };

  // ===== COPY TEXT =====
  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    alert("Text copied!");
  };

  // ===== CONTACT FUNCTIONS =====
  const toggleLogoOptions = () => {
    setShowLogoOptions((prev) => !prev);
  };

  const handleSelectLogo = (logo) => {
    const newContact = {
      id: Date.now(),
      type: logo.id,
      icon: logo.icon,
      name: logo.name,
      title: "",
      link: "",
    };
    setContactLinks((prev) => [...prev, newContact]);
    setShowLogoOptions(false);
    setEditingContact(newContact.id);
  };

  const handleContactChange = (id, field, value) => {
    setContactLinks((prev) =>
      prev.map((contact) =>
        contact.id === id ? { ...contact, [field]: value } : contact
      )
    );
  };

  const handleContactBlur = (id) => {
    const contact = contactLinks.find((c) => c.id === id);
    if (contact && contact.title && contact.link) {
      setEditingContact(null);
    }
  };

  const handleContactKeyDown = (e, id) => {
    if (e.key === "Enter") {
      handleContactBlur(id);
    }
  };

  const handleEditContact = (id) => {
    setEditingContact(id);
  };

  return (
    <>
      {/* ===== HEADER ===== */}
      <header className={`${dashboardStyles.header} ${styles.headerCustom}`}>
        <div className={styles.leftSection}>
          <div className={dashboardStyles.headerLogo}>ThePortify</div>
          <Link href="/dashboard" className={styles.homeButton}>
            Home
          </Link>
        </div>

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
              <span>+ Insert Image</span>
            )}
            <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageUpload} />
          </label>

          {/* BOX KANAN */}
          <div className={styles.infoRightWrapper}>
            <div className={styles.infoSection}>
              <textarea placeholder="Your Name" className={styles.nameInput} rows={1} onInput={handleAutoResize} />
              <textarea placeholder="Your Job" className={styles.jobInput} rows={1} onInput={handleAutoResize} />
              <textarea placeholder="''One sentence describe what you're doing''" className={styles.motoInput} rows={1} onInput={handleAutoResize} />
            </div>

            <div className={styles.descBox}>
              <textarea placeholder="Your description" className={styles.descInput} rows={1} onInput={handleAutoResize} />
            </div>
          </div>
        </div>

        {/* HASHTAGS */}
        <div className={styles.hashtagSection}>
          {hashtags.map((tag, idx) => (
            <div key={idx} className={styles.hashtag} onClick={() => handleRemoveTag(idx)} title="Klik untuk hapus">
              #{tag}
            </div>
          ))}
          <input type="text" placeholder="Tambah hashtag..." value={hashtagInput} onChange={(e) => setHashtagInput(e.target.value)} onKeyDown={handleHashtagKeyDown} className={styles.hashtagInput} />
        </div>

        {/* ===== LIST SECTIONS ===== */}
        {listSections.map((section) => (
          <div key={section.id} className={styles.listSection}>
            <input type="text" placeholder="List Title (e.g., Work Experience)" value={section.title} onChange={(e) => handleListTitleChange(section.id, e.target.value)} className={styles.listTitle} />
            <div className={styles.listBox}>
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className={styles.listItem}>
                  <input type="text" placeholder="Title (Ex. Company | Location)" value={item.title} onChange={(e) => handleItemChange(section.id, itemIndex, "title", e.target.value)} className={styles.listItemTitle} />
                  <input type="text" placeholder="Role & Date (Ex. Frontend Dev Intern (Jan - Jun 2024))" value={item.subtitle} onChange={(e) => handleItemChange(section.id, itemIndex, "subtitle", e.target.value)} className={styles.listItemSubtitle} />
                  <textarea placeholder="Description role" value={item.description} onChange={(e) => handleItemChange(section.id, itemIndex, "description", e.target.value)} onInput={handleAutoResize} className={styles.listItemDescription} rows={1} />
                </div>
              ))}
              <button onClick={() => handleAddListItem(section.id)} className={styles.moreButton}>
                + More
              </button>
            </div>
          </div>
        ))}

        {/* ===== CARD SECTIONS ===== */}
        {cardSections.map((section) => (
          <div key={section.id} className={styles.cardSection}>
            <input type="text" placeholder="Card Title (e.g., Projects)" value={section.title} onChange={(e) => handleCardTitleChange(section.id, e.target.value)} className={styles.cardSectionTitle} />
            
            <div className={styles.cardGrid}>
              {section.cards.map((card, cardIndex) => (
                <div key={card.id} className={styles.cardItem}>
                  <label className={styles.cardImageWrapper}>
                    {card.image ? (
                      <img src={card.image} alt="Card" className={styles.cardImage} />
                    ) : (
                      <span>+ Insert Image 16:9</span>
                    )}
                    <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleCardImageUpload(e, section.id, cardIndex)} />
                  </label>
                  <input type="text" placeholder="Title" value={card.title} onChange={(e) => handleCardChange(section.id, cardIndex, "title", e.target.value)} className={styles.cardTitle} />
                  <textarea placeholder="Short description..." value={card.description} onChange={(e) => handleCardChange(section.id, cardIndex, "description", e.target.value)} onInput={handleAutoResize} className={styles.cardDescription} rows={2} />
                  <button onClick={() => handleOpenPopup(section.id, cardIndex)} className={styles.viewMoreButton}>
                    [view more]
                  </button>
                </div>
              ))}
            </div>

            <button onClick={() => handleAddCard(section.id)} className={styles.cardMoreButton}>
              + More
            </button>
          </div>
        ))}

        {/* ===== CONTACT SECTION ===== */}
        <div className={styles.contactSection}>
          <h2 className={styles.contactTitle}>Contact</h2>
          <div className={styles.contactBox}>
            {/* ADD BUTTON */}
            <div className={styles.contactAddWrapper}>
              <button onClick={toggleLogoOptions} className={styles.contactAddButton}>
                +
              </button>

              {/* LOGO OPTIONS */}
              <div className={`${styles.logoOptionsWrapper} ${showLogoOptions ? styles.show : ""}`}>
                {logoOptions.map((logo, idx) => (
                  <button
                    key={logo.id}
                    onClick={() => handleSelectLogo(logo)}
                    className={styles.logoOption}
                    style={{ transitionDelay: `${idx * 0.05}s` }}
                    title={logo.name}
                  >
                    {logo.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* CONTACT LINKS */}
            <div className={styles.contactLinksWrapper}>
              {contactLinks.map((contact) => (
                <div key={contact.id} className={styles.contactItem}>
                  {editingContact === contact.id ? (
                    <>
                      <div className={styles.contactIcon}>{contact.icon}</div>
                      <input
                        type="text"
                        placeholder="Title (e.g., Email Me)"
                        value={contact.title}
                        onChange={(e) => handleContactChange(contact.id, "title", e.target.value)}
                        onBlur={() => handleContactBlur(contact.id)}
                        onKeyDown={(e) => handleContactKeyDown(e, contact.id)}
                        className={styles.contactTitleInput}
                        autoFocus
                      />
                      <input
                        type="text"
                        placeholder="Link (e.g., mailto:you@email.com)"
                        value={contact.link}
                        onChange={(e) => handleContactChange(contact.id, "link", e.target.value)}
                        onBlur={() => handleContactBlur(contact.id)}
                        onKeyDown={(e) => handleContactKeyDown(e, contact.id)}
                        className={styles.contactLinkInput}
                      />
                    </>
                  ) : (
                    <>
                      <div 
                        className={styles.contactIcon} 
                        onClick={() => handleEditContact(contact.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        {contact.icon}
                      </div>
                      <a
                        href={contact.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.contactLink}
                      >
                        {contact.title || contact.name}
                      </a>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ADD MORE BUTTON */}
        <div className={styles.addMoreWrapper}>
          <button onClick={toggleOptions} className={styles.addMoreButton}>
            + Add more
          </button>
          <div className={`${styles.optionBox} ${showOptions ? styles.show : ""}`}>
            <button onClick={handleAddListSection} className={styles.optionButton}>
              List
            </button>
            <button onClick={handleAddCardSection} className={styles.optionButton}>
              Card
            </button>
          </div>
        </div>
      </main>

      {/* ===== POPUP EDITOR ===== */}
      {showPopup && popupData && (
        <div className={styles.popupOverlay} onClick={handleClosePopup}>
          <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
            {/* LEFT SIDE */}
            <div className={styles.popupLeft}>
              <input type="text" placeholder="Project Title" value={popupData.fullTitle} onChange={(e) => setPopupData({ ...popupData, fullTitle: e.target.value })} className={styles.popupTitle} />
              <textarea placeholder="Full project description..." value={popupData.fullDescription} onChange={(e) => setPopupData({ ...popupData, fullDescription: e.target.value })} className={styles.popupDescription} />
            </div>

            {/* RIGHT SIDE */}
            <div className={styles.popupRight}>
              <button className={styles.closeButton} onClick={handleClosePopup}>
                ✕
              </button>

              <label className={styles.popupImageWrapper}>
                {popupData.image ? (
                  <img src={popupData.image} alt="Preview" className={styles.popupImage} />
                ) : (
                  <span>+ Insert Image</span>
                )}
                <input type="file" accept="image/*" style={{ display: "none" }} onChange={handlePopupImageUpload} />
              </label>

              <div className={styles.popupLinks}>
                <input type="text" placeholder="Image Title" value={popupData.title} onChange={(e) => setPopupData({ ...popupData, title: e.target.value })} className={styles.popupImageTitle} />
                
                {popupData.links.map((link, idx) => (
                  <div key={idx} className={styles.linkRow}>
                    <input type="text" placeholder="Link text" value={link.text} onChange={(e) => handleLinkChange(idx, "text", e.target.value)} className={styles.linkInput} />
                    <button onClick={() => handleCopyText(link.text)} className={styles.copyButton}>
                      Copy
                    </button>
                  </div>
                ))}

                <button onClick={handleAddLink} className={styles.addLinkButton}>
                  + Add Link
                </button>
              </div>

              <button onClick={handleSavePopup} className={styles.savePopupButton}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}