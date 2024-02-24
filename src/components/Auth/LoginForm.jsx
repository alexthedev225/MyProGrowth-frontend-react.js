import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Vérification basique des champs
      if (!username || !password) {
        console.log("Veuillez remplir tous les champs.");
        return;
      }

      // Envoi de la requête au backend pour l'authentification
      const response = await fetch("https://myprogrowth.onrender.com/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      // Vérification de la réussite de la requête
      if (response.ok) {
        const data = await response.json();
        console.log("Connexion réussie ! Token JWT :", data.token, data.userId);

        Cookies.set("token", data.token);
        Cookies.set("userId", data.userId);

        // Affichage de la modal de succès
        setShowModal(true);
        setIsSuccess(true);
      } else {
        console.log("Erreur lors de la connexion. Veuillez réessayer.");

        // Affichage de la modal d'échec
        setShowModal(true);
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Une erreur s'est produite lors de la connexion :", error);
    }
  };

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);

        // Redirection vers la page d'accueil après 2 secondes en cas de succès
        if (isSuccess) {
          location.href = "/";
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showModal, navigate, isSuccess]);

  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Connexion
        </h2>
        <form className="space-y-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-600"
          >
            Nom d&apos;utilisateur:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />

          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Mot de passe:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />

          <button
            type="button"
            onClick={handleLogin}
            className="bg-pink-500 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline w-full"
          >
            Se connecter
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4">
          Vous n&apos;avez pas de compte?{" "}
          <Link to="/inscription" className="text-pink-500 hover:underline">
            Inscrivez-vous ici
          </Link>
        </p>
      </div>
      {showModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center">
         <div className="bg-black bg-opacity-50 absolute inset-0"></div>
         <div className="relative bg-white p-8 rounded-md shadow-md flex flex-col justify-between w-[300px] h-[200px] text-center">
       {isSuccess ? (
              <>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-green-500 text-5xl mb-4"
                />
                <p className="text-lg text-gray-800">Connexion réussie ! Redirection vers la page d&apos;accueil...</p>
              </>
            ) : (
              <>
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  className="text-red-500 text-5xl mb-4"
                />
                <p className="text-lg text-gray-800">
                  Erreur lors de la connexion. Veuillez réessayer.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
