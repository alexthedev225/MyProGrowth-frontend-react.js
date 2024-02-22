import { useState } from 'react';
import Cookies from 'js-cookie';

const CreateEmotionalWellnessEntry = () => {
  const [entryDate, setEntryDate] = useState('');
  const [emotion, setEmotion] = useState('');
  const [moodDescription, setMoodDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const authToken = Cookies.get('token');

  const handleEmotionChange = (e) => {
    setEmotion(e.target.value);
  };

  const handleCreateEntry = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://myprogrowth.onrender.com/api/emotional-wellness', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ entryDate, emotion, moodDescription }),
      });

      if (!response.ok) {
        throw new Error('Échec de la création du journal de bien-être émotionnel');
      }

      location.reload()
    } catch (error) {
      console.error('Erreur lors de la création du journal de bien-être émotionnel:', error);
      setError('Une erreur s\'est produite lors de la création du journal de bien-être émotionnel.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 rounded-md shadow-md ">
      <h2 className="text-xl font-semibold mb-4">Création d&apos;un journal de bien-être émotionnel</h2>
      <label className="block text-sm font-medium text-gray-600 mb-2">
        Date de l&apos;entrée:
        <input
          type="date"
          value={entryDate}
          onChange={(e) => setEntryDate(e.target.value)}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
        />
      </label>
      <label className="block text-sm font-medium text-gray-600 mb-2">
        Émotion :
       <select
  value={emotion}
  onChange={handleEmotionChange}
  className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
>
  <option value="">Sélectionner une émotion</option>
  <option value="Joie">Joie</option>
  <option value="Tristesse">Tristesse</option>
  <option value="Colère">Colère</option>
  <option value="Peur">Peur</option>
  <option value="Surprise">Surprise</option>
  <option value="Dégoût">Dégoût</option>
  <option value="Sérénité">Sérénité</option>
  <option value="Stress">Stress</option>
  <option value="Confusion">Confusion</option>
  <option value="Amour">Amour</option>
  <option value="Haine">Haine</option>
  <option value="Excitation">Excitation</option>
  <option value="Espoir">Espoir</option>
  <option value="Ennui">Ennui</option>
  <option value="Fierté">Fierté</option>
  <option value="Jalousie">Jalousie</option>
  <option value="Déception">Déception</option>
  <option value="Gêne">Gêne</option>
  <option value="Culpabilité">Culpabilité</option>
  <option value="Regret">Regret</option>
  <option value="Rancune">Rancune</option>
  <option value="Remords">Remords</option>
  <option value="Embarras">Embarras</option>
  <option value="Gratitude">Gratitude</option>
  <option value="Détermination">Détermination</option>
  <option value="Satisfaction">Satisfaction</option>
  <option value="Curiosité">Curiosité</option>
  <option value="Inquiétude">Inquiétude</option>
  <option value="Optimisme">Optimisme</option>
  <option value="Pessimisme">Pessimisme</option>
  <option value="Indifférence">Indifférence</option>
  <option value="Fierté">Fierté</option>
  <option value="Émerveillement">Émerveillement</option>
</select>

      </label>
      <label className="block text-sm font-medium text-gray-600 mb-2">
        Description de l&apos;humeur:
        <textarea
          value={moodDescription}
          onChange={(e) => setMoodDescription(e.target.value)}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-500 resize-none"
        />
      </label>
      <button
        type="button"
        onClick={handleCreateEntry}
        disabled={loading}
        className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600"
      >
        {loading ? 'Création en cours...' : 'Créer le journal de bien-être émotionnel'}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default CreateEmotionalWellnessEntry;
