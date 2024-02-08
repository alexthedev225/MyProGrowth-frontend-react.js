import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../css/BarreNavigation.module.css";
import CtaSection from "./CtaSection";
import LogoutButton from "./LogoutButton";
import Cookies from "js-cookie";

const BarreNavigation = () => {
  const [estMenuOuvert, setEstMenuOuvert] = useState(false);
  const basculerMenu = () => {
    setEstMenuOuvert(!estMenuOuvert);
   };
  useEffect(() => {
    // Ajoute ou supprime la classe no-scroll au body lorsque le menu est ouvert ou fermé
    if (estMenuOuvert) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Nettoie l'effet en supprimant la classe lors du démontage du composant
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [estMenuOuvert]);
  
  const isAuthenticated = Cookies.get("token");
  return (
    <div>
      {/* Barre de navigation */}
      <nav className="box-decoration-slice bg-gradient-to-r from-blue-500 to-pink-500 p-4 fixed w-full z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-xl">
            <Link to="/">MyProGrowth</Link>
          </div>
          <CtaSection />
          <div className="hidden xl:flex space-x-4">
            <Link to="/" className="text-white hover:underline">
              Accueil
            </Link>
            <Link to="/skills/dashboard" className="text-white hover:underline">
              Compétences
            </Link>
            <Link
              to="/fitness/dashboard"
              className="text-white hover:underline"
            >
              Fitness
            </Link>
            <Link
              to="/lifestyle/dashboard"
              className="text-white hover:underline"
            >
              Style de vie
            </Link>
            <Link
              to="/emotional-wellness/dashboard"
              className="text-white hover:underline"
            >
              Bien-être émotionnel
            </Link>
            <Link to="/user-profile" className="text-white hover:underline">
              Profil
            </Link>
          </div>
          <div
            className={`${styles["menu-btn"]} ${
              estMenuOuvert ? styles.open : ""
            }`}
            onClick={basculerMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Espace pour la barre de navigation */}
      <div className="h-16"></div>

      {/* Menu déroulant */}
      {estMenuOuvert && (
        <div className="2xl:hidden bg-white p-4 absolute top-16 left-0 right-0 bottom-0 z-40">
          <Link to="/" onClick={basculerMenu} className="block text-blue-500 py-2 hover:underline">
            Accueil
          </Link>
          <div onClick={basculerMenu}>
            <Link
              to="/skills/dashboard"
              className="block text-blue-500 py-2 hover:underline"
            >
              Compétences
            </Link>
          </div>
          <div onClick={basculerMenu}>
            <Link
              to="/fitness/dashboard"
              className="block text-blue-500 py-2 hover:underline"
            >
              Fitness
            </Link>
          </div>
          <div onClick={basculerMenu}>
            <Link
              to="/lifestyle/dashboard"
              className="block text-blue-500 py-2 hover:underline"
            >
              Style de vie
            </Link>
          </div>
          <div onClick={basculerMenu}>
            <Link
              to="/emotional-wellness/dashboard"
              className="block text-blue-500 py-2 hover:underline"
            >
              Bien-être émotionnel
            </Link>
          </div>
          <div onClick={basculerMenu}>
            <Link
              to="/user-profile"
              className="block text-blue-500 py-2 hover:underline"
            >
              Profil
            </Link>
          </div>
          <section className="flex items-center space-y-4 h-max text-center">
            {isAuthenticated ? (
              <div className="flex flex-col gap-4 sm:hidden">
                <Link
                  to="/dashboard"
                  className="text-blue-500 border border-blue-500 font-bold px-4 rounded-md focus:outline-none focus:shadow-outline"
                  onClick={basculerMenu}
                >
                  Tableau de bord
                </Link>
                <div
                  className="text-blue-500 border border-blue-500 font-bold px-4 rounded-md focus:outline-none focus:shadow-outline"
                  onClick={basculerMenu}
                >
                  <LogoutButton />
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4 sm:hidden ">
                <Link
                  to="/inscription"
                  className="text-blue-500 border border-blue-500 font-bold px-4 rounded-md focus:outline-none focus:shadow-outline"
                  onClick={basculerMenu}
                >
                  S&apos;inscrire
                </Link>
                <Link
                  to="/connexion"
                  className="text-blue-500 border border-blue-500 font-bold px-4 rounded-md focus:outline-none focus:shadow-outline"
                  onClick={basculerMenu}
                >
                  Se connecter
                </Link>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default BarreNavigation;
