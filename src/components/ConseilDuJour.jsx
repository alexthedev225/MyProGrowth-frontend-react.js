import { useQuery } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner} from '@fortawesome/free-solid-svg-icons';

const ConseilDuJour = () => {
  const fetchConseilDuJour = async () => {
    const response = await fetch(
      "https://myprogrowth.onrender.com/api/conseils/aleatoire"
    );
    if (!response.ok) {
      throw new Error("Échec de la récupération du conseil du jour");
    }
    const data = await response.json();
    return data.conseil;
  };

  const { data: conseil, isLoading, isError } = useQuery('conseilDuJour', fetchConseilDuJour);

  if (isLoading) return <FontAwesomeIcon icon={faSpinner} spin className='text-pink-500'/>; // Utilisation de l'icône des trois points de Font Awesome pendant le chargement

  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="mb-8">
      <h2 className="font-bold text-xl mb-4 text-pink-500">Conseil du Jour</h2>
      <p className="text-lg">{conseil}</p>
    </div>
  );
};

export default ConseilDuJour;
