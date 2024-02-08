import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCheck,
  faTimes,
  faUtensils,
  faPencilAlt,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';



const UserLifestyle = ({ onLifestyleUpdateClick, onHasLifestyle }) => {
  const [loading, setLoading] = useState(true);
  const [lifestyleData, setLifestyleData] = useState({});
  const [error, setError] = useState(null);
  const userId = Cookies.get("userId");
  const authToken = Cookies.get("token");

  useEffect(() => {
    const fetchUserLifestyle = async () => {
      try {
        const response = await fetch(
          `https://myprogrowth.onrender.com/api/lifestyle/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            "Échec de la récupération du mode de vie de l'utilisateur"
          );
        }

        const data = await response.json();

        if (data && Object.keys(data).length > 0) {
          setLifestyleData(data);
          onHasLifestyle(true);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du mode de vie de l'utilisateur:",
          error
        );
        setError(
          "Une erreur s'est produite lors de la récupération du mode de vie de l'utilisateur."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserLifestyle();
  }, [authToken, onHasLifestyle, userId]);

  return (
    <div className="bg-white  ">
      {loading && <div className="flex justify-center items-center">
          <FontAwesomeIcon
            icon={faSpinner}
            spin
            className="text-4xl text-pink-500"
          />
        </div>}
      {!loading && !error && Object.keys(lifestyleData).length > 0 && (
        <div className="space-y-2">
          <p className="mb-2 flex items-center">
            <span className="mr-2">Sommeil:</span>
            <span className="text-gray-700">
              {lifestyleData.sleepHours} heures
            </span>{" "}
            <FontAwesomeIcon icon={faBed} className="text-gray-500 ml-2" />
          </p>
          <p className="mb-2 flex items-center">
            <span className="mr-2">Exercice quotidien:</span>
            <span
              className={
                lifestyleData.dailyExercise ? "text-green-500" : "text-red-500"
              }
            >
              {lifestyleData.dailyExercise ? "Oui" : "Non"}
            </span>{" "}
            {lifestyleData.dailyExercise ? (
              <FontAwesomeIcon icon={faCheck} className="ml-2" />
            ) : (
              <FontAwesomeIcon icon={faTimes} className="ml-2" />
            )}
          </p>
          <p className="mb-2 flex items-center">
            <span className="mr-2">Habitudes alimentaires:</span>
            <span className="text-red-500">
              {lifestyleData.eatingHabits}
            </span>{" "}
            <FontAwesomeIcon icon={faUtensils} className="text-red-500 ml-2" />
          </p>

          <button
            className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700"
            onClick={() => onLifestyleUpdateClick(userId)}
          >
            Modifier <FontAwesomeIcon icon={faPencilAlt} className="ml-2" />
          </button>
        </div>
      )}
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        !loading &&
        !error &&
        Object.keys(lifestyleData).length === 0 && (
          <div className="text-center">
            <p className="text-lg mb-4">
              Vous n&apos;avez pas encore ajouté de mode de vie.
            </p>
            <p>
              Ajoutez un mode de vie dès maintenant pour améliorer votre profil
              !
            </p>
          </div>
        )
      )}
    </div>
  );
};
UserLifestyle.propTypes = {
  onHasLifestyle: PropTypes.bool,
  onLifestyleUpdateClick: PropTypes.func, // Validation de type pour onCancel
};

export default UserLifestyle;
