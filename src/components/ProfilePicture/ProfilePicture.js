import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./ProfilePicture.module.css";
import { isMobile } from "@/utils/device";

const ProfilePicture = () => {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    setMobile(isMobile(userAgent));
  }, []);

  return (
    <div className={styles.profilePictureContainer}>
      <Image
        src="/images/navigation/thebakes.webp"
        alt="Profile Picture"
        width={mobile ? 260 : 200}
        height={300}
        priority
      />
      <div className={styles.profilePictureName}>Anthony Baker</div>
    </div>
  );
};

export default ProfilePicture;
