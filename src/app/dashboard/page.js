"use client";

import Link from "next/link";
import TiltedCard from "../components/TiltedCard"; // tambahkan ini
import "../globals.css";

export default function HomePage() {
  return (
    <>
      {/* ===== HEADER ===== */}
      <header className="header">
        <div className="header-logo">
          ThePortify<span className="demo-tag">(demo V1.3)</span>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="main-content">
        {/* ====== Tambahkan efek TiltedCard di sini ====== */}
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
            overlayContent={
              <p className="tilted-card-demo-text text-white text-center">
              </p>
            }
          />
        </div>

        <Link href="/profile">
          <button className="btn btn-primary">My Profile</button>
        </Link>

        <h1 className="main-title">
          Welcome, to <span className="highlight">ThePortify</span>!
        </h1>
        <p className="main-subtitle">
          ThePortify is the portfolio workspace where creators <br />
          showcase their work in minutes.
        </p>
      
        {/* ============================================== */}
      </main>





      {/* ===== FEATURE SECTION ===== */}
      <section className="features">


        <h2 className="features-title">
          Heres some of the highlights of the features you get <br />
          when you build portfolio with <span className="highlight">ThePortify</span>
        </h2>

        <div className="feature-list">
          <div className="feature-item">
            <div className="feature-text">
              <h3>Guided Template</h3>
              <p>
                <b>No guesswork.</b> Our single, structured template shows you exactly
                where to place titles, images, and content. Just fill in your details
                and your portfolio is ready clean, organized, and professional.
              </p>
            </div>
            <div className="feature-image">
        <img src="/gambar1.png" alt="Guided Template" />
      </div>
          </div>

          <div className="feature-item">
            <div className="feature-text">
              <h3>Instant Share</h3>
              <p>
                <b>Show it to the world.</b> Share your portfolio with a simple link,
                no login required for viewers. Let people explore your work instantly,
                wherever they are.
              </p>
            </div>
                  <div className="feature-image">
        <img src="/gambar2.png" alt="Instant Share" />
      </div>

          </div>

          <div className="feature-item">
            <div className="feature-text">
              <h3>Download as PDF</h3>
              <p>
                <b>One click download.</b> Convert your portfolio into a polished PDF
                in seconds. Perfect for sharing offline or sending directly to clients
                and employers.
              </p>
            </div>
            <div className="feature-image">
        <img src="/gambar3.png" alt="Download as PDF" />
      </div>
          </div>
        </div>


                {/* ===== NEW IMAGE SHOWCASE SECTION ===== */}
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


 {/* ===== MADING / IMAGE BOARD SECTION ===== */}
        <section className="mading-section">
          <img
            src="/mading.png"
            alt="ThePortify Creative Board"
            className="mading-image"
          />
        </section>



      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="footer-left">
          <div className="footer-logo">ThePortify</div>
          <p className="footer-social">
            Follow us on: Instagram: <b>@theportify</b> &nbsp; | &nbsp; YouTube:{" "}
            <b>@theportifyoutube</b>
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