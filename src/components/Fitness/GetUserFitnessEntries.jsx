// GetUserFitnessEntries.js
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const GetUserFitnessEntries = () => {
  const [fitnessEntries, setFitnessEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const authToken = Cookies.get('jwt_token'); // Assurez-vous que la clé du cookie est correcte

  useEffect(() => {
    const userId = Cookies.get('userId'); // Assurez-vous que la clé du cookie est correcte

    // Récupérer les entrées de condition physique de l'utilisateur
    const fetchUserFitnessEntries = async () => {
      try {
        const response = await fetch(`https://myprogrowth.onrender.com/api/fitness/${userId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            // Ajoutez d'autres en-têtes nécessaires
          },
        });

        if (!response.ok) {
          throw new Error('Échec de la récupération des entrées de condition physique de l\'utilisateur');
        }

        const data = await response.json();
        setFitnessEntries(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des entrées de condition physique de l\'utilisateur:', error);
        setError('Une erreur s\'est produite lors de la récupération des entrées de condition physique.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserFitnessEntries();
  }, [authToken]);

  return (
    <div>
      <h2>Entrées de condition physique de l&apos;utilisateur</h2>
      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <div>
          {error && <p>{error}</p>}
          <ul>
            {fitnessEntries.map((entry) => (
              <li key={entry._id}>
                <p>Type d&apos;exercice: {entry.exerciseType}</p>
                <p>Durée: {entry.duration} minutes</p>
                <p>Calories brûlées: {entry.caloriesBurned}</p>
                <p>Date: {new Date(entry.date).toLocaleDateString()}</p>
                <hr />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GetUserFitnessEntries;
