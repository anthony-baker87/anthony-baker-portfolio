import Link from "next/link";
import Image from "next/image";
import PropTypes from "prop-types";
import styles from "./Cards.module.css";

const Cards = ({ cardsData = [] }) => {
  return (
    <div className={styles.cardsContainer}>
      {cardsData.map((card, index) => {
        const hasLink = !!card?.link;

        return hasLink ? (
          <Link
            key={index}
            href={card.link}
            className={styles.cardLink}
            title={card.title}
          >
            <CardContent card={card} />
          </Link>
        ) : (
          <div
            key={index}
            className={`${styles.cardLink} ${styles.cardLinkInactive}`}
            title={card.title}
          >
            <CardContent card={card} />
          </div>
        );
      })}
    </div>
  );
};

const CardContent = ({ card }) => (
  <div className={styles.cardContainer}>
    <div className={styles.textSection}>
      <h3 className={styles.cardTitle}>{card.title}</h3>
      <div className={styles.cardContent}>{card.content}</div>
      {card?.link && (
        <div className={styles.clickMeText}>
          Click Me to See the Live Implementation
        </div>
      )}
    </div>
    {card.imageLink && (
      <div className={styles.mediaWrapper}>
        <Image
          src={card.imageLink}
          alt={card.title}
          fill
          style={{ objectFit: "contain" }}
          sizes="100vw"
        />
      </div>
    )}
    {card.videoLink && (
      <div className={styles.mediaWrapper}>
        <video controls>
          <source src={card.videoLink} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    )}
  </div>
);

export default Cards;

Cards.propTypes = {
  cardsData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      link: PropTypes.string,
      imageLink: PropTypes.string,
      videoLink: PropTypes.string,
    })
  ),
};
