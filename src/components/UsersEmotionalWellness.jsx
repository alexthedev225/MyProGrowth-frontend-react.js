import { useState } from "react";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faSpinner } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { useQuery } from "react-query";

const UsersEmotionalWellness = ({ onEmotionalWellnessUpdateClick }) => {
  const [emotionalWellnessToDelete, setEmotionalWellnessToDelete] = useState(
    null
  );
  const authToken = Cookies.get("token");
  const userId = Cookies.get("userId");

  const fetchEntries = async () => {
    const response = await fetch(
      `https://myprogrowth.onrender.com/api/emotional-wellness/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        "Échec de la récupération des journaux de bien-être émotionnel"
      );
    }

    return response.json();
  };

  const { data: usersEmotionalWellness, isLoading, isError } = useQuery(
    ["userEmotionalWellness", userId],
    fetchEntries
  );

  const deleteEmotionalWellnessEntry = async (EmotionalWellnessId) => {
    try {
      const response = await fetch(
        `https://myprogrowth.onrender.com/api/emotional-wellness/${EmotionalWellnessId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          "Échec de la suppression de l'entrée de bien-être émotionnel"
        );
      }

      setEmotionalWellnessToDelete(EmotionalWellnessId);

      setTimeout(() => {
        setEmotionalWellnessToDelete(null);
        window.location.reload()
      }, 1000);

      // Reload the page or fetch the data again after deletion
      // location.reload();
    } catch (error) {
      console.error(
        "Erreur lors de la suppression de l'entrée de bien-être émotionnel:",
        error
      );
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
            <p className="text-red-500">
              Erreur lors de la récupération des journaux de bien-être émotionnel
            </p>
          ) : (
            usersEmotionalWellness.length === 0 && (
              <div className="text-center">
                <p className="text-lg mb-4">
                  Vous n&apos;avez pas encore ajouté d&apos;entrées de bien-être
                  émotionnel.
                </p>
                <p>
                  Ajoutez des entrées de bien-être émotionnel dès maintenant
                  pour améliorer votre profil !
                </p>
              </div>
            )
          )}

          {usersEmotionalWellness.length > 0 && (
            <ul className="grid gap-4">
              {usersEmotionalWellness.map((emotionalWellness) => (
                <li
                  key={emotionalWellness._id}
                  className="bg-white p-4 rounded shadow-md grid grid-cols-3 gap-4"
                >
                  <div className="col-span-3 sm:col-span-2">
                    <div className="mb-2">
                      <strong>Date:</strong>{" "}
                      {new Date(
                        emotionalWellness.entryDate
                      ).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div className="mb-2">
                      <strong>Émotion:</strong> {emotionalWellness.emotion}
                    </div>
                    <div>
                      <strong>Description de l&apos;humeur:</strong>{" "}
                      {emotionalWellness.moodDescription}
                    </div>
                  </div>
                  <div className="flex justify-end items-center space-x-2 col-span-3">
                    <button
                      onClick={() =>
                        onEmotionalWellnessUpdateClick(emotionalWellness._id)
                      }
                      className="text-blue-500 hover:underline"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() =>
                        deleteEmotionalWellnessEntry(emotionalWellness._id)
                      }
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
        isOpen={emotionalWellnessToDelete !== null}
        onRequestClose={() => setEmotionalWellnessToDelete(null)}
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
          <p>Entrée de bien-être émotionnel supprimée avec succès</p>
        </div>
      </Modal>
    </div>
  );
};

UsersEmotionalWellness.propTypes = {
  onEmotionalWellnessUpdateClick: PropTypes.func.isRequired,
};

export default UsersEmotionalWellness;
