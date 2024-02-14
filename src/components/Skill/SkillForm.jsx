import Cookies from "js-cookie";
import { useState } from "react";

const SkillForm = () => {
  const [skillName, setSkillName] = useState("");
  const [skillLevel, setSkillLevel] = useState("facile");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // Appel de la fonction de soumission de compétence fournie par le parent
        const response = await handleSkillSubmit({ skillName, skillLevel });

        // Si la réponse est ok, réinitialise les champs du formulaire
        if (response.ok) {
            setSkillName("");
            setSkillLevel("facile");
        }
    } catch (error) {
        // Gérer les erreurs en affichant un message à l'utilisateur
        console.error("Erreur lors de la création de compétence :", error.message);
        // Afficher un message d'erreur à l'utilisateur
        // Vous pouvez utiliser une alerte ou un composant d'erreur dédié
    }
};

const handleSkillSubmit = async (skillData) => {
    const authToken = Cookies.get("token");

    // Vérifier si le token est présent
    if (!authToken) {
        throw new Error("Token d'autorisation non trouvé.");
    }

    try {
        // Appeler l'API backend pour créer une compétence
        const response = await fetch("https://myprogrowth.onrender.com/api/skills", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
                // Ajoutez d'autres en-têtes nécessaires
            },
            body: JSON.stringify(skillData),
        });

        if (!response.ok) {
            throw new Error("Échec de la création de compétence");
        }
        window.location.reload()
        return response.json();
    } catch (error) {
        throw new Error("Échec de la création de compétence :", error.message);
    }
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
