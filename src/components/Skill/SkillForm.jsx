import Cookies from "js-cookie";
import { useState } from "react";

const SkillForm = () => {
  const [skillName, setSkillName] = useState("");
  const [skillLevel, setSkillLevel] = useState("facile");

  const handleSkillSubmit = (skillData) => {
    const authToken = Cookies.get("jwt_token");

    // Vérifier si le token est présent
    if (!authToken) {
      console.error("Token d'autorisation non trouvé.");
      // Gérer l'absence de token, par exemple, rediriger l'utilisateur vers la page de connexion
      return;
    }

    // Appeler l'API backend pour créer une compétence
    fetch("https://myprogrowth.onrender.com/api/skills", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
        // Ajoutez d'autres en-têtes nécessaires
      },
      body: JSON.stringify(skillData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Échec de la création de compétence");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Compétence créée avec succès :", data);
        // Gérer toute action supplémentaire après la création de compétence réussie
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la création de compétence :",
          error.message
        );
        // Gérer les erreurs, par exemple, afficher un message à l'utilisateur
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Appel de la fonction de soumission de compétence fournie par le parent
    handleSkillSubmit({ skillName, skillLevel });

    location.reload();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <label className="block mb-2 text-sm font-semibold text-gray-600">
        Nom de la Compétence:
        <input
          type="text"
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
          className="block w-full p-2 border rounded-md"
        />
      </label>
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

      <button
        type="submit"
        className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600"
      >
        Ajouter Compétence
      </button>
    </form>
  );
};

export default SkillForm;
