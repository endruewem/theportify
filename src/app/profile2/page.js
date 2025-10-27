
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./profile2.module.css";
import dashboardStyles from "../dashboard/dashboard.module.css";

export default function HelpPage() {
  // ===== STATE DASAR =====
  const [image, setImage] = useState(null);
  const [hashtags, setHashtags] = useState([]);
  const [hashtagInput, setHashtagInput] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [sections, setSections] = useState([]);
  const [mounted, setMounted] = useState(false);
  
  // ===== POPUP STATE =====
  const [showPopup, setShowPopup] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [popupData, setPopupData] = useState(null);

  // ===== CONTACT STATE =====
  const [contactLinks, setContactLinks] = useState([]);
  const [showLogoOptions, setShowLogoOptions] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  // ===== DRAG STATE =====
  const [draggedSection, setDraggedSection] = useState(null);
  const [dragOverSection, setDragOverSection] = useState(null);

  // ===== CONTEXT MENU STATE =====
  const [contextMenu, setContextMenu] = useState({
    show: false,
    x: 0,
    y: 0,
    type: null, // 'section', 'listItem', 'card', 'contact'
    data: null
  });

  // Fix hydration error
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close context menu when clicking anywhere
  useEffect(() => {
    const handleClick = () => setContextMenu({ show: false, x: 0, y: 0, type: null, data: null });
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // ===== LOGO OPTIONS =====
  const logoOptions = [
    { id: "email", name: "Email", icon: "📧", isEmail: true },
    { id: "linkedin", name: "LinkedIn", icon: "/linkedin.png" },
    { id: "github", name: "GitHub", icon: "/github.png" },
    { id: "medium", name: "Medium", icon: "/medium.png" },
    { id: "instagram", name: "Instagram", icon: "/ig.png" },
    { id: "youtube", name: "YouTube", icon: "/yutub.png" },
  ];

  // ===== CONTEXT MENU HANDLERS =====
  const handleContextMenu = (e, type, data) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({
      show: true,
      x: e.clientX,
      y: e.clientY,
      type,
      data
    });
  };

  // ===== DELETE HANDLERS =====
  const handleDeleteSection = (sectionId) => {
    setSections(prev => prev.filter(section => section.id !== sectionId));
    setContextMenu({ show: false, x: 0, y: 0, type: null, data: null });
  };

  const handleDeleteListItem = (sectionId, itemIndex) => {
    setSections(prev => prev.map(section => {
      if (section.id === sectionId) {
        const newItems = section.items.filter((_, idx) => idx !== itemIndex);
        // Don't allow deleting the last item
        if (newItems.length === 0) {
          alert("Cannot delete the last item. Delete the entire section instead.");
          return section;
        }
        return { ...section, items: newItems };
      }
      return section;
    }));
    setContextMenu({ show: false, x: 0, y: 0, type: null, data: null });
  };

  const handleDeleteCard = (sectionId, cardIndex) => {
    setSections(prev => prev.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          cards: section.cards.filter((_, idx) => idx !== cardIndex)
        };
      }
      return section;
    }));
    setContextMenu({ show: false, x: 0, y: 0, type: null, data: null });
  };

  const handleDeleteContact = (contactId) => {
    setContactLinks(prev => prev.filter(contact => contact.id !== contactId));
    setContextMenu({ show: false, x: 0, y: 0, type: null, data: null });
  };

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
        setSections((prevSections) =>
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

  // ===== HASHTAG - FIXED WITH LIMIT =====
  const handleHashtagKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === " ") && hashtagInput.trim() !== "") {
      e.preventDefault();
      const newTag = hashtagInput.trim();
      
      const tempHashtags = [...hashtags, newTag];
      const estimatedWidth = tempHashtags.reduce((acc, tag) => acc + tag.length * 10 + 40, 0);
      
      if (estimatedWidth > 1100) {
        alert("Hashtag box is full! Remove some hashtags to add more.");
        return;
      }
      
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
    setSections((prev) => [...prev, newSection]);
    setShowOptions(false);
  };

  // ===== TAMBAH ITEM DALAM LIST =====
  const handleAddListItem = (sectionId) => {
    setSections((prevSections) =>
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
    setSections((prevSections) =>
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
    setSections((prevSections) =>
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
    setSections((prev) => [...prev, newSection]);
    setShowOptions(false);
  };

  // ===== TAMBAH CARD BARU =====
  const handleAddCard = (sectionId) => {
    setSections((prevSections) =>
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
    setSections((prevSections) =>
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
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId ? { ...section, title: value } : section
      )
    );
  };

  // ===== DRAG AND DROP HANDLERS =====
  const handleDragStart = (e, sectionId) => {
    setDraggedSection(sectionId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, sectionId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (draggedSection !== sectionId) {
      setDragOverSection(sectionId);
    }
  };

  const handleDragLeave = () => {
    setDragOverSection(null);
  };

  const handleDrop = (e, targetSectionId) => {
    e.preventDefault();
    
    if (draggedSection === targetSectionId) {
      setDraggedSection(null);
      setDragOverSection(null);
      return;
    }

    const draggedIndex = sections.findIndex(s => s.id === draggedSection);
    const targetIndex = sections.findIndex(s => s.id === targetSectionId);

    const newSections = [...sections];
    const [removed] = newSections.splice(draggedIndex, 1);
    newSections.splice(targetIndex, 0, removed);

    setSections(newSections);
    setDraggedSection(null);
    setDragOverSection(null);
  };

  const handleDragEnd = () => {
    setDraggedSection(null);
    setDragOverSection(null);
  };

  // ===== OPEN POPUP =====
  const handleOpenPopup = (sectionId, cardIndex) => {
    const section = sections.find((s) => s.id === sectionId);
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
      setSections((prevSections) =>
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
      isEmail: logo.isEmail || false,
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

  const handleContactBlur = (id, field) => {
    const contact = contactLinks.find((c) => c.id === id);
    
    if (contact && contact.title && contact.title.trim() !== "") {
      if (contact.isEmail) {
        setEditingContact(null);
      } else {
        if (field === 'link') {
          setEditingContact(null);
        }
      }
    }
  };

  const handleContactKeyDown = (e, id, field) => {
    if (e.key === "Enter") {
      handleContactBlur(id, field);
    }
  };

  const handleEditContact = (id) => {
    setEditingContact(id);
  };

  if (!mounted) {
    return null;
  }

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
          <button className={styles.saveButton} type="button">Save</button>
          <button className={styles.pdfButton} type="button">Save as PDF</button>
          <button className={styles.shareButton} type="button">Share</button>
        </div>
      </header>

      {/* ===== CONTEXT MENU ===== */}
      {contextMenu.show && (
        <div 
          className={styles.contextMenu}
          style={{ 
            position: 'fixed',
            top: contextMenu.y,
            left: contextMenu.x,
            zIndex: 9999
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className={styles.contextMenuButton}
            onClick={() => {
              if (contextMenu.type === 'section') {
                handleDeleteSection(contextMenu.data.sectionId);
              } else if (contextMenu.type === 'listItem') {
                handleDeleteListItem(contextMenu.data.sectionId, contextMenu.data.itemIndex);
              } else if (contextMenu.type === 'card') {
                handleDeleteCard(contextMenu.data.sectionId, contextMenu.data.cardIndex);
              } else if (contextMenu.type === 'contact') {
                handleDeleteContact(contextMenu.data.contactId);
              }
            }}
          >
            Remove
          </button>
        </div>
      )}

      {/* ===== MAIN CONTENT ===== */}
      <main className={styles.mainContainer}>
        <div className={styles.profileSection}>
          <label className={styles.photoWrapper}>
            {image ? (
              <img src={image} alt="Preview" className={styles.photoPreview} />
            ) : (
              <span>+ Insert Image</span>
            )}
            <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageUpload} />
          </label>

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
            <div key={idx} className={styles.hashtag} onClick={() => handleRemoveTag(idx)} title="Click to remove">
              #{tag}
            </div>
          ))}
          <input 
            type="text" 
            placeholder="Add hashtag..." 
            value={hashtagInput} 
            onChange={(e) => setHashtagInput(e.target.value)} 
            onKeyDown={handleHashtagKeyDown} 
            className={styles.hashtagInput} 
          />
        </div>

        {/* ===== SECTIONS ===== */}
        {sections.map((section) => (
          <div
            key={section.id}
            draggable
            onDragStart={(e) => handleDragStart(e, section.id)}
            onDragOver={(e) => handleDragOver(e, section.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, section.id)}
            onDragEnd={handleDragEnd}
            className={`${section.type === "list" ? styles.listSection : styles.cardSection} ${
              dragOverSection === section.id ? styles.dragOver : ""
            }`}
          >
            <div className={styles.sectionHeader}>
              <span className={styles.dragHandle}>⠿</span>
              <input
                type="text"
                placeholder={section.type === "list" ? "List Title (e.g., Work Experience)" : "Card Title (e.g., Projects)"}
                value={section.title}
                onChange={(e) =>
                  section.type === "list"
                    ? handleListTitleChange(section.id, e.target.value)
                    : handleCardTitleChange(section.id, e.target.value)
                }
                onContextMenu={(e) => handleContextMenu(e, 'section', { sectionId: section.id })}
                className={section.type === "list" ? styles.listTitle : styles.cardSectionTitle}
              />
            </div>

            {section.type === "list" ? (
              <div className={styles.listBox}>
                {section.items.map((item, itemIndex) => (
                  <div 
                    key={itemIndex} 
                    className={styles.listItem}
                    onContextMenu={(e) => handleContextMenu(e, 'listItem', { sectionId: section.id, itemIndex })}
                  >
                    <input
                      type="text"
                      placeholder="Title (Ex. Company | Location)"
                      value={item.title}
                      onChange={(e) => handleItemChange(section.id, itemIndex, "title", e.target.value)}
                      className={styles.listItemTitle}
                    />
                    <input
                      type="text"
                      placeholder="Role & Date (Ex. Frontend Dev Intern (Jan - Jun 2024))"
                      value={item.subtitle}
                      onChange={(e) => handleItemChange(section.id, itemIndex, "subtitle", e.target.value)}
                      className={styles.listItemSubtitle}
                    />
                    <textarea
                      placeholder="Description role"
                      value={item.description}
                      onChange={(e) => handleItemChange(section.id, itemIndex, "description", e.target.value)}
                      onInput={handleAutoResize}
                      className={styles.listItemDescription}
                      rows={1}
                    />
                  </div>
                ))}
                <button onClick={() => handleAddListItem(section.id)} className={styles.moreButton} type="button">
                  + More
                </button>
              </div>
            ) : (
              <>
                <div className={styles.cardGrid}>
                  {section.cards.map((card, cardIndex) => (
                    <div key={card.id} className={styles.cardItem}>
                      <label 
                        className={styles.cardImageWrapper}
                        onContextMenu={(e) => handleContextMenu(e, 'card', { sectionId: section.id, cardIndex })}
                      >
                        {card.image ? (
                          <img src={card.image} alt="Card" className={styles.cardImage} />
                        ) : (
                          <span>+ Insert Image 16:9</span>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={(e) => handleCardImageUpload(e, section.id, cardIndex)}
                        />
                      </label>
                      <input
                        type="text"
                        placeholder="Title"
                        value={card.title}
                        onChange={(e) => handleCardChange(section.id, cardIndex, "title", e.target.value)}
                        className={styles.cardTitle}
                      />
                      <textarea
                        placeholder="Short description..."
                        value={card.description}
                        onChange={(e) => handleCardChange(section.id, cardIndex, "description", e.target.value)}
                        onInput={handleAutoResize}
                        className={styles.cardDescription}
                        rows={2}
                      />
                      <button onClick={() => handleOpenPopup(section.id, cardIndex)} className={styles.viewMoreButton} type="button">
                        [view more]
                      </button>
                    </div>
                  ))}
                </div>

                <button onClick={() => handleAddCard(section.id)} className={styles.cardMoreButton} type="button">
                  + More
                </button>
              </>
            )}
          </div>
        ))}

        {/* ADD MORE BUTTON */}
        <div className={styles.addMoreWrapper}>
          <button onClick={toggleOptions} className={styles.addMoreButton} type="button">
            + Add more
          </button>
          <div className={`${styles.optionBox} ${showOptions ? styles.show : ""}`}>
            <button onClick={handleAddListSection} className={styles.optionButton} type="button">
              List
            </button>
            <button onClick={handleAddCardSection} className={styles.optionButton} type="button">
              Card
            </button>
          </div>
        </div>

        {/* ===== CONTACT SECTION ===== */}
        <div className={styles.contactSection}>
          <h2 className={styles.contactTitle}>My Contact</h2>
          <div className={styles.contactBox}>
            <div className={styles.contactAddWrapper}>
              <button onClick={toggleLogoOptions} className={styles.contactAddButton} type="button">
                +
              </button>

              <div className={`${styles.logoOptionsWrapper} ${showLogoOptions ? styles.show : ""}`}>
                {logoOptions.map((logo, idx) => (
                  <button
                    key={logo.id}
                    onClick={() => handleSelectLogo(logo)}
                    className={styles.logoOption}
                    style={{ transitionDelay: `${idx * 0.05}s` }}
                    title={logo.name}
                    type="button"
                  >
                    {logo.isEmail ? logo.icon : <img src={logo.icon} alt={logo.name} className={styles.logoImage} />}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.contactLinksWrapper}>
              {contactLinks.map((contact) => (
                <div key={contact.id} className={styles.contactItem}>
                  {editingContact === contact.id ? (
                    <>
                      <div 
                        className={styles.contactIcon}
                        onContextMenu={(e) => handleContextMenu(e, 'contact', { contactId: contact.id })}
                      >
                        {contact.isEmail ? contact.icon : <img src={contact.icon} alt={contact.name} className={styles.logoImage} />}
                      </div>
                      <input
                        type="text"
                        placeholder={contact.isEmail ? "Email Address" : "Your Contact Name"}
                        value={contact.title}
                        onChange={(e) => handleContactChange(contact.id, "title", e.target.value)}
                        onBlur={() => handleContactBlur(contact.id, 'title')}
                        onKeyDown={(e) => handleContactKeyDown(e, contact.id, 'title')}
                        className={styles.contactTitleInput}
                        autoFocus
                      />
                      {!contact.isEmail && (
                        <input
                          type="text"
                          placeholder="Link (e.g., https://linkedin.com/in/yourname)"
                          value={contact.link}
                          onChange={(e) => handleContactChange(contact.id, "link", e.target.value)}
                          onBlur={() => handleContactBlur(contact.id, 'link')}
                          onKeyDown={(e) => handleContactKeyDown(e, contact.id, 'link')}
                          className={styles.contactLinkInput}
                        />
                      )}
                    </>
                  ) : (
                    <>
                      <div 
                        className={styles.contactIcon} 
                        onClick={() => handleEditContact(contact.id)}
                        onContextMenu={(e) => handleContextMenu(e, 'contact', { contactId: contact.id })}
                        style={{ cursor: 'pointer' }}
                      >
                        {contact.isEmail ? contact.icon : <img src={contact.icon} alt={contact.name} className={styles.logoImage} />}
                      </div>
                      {contact.isEmail ? (
                        <span className={styles.contactEmailText}>{contact.title}</span>
                      ) : (
                        <a
                          href={contact.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.contactLink}
                        >
                          {contact.title || contact.name}
                        </a>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* ===== POPUP EDITOR ===== */}
      {showPopup && popupData && (
        <div className={styles.popupOverlay} onClick={handleClosePopup}>
          <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.popupLeft}>
              <textarea
                placeholder="Project Title"
                value={popupData.fullTitle}
                onChange={(e) => setPopupData({ ...popupData, fullTitle: e.target.value })}
                onInput={handleAutoResize}
                className={styles.popupTitle}
                rows={1}
              />
              <textarea
                placeholder="Full project description..."
                value={popupData.fullDescription}
                onChange={(e) => setPopupData({ ...popupData, fullDescription: e.target.value })}
                className={styles.popupDescription}
              />
            </div>

            <div className={styles.popupRight}>
              <button className={styles.closeButton} onClick={handleClosePopup} type="button">
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
                <input
                  type="text"
                  placeholder="Image Title"
                  value={popupData.title}
                  onChange={(e) => setPopupData({ ...popupData, title: e.target.value })}
                  className={styles.popupImageTitle}
                />
                
                {popupData.links.map((link, idx) => (
                  <div key={idx} className={styles.linkRow}>
                    <input
                      type="text"
                      placeholder="Link text"
                      value={link.text}
                      onChange={(e) => handleLinkChange(idx, "text", e.target.value)}
                      className={styles.linkInput}
                    />
                    <button onClick={() => handleCopyText(link.text)} className={styles.copyButton} type="button">
                      Copy
                    </button>
                  </div>
                ))}

                <button onClick={handleAddLink} className={styles.addLinkButton} type="button">
                  + Add Link
                </button>
              </div>

              <button onClick={handleSavePopup} className={styles.savePopupButton} type="button">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}