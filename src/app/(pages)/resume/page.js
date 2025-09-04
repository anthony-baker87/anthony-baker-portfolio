"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Button from "@/components/Button/Button";

const Resume = () => {
  return (
    <div className={styles.resumeContainer}>
      <h1>Resume</h1>
      <p>Below you can preview my resume or download a copy.</p>
      <Button
        title="Download Resume"
        href="/pdfs/AnthonyBakerResume.pdf"
        download="AnthonyBakerResume.pdf"
        className={styles.downloadButton}
      />
      <div className={styles.imageWrapper}>
        <Image
          src={`${
            process.env.NEXT_PUBLIC_BASE_PATH || ""
          }/images/resume/resume-preview.png`}
          alt="Resume Preview"
          width={1200}
          height={1600}
          className={styles.resumePreview}
        />
      </div>
    </div>
  );
};

export default Resume;
