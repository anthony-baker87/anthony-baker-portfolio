import Link from "next/link";
import Image from "next/image";
import PropTypes from "prop-types";
import styles from "./Cards.module.css";

const Cards = ({ cardsData = [] }) => {
  return (
    <div className={styles.cardsContainer}>
      {cardsData.map((card, index) => (
        <Link
          href={card?.link}
          className={styles.cardLink}
          key={index}
          title={card?.title}
        >
          <div className={styles.cardContainer}>
            <h3 className={styles.cardTitle}>{card?.title}</h3>
            <div className={styles.cardContent}>{card?.content}</div>
            {card?.imageLink && (
              <div className={styles.imageWrapper}>
                <Image
                  src={card?.imageLink}
                  alt={card?.title}
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Cards;

Cards.propTypes = {
  cardsData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      imageLink: PropTypes.string,
    })
  ),
};
