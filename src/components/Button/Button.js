import styles from "./Button.module.css";

const Button = ({ title, onClick, href, download, className = "" }) => {
  const combinedClass = `${styles.customButton} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        download={download}
        className={combinedClass}
        title={`Download ${href}`}
      >
        {title}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={combinedClass} title={title}>
      {title}
    </button>
  );
};

export default Button;
