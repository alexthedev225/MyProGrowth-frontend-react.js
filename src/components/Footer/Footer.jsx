const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border p-4 text-center">
    <p>&copy; {currentYear} MyProGrowth. Tous droits réservés.</p>
  </footer>
  );
};

export default Footer;
