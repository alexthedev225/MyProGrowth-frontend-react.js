import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faSpinner } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';



const UsersFitness = ({ onFitnessUpdateClick }) => {
  const [usersFitness, setUsersFitness] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fitnessToDelete, setFitnessToDelete] = useState(null);
  const [error, setError] = useState(null);

  const authToken = Cookies.get("token");
  const userId = Cookies.get("userId");

  const exerciseTypeTranslations = {
    running: "Course à pied",
    cycling: "Cyclisme",
    weightlifting: "Haltérophilie",
    swimming: "Natation",
    yoga: "Yoga",
    aerobics: "Aérobic",
    martial_arts: "Arts martiaux",
    crossfit: "CrossFit",
    bodybuilding: "Musculation",
    calisthenics: "Calisthénie",
  };

  useEffect(() => {
    const fetchUserFitnessEntries = async () => {
      try {
        const response = await fetch(
          `https://myprogrowth.onrender.com/api/fitness/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            "Échec de la récupération des entrées de condition physique de l'utilisateur"
          );
        }

        const data = await response.json();
        setUsersFitness(data);
        setLoading(false);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des entrées de condition physique de l'utilisateur:",
          error
        );
        setError(
          "Une erreur s'est produite lors de la récupération des entrées de condition physique."
        );
        setLoading(false);
      }
    };

    fetchUserFitnessEntries();
  }, [authToken, userId]);

  const deleteFitnessEntry = async (fitnessId) => {
    try {
      const response = await fetch(
        `https://myprogrowth.onrender.com/api/fitness/${fitnessId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          "Échec de la suppression de l'entrée de condition physique"
        );
      }

      setFitnessToDelete(fitnessId);

      setTimeout(() => {
        setFitnessToDelete(null);
      }, 1000);

      location.reload();
    } catch (error) {
      console.error(
        "Erreur lors de la suppression de l'entrée de condition physique:",
        error
      );
      setError(
        "Une erreur s'est produite lors de la suppression de l'entrée de condition physique."
      );
    } finally {
      setLoading(false);
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
          ) : usersFitness.length === 0 ? (
            <div className="text-center">
              <p className="text-lg mb-4">
                Vous n&apos;avez pas encore ajouté d&apos;entrées de condition physique.
              </p>
              <p>
                Ajoutez des entrées de condition physique dès maintenant pour suivre votre progrès !
              </p>
              
            </div>
          ) : (
            <ul className="grid gap-4">
              {usersFitness.map((fitness) => (
                <li
                  key={fitness._id}
                  className="bg-white p-4 rounded shadow-md grid grid-cols-3 gap-4"
                >
                  <p className="col-span-3 sm:col-span-2">
                    <strong> Durée:</strong> {fitness.duration} minutes
                  </p>
                  <p className="col-span-3 sm:col-span-2">
                   <strong>Calories brûlées:</strong> {fitness.caloriesBurned}
                  </p>
                  <p className="col-span-3 sm:col-span-2">
                    <div className="mb-2">
                      <strong>Date:</strong>{" "}
                      {new Date(fitness.date).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </p>

                  <div className="col-span-3 sm:col-span-1">
                    <span className="text-xl font-semibold mr-2">
                      {exerciseTypeTranslations[fitness.exerciseType]}
                    </span>
                  </div>
                  <div className="flex justify-end items-center space-x-2 col-span-3">
                    <button
                      onClick={() => onFitnessUpdateClick(fitness._id)}
                      className="text-blue-500 hover:underline"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => {
                        deleteFitnessEntry(fitness._id);
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
        isOpen={fitnessToDelete !== null}
        onRequestClose={() => setFitnessToDelete(null)}
        contentLabel="Suppression réussie"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "max-content",
            height: "max-content",
            margin: "auto",
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
UsersFitness.propTypes = {
  onFitnessUpdateClick: PropTypes.func.isRequired,
};
export default UsersFitness;
