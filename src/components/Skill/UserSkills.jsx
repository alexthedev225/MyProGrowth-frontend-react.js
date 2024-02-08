import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faSpinner } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';



const UserSkills = ({ onSkillUpdateClick }) => {
  const [userSkills, setUserSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [skillToDelete, setSkillToDelete] = useState(null);
  const [error, setError] = useState(null);

  // Récupérer le token d'autorisation depuis l'endroit où il est stocké (par exemple, dans le state ou dans les cookies)
  const authToken = Cookies.get("jwt_token");
  // Récupérer l'ID de l'utilisateur à partir du token
  const userId = Cookies.get("userId"); // Remplace cela par la vraie logique pour obtenir l'ID

  useEffect(() => {
    // Appeler l'API backend pour récupérer les compétences de l'utilisateur
    fetch(`https://myprogrowth.onrender.com/api/skills/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Échec de la récupération des compétences");
        }
        return response.json();
      })
      .then((data) => {
        setUserSkills(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des compétences :",
          error.message
        );
        setError(
          "Une erreur s'est produite lors de la récupération du mode de vie de l'utilisateur."
        );
        setLoading(false);
      });
  }, [authToken, userId]); // Le tableau vide signifie que cet effet s'exécute une seule fois après le rendu initial

  const mapSkillLevel = (level) => {
    switch (level) {
      case "facile":
        return 1;
      case "intermediaire":
        return 2;
      case "difficile":
        return 3;
      default:
        return 0;
    }
  };

  const deleteSkill = async (skillId) => {
    try {
      // Effectuer l'appel DELETE à l'API
      const response = await fetch(
        `https://myprogrowth.onrender.com/api/skills/${skillId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Échec de la suppression de la compétence");
      }

      setSkillToDelete(skillId);

      setTimeout(() => {
        setSkillToDelete(null);
      }, 1000);

      location.reload();
    } catch (error) {
      console.error("Erreur lors de la suppression de la compétence:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      {loading ? (
        <div className="flex justify-center items-center">
          <FontAwesomeIcon
            icon={faSpinner}
            spin
            className="text-4xl text-pink-500"
          />
        </div>
      ) : (
        <div>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : userSkills.length === 0 ? (
            <div className="text-center">
              <p className="text-lg mb-4">
                Vous n&apos;avez pas encore ajouté de compétences.
              </p>
              <p>
                Ajoutez des compétences dès maintenant pour améliorer votre profil !
              </p>
            </div>
          ) : (
            <ul className="grid gap-4">
              {userSkills.map((skill) => (
                <li
                  key={skill._id}
                  className="bg-white p-4 rounded shadow-md grid grid-cols-3 gap-4"
                >
                  <div className="col-span-2">
                    <div className="flex xl:items-center xl:flex-row flex-col ">
                      <span className="text-lg font-semibold mr-2">
                        {skill.skillName}
                      </span>
                      <span className="text-sm font-light">
                        {Array.from(
                          { length: mapSkillLevel(skill.skillLevel) },
                          (_, index) => (
                            <span
                              key={index}
                              role="img"
                              aria-label="Star Emoji"
                            >
                              <FontAwesomeIcon
                                key={index}
                                icon={faStar}
                                className="text-yellow-500"
                              />
                            </span>
                          )
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-end items-center space-x-2">
                    <button
                      onClick={() => onSkillUpdateClick(skill._id)}
                      className="text-blue-500 hover:underline"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => {
                        deleteSkill(skill._id);
                      }}
                      className="text-red-500 hover:underline"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      <Modal
        isOpen={skillToDelete !== null}
        onRequestClose={() => setSkillToDelete(null)}
        contentLabel="Suppression réussie"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "max-content", // Ajustez la taille comme nécessaire
            height: "max-content", // Ajustez la taille comme nécessaire
            margin: "auto", // Pour centrer le contenu
            overflow: "auto",
            padding: "3rem",
            borderRadius: "0.8rem",
          },
        }}
      >
        <div className="flex flex-col items-center space-y-4">
          <FontAwesomeIcon
            icon={faCheckCircle}
            size="3x"
            className="text-green-500 mb-2"
          />
          <p>Compétence supprimée avec succès</p>
        </div>
      </Modal>
    </div>
  );
};
UserSkills.propTypes = {
  onSkillUpdateClick: PropTypes.func.isRequired, 
 };
export default UserSkills;
