import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';



const UpdateSkill = ({ skillId, onCancel }) => {
  const [skillName, setSkillName] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [loading, setLoading] = useState(true);
  const authToken = Cookies.get("token");

  useEffect(() => {
    fetch(`https://myprogrowth.onrender.com/api/skills/${skillId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Échec de la récupération des détails de la compétence"
          );
        }
        return response.json();
      })
      .then((data) => {
        setSkillName(data.skillName || "");
        setSkillLevel(data.skillLevel || "");
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des détails de la compétence :",
          error.message
        );
        setLoading(false);
      });
  }, [authToken, skillId]);

  const handleUpdateSkill = () => {
    fetch(`https://myprogrowth.onrender.com/api/skills/${skillId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        skillLevel: skillLevel,
        skillName: skillName,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Échec de la mise à jour de la compétence");
        }
        console.log("Compétence mise à jour avec succès");
        location.reload();
        // Gérer toute action supplémentaire après la mise à jour réussie
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la mise à jour de la compétence :",
          error.message
        );
        // Gérer les erreurs, par exemple, afficher un message à l'utilisateur
      });
  };

  return (
    <div className="container mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
     
      {loading ? (
        <div className="flex justify-center items-center">
          <FontAwesomeIcon
            icon={faSpinner}
            spin
            className="text-4xl text-pink-500"
          />
        </div>
      ) : (
        <form className="max-w-md mx-auto">
          <div className="mb-4">
            <label
              htmlFor="skillName"
              className="block text-sm font-medium text-gray-600"
            >
              Nom de la compétence
            </label>
            <input
              type="text"
              id="skillName"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-gray-600">
              Niveau de Compétence:
              <select
                value={skillLevel}
                onChange={(e) => setSkillLevel(e.target.value)}
                className="block w-full p-2 border rounded-md"
              >
                <option value="facile">Facile</option>
                <option value="intermediaire">Intermédiaire</option>
                <option value="difficile">Difficile</option>
              </select>
            </label>
          </div>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleUpdateSkill}
              className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600"
            >
              Modifier
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
            >
              Annuler
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

UpdateSkill.propTypes = {
  skillId: PropTypes.string,
  onCancel: PropTypes.func // Validation de type pour onCancel
};

export default UpdateSkill;
