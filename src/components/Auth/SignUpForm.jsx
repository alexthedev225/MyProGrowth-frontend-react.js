import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
        
        if (isSuccess) {
          navigate("/connexion");
        }
      }, 3000);
  
      return () => clearTimeout(timer);
    }
  }, [showModal, navigate, isSuccess]);
  
  const handleSignUp = async () => {
    try {
      // Vérification basique des champs
      if (!username || !password) {
        console.log("Veuillez remplir tous les champs.");
        return;
      }

      // Envoi de la requête au backend pour l'inscription
      const response = await fetch("https://myprogrowth.onrender.com/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      // Vérification de la réussite de la requête
      if (response.ok) {
        console.log("Inscription réussie !");
        setIsSuccess(true);
        setShowModal(true);
      } else {
        console.log("Erreur lors de l'inscription. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Une erreur s'est produite lors de l'inscription :", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="max-w-md w-full mx-auto p-6 bg-white rounded-md shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Inscription
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
            className="mt-1 p-3 pl-10 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500"
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
            className="mt-1 p-3 pl-10 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />

          <button
            type="button"
            onClick={handleSignUp}
            className="bg-pink-500 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline w-full"
          >
            S&apos;inscrire
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4">
          Vous avez déjà un compte?{" "}
          <Link to="/connexion" className="text-pink-500 hover:underline">
            Connectez-vous ici
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

                <p className="text-lg text-gray-800">
                  Inscription réussie ! Redirection vers la page de connexion...
                </p>
              </>
            ) : (
              <>
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  className="text-red-500 text-5xl mb-4 "
                />
                <p className="text-lg text-gray-800 ">
                  Erreur lors de l&apos;inscription. Veuillez réessayer.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUpForm;
