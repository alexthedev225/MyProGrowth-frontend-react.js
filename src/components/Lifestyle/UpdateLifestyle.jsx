import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import PropTypes from 'prop-types';



const UpdateLifestyle = ({ onCancel }) => {
  const [sleepHours, setSleepHours] = useState("");
  const [dailyExercise, setDailyExercise] = useState(false);
  const [eatingHabits, setEatingHabits] = useState("");
  const [error, setError] = useState(null);

  const userId = Cookies.get("userId"); // Assurez-vous que la clé du cookie est correcte
  const authToken = Cookies.get("jwt_token"); // Remplace cela par la vraie logique pour obtenir le token

  useEffect(() => {
    // Charger le mode de vie de l'utilisateur lors du montage du composant
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
        setSleepHours(data.sleepHours.toString());
        setDailyExercise(data.dailyExercise);
        setEatingHabits(data.eatingHabits);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du mode de vie de l'utilisateur:",
          error
        );
        setError(
          "Une erreur s'est produite lors de la récupération du mode de vie de l'utilisateur."
        );
      }
    };

    fetchUserLifestyle();
  }, [userId, authToken]);

  const handleUpdateLifestyle = async () => {
    try {
      const response = await fetch(
        `https://myprogrowth.onrender.com/api/lifestyle/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            sleepHours: parseInt(sleepHours),
            dailyExercise,
            eatingHabits,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Échec de la mise à jour du mode de vie");
      }

      location.reload()
    } catch (error) {
      console.error("Erreur lors de la mise à jour du mode de vie:", error);
      setError(
        "Une erreur s'est produite lors de la mise à jour du mode de vie."
      );
    }
  };

  const predefinedEatingHabits = ["Végétarien", "Végétalien", "Sans gluten", "Autre"];
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-2">Mettre à jour le mode de vie</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form className="space-y-4">
        <label className="block">
          Sommeil (heures):
          <input
            type="number"
            value={sleepHours}
            onChange={(e) => setSleepHours(e.target.value)}
            className="border rounded-md px-3 py-2 w-full"
          />
        </label>
        <label className="block">
          Exercice quotidien:
          <input
            type="checkbox"
            checked={dailyExercise}
            onChange={() => setDailyExercise(!dailyExercise)}
            className="mx-2"
          />
          <span className="text-gray-700">Pratiquer quotidiennement</span>
        </label>
        <label className="block">
          Habitudes alimentaires:
          <select
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            value={eatingHabits}
            onChange={(e) => setEatingHabits(e.target.value)}
          >
            <option value="" disabled>Sélectionner une habitude alimentaire</option>
            {predefinedEatingHabits.map((habit, index) => (
              <option key={index} value={habit}>{habit}</option>
            ))}
          </select>
        </label>
        <div className="flex justify-between">
          <button 
            type="button" 
            onClick={handleUpdateLifestyle}
            className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700"
          >
            Modifier
          </button>
          <button 
            type="button" 
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

UpdateLifestyle.propTypes = {
  lifestyleId: PropTypes.string,
  onCancel: PropTypes.func, // Validation de type pour onCancel
};
export default UpdateLifestyle;
