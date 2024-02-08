const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="box-decoration-slice bg-gradient-to-r from-blue-500 to-pink-500  text-white p-4 text-center">
    <p>&copy; {currentYear} MyProGrowth. Tous droits réservés.</p>
  </footer>
  );
};

export default Footer;
