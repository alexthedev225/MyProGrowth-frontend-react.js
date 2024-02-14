import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../css/BarreNavigation.module.css";
import CtaSection from "./CtaSection";
import LogoutButton from "./LogoutButton";
import Cookies from "js-cookie";
import logo from "../assets/myprogrowth-logo.png";

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
      <nav className="bg-white p-4 w-full z-50 border-b">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/">
            <img src={logo} alt="logo" className="h-12" />
          </Link>
          <CtaSection />
          <div className="hidden xl:flex space-x-4">
            <Link
              to="/"
              className="text-black hover:underline font-semibold text-sm "
            >
              Accueil
            </Link>
            <Link
              to="/skills/dashboard"
              className="text-black hover:underline font-semibold text-sm"
            >
              Compétences
            </Link>
            <Link
              to="/fitness/dashboard"
              className="text-black hover:underline font-semibold text-sm"
            >
              Fitness
            </Link>
            <Link
              to="/lifestyle/dashboard"
              className="text-black hover:underline font-semibold text-sm"
            >
              Style de vie
            </Link>
            <Link
              to="/emotional-wellness/dashboard"
              className="text-black hover:underline font-semibold text-sm"
            >
              Bien-être émotionnel
            </Link>
            <Link
              to="/user-profile"
              className="text-black hover:underline font-semibold text-sm"
            >
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

      {/* Menu déroulant */}
      {estMenuOuvert && (
        <div className="2xl:hidden bg-white p-4 absolute top-16 left-0 right-0 bottom-0 z-40">
          <Link
            to="/"
            onClick={basculerMenu}
            className="block text-black py-2 hover:underline"
          >
            Accueil
          </Link>
          <div onClick={basculerMenu}>
            <Link
              to="/skills/dashboard"
              className="block text-black py-2 hover:underline"
            >
              Compétences
            </Link>
          </div>
          <div onClick={basculerMenu}>
            <Link
              to="/fitness/dashboard"
              className="block text-black py-2 hover:underline"
            >
              Fitness
            </Link>
          </div>
          <div onClick={basculerMenu}>
            <Link
              to="/lifestyle/dashboard"
              className="block text-black py-2 hover:underline"
            >
              Style de vie
            </Link>
          </div>
          <div onClick={basculerMenu}>
            <Link
              to="/emotional-wellness/dashboard"
              className="block text-black py-2 hover:underline"
            >
              Bien-être émotionnel
            </Link>
          </div>
          <div onClick={basculerMenu}>
            <Link
              to="/user-profile"
              className="block text-black py-2 hover:underline"
            >
              Profil
            </Link>
          </div>
          <section className="flex items-center space-y-4 h-max text-center">
            {isAuthenticated ? (
              <div className="flex flex-col gap-4 sm:hidden">
                <Link
                  to="/dashboard"
                  className="text-black border border-black font-bold px-4 rounded-md focus:outline-none focus:shadow-outline"
                  onClick={basculerMenu}
                >
                  Tableau de bord
                </Link>
                <div
                  className="text-black border border-black font-bold px-4 rounded-md focus:outline-none focus:shadow-outline"
                  onClick={basculerMenu}
                >
                  <LogoutButton />
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4 sm:hidden ">
                <Link
                  to="/inscription"
                  className="text-black border border-black font-bold px-4 rounded-md focus:outline-none focus:shadow-outline"
                  onClick={basculerMenu}
                >
                  S&apos;inscrire
                </Link>
                <Link
                  to="/connexion"
                  className="text-black border border-black font-bold px-4 rounded-md focus:outline-none focus:shadow-outline"
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
