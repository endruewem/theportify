"use client";

import Link from "next/link";
import styles from "./ourstory.module.css";

export default function OurStoryPage() {
  return (

    


    <div className={styles.container}>
      {/* Tombol Back */}
      <Link href="/" className={styles.backButton}>
    Back to Home
      </Link>

      {/* Judul Utama */}
      <h1 className={styles.heading}>
        Everyone deserves a simple way to show who they are.
      </h1>

      {/* Paragraf 1 */}
      <p className={styles.paragraph}>
        ThePortify was built for people who struggle to create a portfolio, those who know
        what they can do, but dont know how to show it. For students chasing internships,
        for graduates preparing their first job application, or for HR professionals who
        need a cleaner, faster way to review talent. ThePortify makes portfolios that are
        structured, clear, and ready in minutes.
      </p>

      {/* Kalimat Utama Besar */}
      <h2 className={styles.vision}>
        Ultimately, our goal is to make showing your work effortless.
      </h2>

      {/* Paragraf 2 */}
      <p className={styles.paragraph}>
        We believe that a portfolio shouldnt be a design challenge it should be a
        reflection of real skill. Thats why ThePortify focuses on simplicity, speed, and
        clarity. With one clean layout and no unnecessary steps, anyone can build a
        professional portfolio that speaks for itself.
      </p>

      {/* Paragraf 3 */}
      <p className={styles.paragraph}>
        We want to save people from hours of formatting and confusion, and help HR
        reviewers skip the noise. No cluttered pages, no endless scrolling just a
        straightforward view of someones best work. And if you need it offline? One
        click, and its a polished PDF.
      </p>

      {/* Paragraf 4 */}
      <p className={styles.paragraph}>
        ThePortify exists to bring order to the chaos of digital portfolios. Because your
        story isnt about fancy effects or login walls its about your work, your journey,
        and how clearly you can share it with the world.
      </p>

      <div className="image-showcase-item">
              <img src="/goodluck.png" alt="fotogudlak" />
              <p className="image-caption">cekrek</p>
            </div>
    </div>
  );
}

