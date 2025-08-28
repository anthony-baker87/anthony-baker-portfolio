import Image from "next/image";
import styles from "./ProfilePicture.module.css";

const ProfilePicture = () => {
  return (
    <div className={styles.profilePictureContainer}>
      <Image
        src="/images/navigation/thebakes.webp"
        alt="Profile Picture"
        width={200}
        height={300}
        priority
      />
      <div className={styles.profilePictureName}>Anthony Baker</div>
    </div>
  );
};

export default ProfilePicture;
