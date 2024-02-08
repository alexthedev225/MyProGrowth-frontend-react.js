import Cookies from 'js-cookie';
import { useState } from 'react';

const CreateLifestyle = () => {
  const [sleepHours, setSleepHours] = useState('');
  const [dailyExercise, setDailyExercise] = useState(false);
  const [eatingHabits, setEatingHabits] = useState('');
  const [error, setError] = useState(null);

  const authToken = Cookies.get('jwt_token');

  // Ajoutons une liste d'habitudes alimentaires pré-définies
  const predefinedEatingHabits = ["Végétarien", "Végétalien", "Sans gluten", "Autre"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://myprogrowth.onrender.com/api/lifestyle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          sleepHours: parseInt(sleepHours),
          dailyExercise,
          eatingHabits,
        }),
      });

      if (!response.ok) {
        throw new Error('Échec de la création du mode de vie');
      }

      location.reload()
    } catch (error) {
      console.error('Erreur lors de la création du mode de vie:', error);
      setError('Une erreur s\'est produite lors de la création du mode de vie.');
    }
  };

  return (
    <div className=" bg-white ">
      <h2 className="text-xl font-semibold mb-4">Créer un mode de vie</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Sommeil (heures):</label>
          <input
            type="number"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            value={sleepHours}
            onChange={(e) => setSleepHours(e.target.value)}
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={dailyExercise}
            onChange={() => setDailyExercise(!dailyExercise)}
          />
          <label className="text-sm font-medium text-gray-700">Exercice quotidien</label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Habitudes alimentaires:</label>
          {/* Remplaçons le champ de saisie par un champ de sélection */}
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
        </div>

        <button
          type="submit"
          className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600"
        >
          Créer le mode de vie
        </button>
      </form>
    </div>
  );
};

export default CreateLifestyle;
