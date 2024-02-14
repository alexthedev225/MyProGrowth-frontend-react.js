const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="p-4 text-center border-t">
    <p>&copy; {currentYear} MyProGrowth. Tous droits réservés.</p>
  </footer>
  );
};

export default Footer;
