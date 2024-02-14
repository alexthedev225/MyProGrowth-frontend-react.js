import { useState } from "react";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faSpinner } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';

const UserSkills = ({ onSkillUpdateClick }) => {
  const [skillToDelete, setSkillToDelete] = useState(null);
  const authToken = Cookies.get("token");
  const userId = Cookies.get("userId");

  const fetchUserSkills = async () => {
    const response = await fetch(
      `https://myprogrowth.onrender.com/api/skills/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Échec de la récupération des compétences");
    }

    return response.json();
  };

  const { data: userSkills, isLoading, isError } = useQuery(['userSkills', userId], fetchUserSkills);

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
    } catch (error) {
      console.error("Erreur lors de la suppression de la compétence:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <FontAwesomeIcon
            icon={faSpinner}
            spin
            className="text-4xl text-pink-500"
          />
        </div>
      ) : (
        <div>
          {isError ? (
            <p className="text-red-500">Erreur lors de la récupération des compétences</p>
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
