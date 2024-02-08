import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";

const LogoutButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLogoutSuccessful, setIsLogoutSuccessful] = useState(false);

  useEffect(() => {
    if (showModal) {
      const timeoutId = setTimeout(() => {
        setShowModal(false);
        if (isLogoutSuccessful) {
          window.location.reload();
        }
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [showModal, isLogoutSuccessful]);

  const handleLogout = () => {
    
    Cookies.remove("token");
    Cookies.remove("userId");
    // Effectuer une requête HTTP POST à la route de déconnexion
    fetch("https://myprogrowth.onrender.com/api/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Inclure les cookies dans la requête
    })
      .then((response) => {
        if (response.ok) {
          // Si la déconnexion réussit, mettre à jour l'état et afficher la modal
          setIsLogoutSuccessful(true);
        } else {
          // Si la déconnexion échoue, mettre à jour l'état pour afficher la modal d'échec
          setIsLogoutSuccessful(false);
        }
        setShowModal(true);
      })
      .catch((error) => {
        console.error("Erreur lors de la déconnexion :", error);
        // En cas d'erreur, afficher la modal d'échec
        setIsLogoutSuccessful(false);
        setShowModal(true);
      });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex items-center justify-center">
  <button
    onClick={handleLogout}
   
  >
    Se déconnecter
  </button>
  {showModal && (
    <div className="modal fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="modal-content bg-white p-8 rounded shadow-lg">
        <span
          className="close absolute top-0 right-0 mt-4 mr-4 text-gray-600 cursor-pointer"
          onClick={closeModal}
        >
          &times;
        </span>
        {isLogoutSuccessful ? (
          <>
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="success-icon text-green-500 mr-2"
            />
            <p className="text-green-500">Déconnexion réussie!</p>
          </>
        ) : (
          <>
            <FontAwesomeIcon
              icon={faTimesCircle}
              className="failure-icon text-red-500 mr-2"
            />
            <p className="text-red-500">Échec de la déconnexion. Veuillez réessayer.</p>
          </>
        )}
      </div>
    </div>
  )}
</div>

  );
};

export default LogoutButton;
