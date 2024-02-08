import { useState } from "react";
import Cookies from "js-cookie";

const CreateFitnessEntry = () => {
  const [exerciseType, setExerciseType] = useState("");
  const [duration, setDuration] = useState("");
  const [caloriesBurned, setCaloriesBurned] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState(null);

  const authToken = Cookies.get("jwt_token");

  const caloriesPerMinute = {
    running: 10,
    cycling: 8,
    weightlifting: 5,
    swimming: 12,
    yoga: 4,
    aerobics: 7,
    martial_arts: 9,
    crossfit: 11,
    bodybuilding: 6,
    calisthenics: 8,
  };

  const handleTypeChange = (value) => {
    setExerciseType(value);
    // Si la durée est définie, mettez à jour automatiquement les calories brûlées
    if (duration) {
      const calculatedCalories = calculateCaloriesBurned(value, duration);
      setCaloriesBurned(calculatedCalories);
    }
  };

  const handleDurationChange = (value) => {
    setDuration(value);
    // Si le type d'exercice est défini, mettez à jour automatiquement les calories brûlées
    if (exerciseType) {
      const calculatedCalories = calculateCaloriesBurned(exerciseType, value);
      setCaloriesBurned(calculatedCalories);
    }
  };

  const calculateCaloriesBurned = (exercise, duration) => {
    return Math.round(caloriesPerMinute[exercise] * duration);
  };

  const handleCreateFitnessEntry = async () => {
    try {
      const calculatedCalories = calculateCaloriesBurned(
        exerciseType,
        duration
      );

      const response = await fetch("https://myprogrowth.onrender.com/api/fitness", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          exerciseType,
          duration: parseInt(duration),
          caloriesBurned: calculatedCalories,
          date: new Date(date),
        }),
      });

      if (!response.ok) {
        throw new Error(
          "Échec de la création de l'entrée de condition physique"
        );
      }

      location.reload();
    } catch (error) {
      console.error(
        "Erreur lors de la création de l'entrée de condition physique:",
        error
      );
      setError(
        "Une erreur s'est produite lors de la création de l'entrée de condition physique."
      );
    }
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        Créer une entrée de condition physique
      </h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form className="space-y-4">
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Type d&apos;exercice:
          </label>
          <select
            value={exerciseType}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          >
            <option value="" disabled>
              Choisissez un type d&apos;exercice
            </option>
            <option value="running">Course à pied</option>
            <option value="cycling">Cyclisme</option>
            <option value="weightlifting">Haltérophilie</option>
            <option value="swimming">Natation</option>
            <option value="yoga">Yoga</option>
            <option value="aerobics">Aérobic</option>
            <option value="martial_arts">Arts martiaux</option>
            <option value="crossfit">CrossFit</option>
            <option value="bodybuilding">Musculation</option>
            <option value="calisthenics">Calisthénie</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Durée (minutes):
          </label>
          <input
            type="number"
            value={duration}
            onChange={(e) => handleDurationChange(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Calories brûlées:
          </label>
          <input
            type="number"
            value={caloriesBurned}
            readOnly
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Date:
          </label>
          <input
            type="date"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button
          type="button"
          className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600"
          onClick={handleCreateFitnessEntry}
        >
          Ajouter une entrée
        </button>
      </form>
    </div>
  );
};

export default CreateFitnessEntry;
