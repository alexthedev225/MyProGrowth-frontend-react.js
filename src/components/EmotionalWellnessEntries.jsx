// EmotionalWellnessEntries.js
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const EmotionalWellnessEntries = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const authToken = Cookies.get('token'); 
  const userId = Cookies.get('userId')

  useEffect(() => {
    const fetchEntries = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://myprogrowth.onrender.com/api/emotional-wellness/${userId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            // Ajoutez d'autres en-têtes nécessaires
          },
        });

        if (!response.ok) {
          throw new Error('Échec de la récupération des journaux de bien-être émotionnel');
        }

        const data = await response.json();
        setEntries(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des journaux de bien-être émotionnel:', error);
        setError('Une erreur s\'est produite lors de la récupération des journaux de bien-être émotionnel.');
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, [authToken, userId]);

  return (
    <div>
      <h2>Journaux de bien-être émotionnel</h2>
      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <ul>
          {entries.map((entry) => (
            <li key={entry._id}>
              <strong>Date:</strong> {entry.entryDate}<br />
              <strong>Émotion:</strong> {entry.emotion}<br />
              <strong>Description de l&apos;humeur:</strong> {entry.moodDescription}<br />
              {/* Ajoutez d'autres informations si nécessaire */}
              <hr />
            </li>
          ))}
        </ul>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default EmotionalWellnessEntries;
