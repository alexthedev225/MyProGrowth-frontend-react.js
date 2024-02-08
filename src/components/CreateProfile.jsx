import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const CreateProfile = () => {
  const [fitnessGoals, setFitnessGoals] = useState("");
  const [skillsToDevelop, setSkillsToDevelop] = useState("");
  const [dailyHabits, setDailyHabits] = useState("");
  const [emotionalWellbeing, setEmotionalWellbeing] = useState("");
  const [error, setError] = useState(null);

  const authToken = Cookies.get("token");
  const navigate = useNavigate();

  const handleCreateProfile = async () => {
    try {
      const response = await fetch(
        "https://myprogrowth.onrender.com/api/users/create-profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            fitnessGoals,
            skillsToDevelop,
            dailyHabits,
            emotionalWellbeing,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Échec de la création du profil utilisateur");
      }

      console.log("Profil utilisateur créé avec succès");
      navigate("/dashboard");
    } catch (error) {
      console.error("Erreur lors de la création du profil utilisateur:", error);
      setError(
        "Une erreur s'est produite lors de la création du profil utilisateur."
      );
    }
  };

  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Création du Profil Utilisateur
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Objectifs de fitness:
            </label>
            <select
              value={fitnessGoals}
              onChange={(e) => setFitnessGoals(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            >
              <option value="">Sélectionnez vos objectifs de fitness</option>
              <option value="Perte de poids">Perte de poids</option>
              <option value="Prise de masse musculaire">
                Prise de masse musculaire
              </option>
              <option value="Amélioration de la condition physique">
                Amélioration de la condition physique
              </option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Compétences à développer:
            </label>
            <select
              value={skillsToDevelop}
              onChange={(e) => setSkillsToDevelop(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            >
              <option value="">
                Sélectionnez les compétences à développer
              </option>
              <option value="Développement personnel">
                Développement personnel
              </option>
              <option value="Compétences professionnelles">
                Compétences professionnelles
              </option>
              <option value="Compétences relationnelles">
                Compétences relationnelles
              </option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Habitudes quotidiennes:
            </label>
            <select
              value={dailyHabits}
              onChange={(e) => setDailyHabits(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            >
              <option value="">Sélectionnez vos habitudes quotidiennes</option>
              <option value="Routine de sport">Routine de sport</option>
              <option value="Méditation quotidienne">
                Méditation quotidienne
              </option>
              <option value="Planification des tâches">
                Planification des tâches
              </option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Bien-être émotionnel:
            </label>
            <select
              value={emotionalWellbeing}
              onChange={(e) => setEmotionalWellbeing(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            >
              <option value="">Sélectionnez votre bien-être émotionnel</option>
              <option value="Gestion du stress">Gestion du stress</option>
              <option value="Développement de la résilience">
                Développement de la résilience
              </option>
              <option value="Equilibre émotionnel">Equilibre émotionnel</option>
            </select>
          </div>
          <button
            type="button"
            onClick={handleCreateProfile}
            className="bg-pink-500 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline w-full"
          >
            Créer le Profil Utilisateur
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default CreateProfile;
