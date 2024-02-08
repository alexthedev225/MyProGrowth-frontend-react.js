// UpdateEmotionalWellnessEntry.js
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import PropTypes from 'prop-types';

const UpdateEmotionalWellnessEntry = ({ onCancel, emotionalWellnessId }) => {
  const [entryDate, setEntryDate] = useState('');
  const [emotion, setEmotion] = useState('');
  const [moodDescription, setMoodDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const authToken = Cookies.get('token');

  useEffect(() => {
    const fetchEntryDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://myprogrowth.onrender.com/api/emotional-wellness/${emotionalWellnessId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            "Échec de la récupération des détails du journal de bien-être émotionnel"
          );
        }

        const data = await response.json();
        setEntryDate(data.entryDate);
        setEmotion(data.emotion);
        setMoodDescription(data.moodDescription);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails du journal de bien-être émotionnel:",
          error
        );
        setError(
          "Une erreur s'est produite lors de la récupération des détails du journal de bien-être émotionnel."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEntryDetails();
  }, [authToken, emotionalWellnessId]);

  const handleUpdateEntry = async () => {
    try {
      const response = await fetch(
        `https://myprogrowth.onrender.com/api/emotional-wellness/${emotionalWellnessId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            entryDate: entryDate,
            emotion: emotion,
            moodDescription: moodDescription,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Échec de la mise à jour du journal de bien-être émotionnel"
        );
      }

      console.log("Journal de bien-être émotionnel mis à jour avec succès");
     
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour du journal de bien-être émotionnel:",
        error
      );
    }
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-md ">
      <h2 className="text-2xl font-bold mb-4">Mise à jour du journal de bien-être émotionnel</h2>
      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <form className="space-y-4">
          <label>
            Date:
            <input
              type="date"
              value={entryDate || ''}
              onChange={(e) => setEntryDate(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </label>
          <label>
            Émotion:
            <input
              type="text"
              value={emotion || ''}
              onChange={(e) => setEmotion(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </label>
          <label>
            Description de l&apos;humeur:
            <textarea
              value={moodDescription || ''}
              onChange={(e) => setMoodDescription(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </label>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleUpdateEntry}
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
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

UpdateEmotionalWellnessEntry.propTypes = {
  emotionalWellnessId: PropTypes.string,
  onCancel: PropTypes.func, // Validation de type pour onCancel
};

export default UpdateEmotionalWellnessEntry;
