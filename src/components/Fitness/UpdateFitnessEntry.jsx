import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import PropTypes from 'prop-types';



const UpdateFitnessEntry = ({ fitnessId, onCancel }) => {
  const [exerciseType, setExerciseType] = useState("");
  const [duration, setDuration] = useState("");
  const [caloriesBurned, setCaloriesBurned] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const authToken = Cookies.get("token");

  useEffect(() => {
    const fetchFitnessEntryDetails = async () => {
      try {
        const response = await fetch(
          `https://myprogrowth.onrender.com/api/fitness/${fitnessId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            "Échec de la récupération des détails de l'entrée de condition physique"
          );
        }

        const data = await response.json();
        setExerciseType(data.exerciseType || "");
        setDuration(
          data.duration !== undefined ? data.duration.toString() : ""
        );
        setCaloriesBurned(
          data.caloriesBurned !== undefined
            ? data.caloriesBurned.toString()
            : ""
        );
        setDate(
          data.date ? new Date(data.date).toISOString().split("T")[0] : ""
        );
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails de l'entrée de condition physique:",
          error
        );
        setError(
          "Une erreur s'est produite lors de la récupération des détails de l'entrée de condition physique."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFitnessEntryDetails();
  }, [authToken, fitnessId]);
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

  const handleUpdateFitnessEntry = async () => {
    try {
      const calculatedCalories = calculateCaloriesBurned(
        exerciseType,
        duration
      );

      const response = await fetch(
        `https://myprogrowth.onrender.com/api/fitness/${fitnessId}`,
        {
          method: "PUT",
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
        }
      );

      if (!response.ok) {
        throw new Error(
          "Échec de la mise à jour de l'entrée de condition physique"
        );
      }

      location.reload();
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour de l'entrée de condition physique:",
        error
      );
      setError(
        "Une erreur s'est produite lors de la mise à jour de l'entrée de condition physique."
      );
    }
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">
        Mise à jour de l&apos;entrée de condition physique
      </h2>
      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <div>
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
            <div>
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
            <div>
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
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date:
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleUpdateFitnessEntry}
                className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600"
              >
                Modifier
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

UpdateFitnessEntry.propTypes = {
  fitnessId: PropTypes.string,
  onCancel: PropTypes.func, // Validation de type pour onCancel
};

export default UpdateFitnessEntry;
