import { useState } from 'react';
import Cookies from 'js-cookie';

const CreateEmotionalWellnessEntry = () => {
  const [entryDate, setEntryDate] = useState('');
  const [emotion, setEmotion] = useState('');
  const [moodDescription, setMoodDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const authToken = Cookies.get('jwt_token');

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
    <div className="p-6 bg-white rounded-md shadow-md">
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
        Émotion:
        <input
          type="text"
          value={emotion}
          onChange={(e) => setEmotion(e.target.value)}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
        />
      </label>
      <label className="block text-sm font-medium text-gray-600 mb-2">
        Description de l&apos;humeur:
        <textarea
          value={moodDescription}
          onChange={(e) => setMoodDescription(e.target.value)}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
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
