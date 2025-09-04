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
      <div className={styles.profileImageWrapper}>
        <Image
          src={`${
            process.env.NEXT_PUBLIC_BASE_PATH || ""
          }/images/navigation/thebakes.webp`}
          alt="Profile Picture"
          fill
          sizes={mobile ? "(max-width: 768px) 140px" : "200px"}
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className={styles.profilePictureName}>Anthony Baker</div>
    </div>
  );
};

export default ProfilePicture;
