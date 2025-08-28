const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>© {currentYear} My Website. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
