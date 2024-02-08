import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const CtaSection = () => {
  const isAuthenticated = Cookies.get("token");
  return (
    <section className="flex items-center space-y-4 h-max">
      {isAuthenticated ? (
        <div className="h-auto">
          <Link
            to="/dashboard"
            className=" text-white font-bold px-4 rounded-md focus:outline-none focus:shadow-outline hidden sm:inline-block"
          >
            Tableau de bord
          </Link>
          <div
            to="/logout"
            className="text-white font-bold px-4 rounded-md focus:outline-none focus:shadow-outline hidden sm:inline-block"
          >
            <LogoutButton/>
          </div>
        </div>
      ) : (
        <div className="h-auto">
          <Link
            to="/inscription"
            className=" text-white font-bold px-4 rounded-md focus:outline-none focus:shadow-outline hidden sm:inline-block"
          >
            S&apos;inscrire
          </Link>
          <Link
            to="/connexion"
            className=" text-white  font-bold px-4  rounded-md focus:outline-none focus:shadow-outline hidden sm:inline-block"
          >
            Se connecter
          </Link>
        </div>
      )}
    </section>
  );
};

export default CtaSection;
