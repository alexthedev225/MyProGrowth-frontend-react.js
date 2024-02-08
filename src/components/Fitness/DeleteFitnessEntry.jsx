// DeleteFitnessEntry.js
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const DeleteFitnessEntry = () => {
  const { entryId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const authToken = Cookies.get('jwt_token'); // Assurez-vous que la clé du cookie est correcte
  const navigate = useNavigate();

  useEffect(() => {
    const deleteFitnessEntry = async () => {
      try {
        const response = await fetch(`https://myprogrowth.onrender.com/api/fitness/${entryId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${authToken}`,
            // Ajoutez d'autres en-têtes nécessaires
          },
        });

        if (!response.ok) {
          throw new Error('Échec de la suppression de l\'entrée de condition physique');
        }

        // Rediriger vers la page de condition physique après la suppression réussie
        navigate('/fitness');
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'entrée de condition physique:', error);
        setError('Une erreur s\'est produite lors de la suppression de l\'entrée de condition physique.');
      } finally {
        setLoading(false);
      }
    };

    deleteFitnessEntry();
  }, [authToken, entryId, navigate]);

  return (
    <div>
      <h2>Suppression de l&apos;entrée de condition physique</h2>
      {loading ? (
        <p>Suppression en cours...</p>
      ) : (
        <div>
          {error && <p>{error}</p>}
          <p>L&apos;entrée de condition physique a été supprimée avec succès.</p>
        </div>
      )}
    </div>
  );
};

export default DeleteFitnessEntry;
