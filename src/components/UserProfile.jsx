import { useQuery } from 'react-query';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const UserProfile = () => {
  const authToken = Cookies.get('token');
  const userId = Cookies.get('userId');

  const fetchUserProfile = async () => {
    const response = await fetch(
      `https://myprogrowth.onrender.com/api/users/user-profile/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Échec de la récupération du profil utilisateur');
    }

    return response.json();
  };

  const fetchUserConseils = async () => {
    const response = await fetch(
      `https://myprogrowth.onrender.com/api/users/${userId}/conseils`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch user conseils');
    }

    return response.json();
  };

  const userProfileQuery = useQuery('userProfile', fetchUserProfile);
  const userConseilsQuery = useQuery('userConseils', fetchUserConseils);

  const isConnected = authToken;

  if (!isConnected) {
    return (
      <div className="container mx-auto mt-8 mb-8 p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Attention :</strong>
          <span className="block sm:inline"> Veuillez vous connecter pour accéder à votre profil.</span>
        </div>
      </div>
    );
  }

  if (userProfileQuery.isLoading || userConseilsQuery.isLoading) {
    return (
      <div className="container mx-auto mt-8 mb-8 p-4 flex items-center justify-center h-[50vh]">
        <FontAwesomeIcon icon={faSpinner} spin className="text-4xl text-pink-500" />
      </div>
    );
  }

  if (userProfileQuery.isError || userConseilsQuery.isError) {
    return <div>Error fetching data</div>;
  }

  const { data: profileData } = userProfileQuery;
  const { data: userConseils } = userConseilsQuery;

  return (
    <div className="container mx-auto mt-8 mb-8 p-4">
      <div>
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Mon objectif de fitness:</h3>
          <h2 className="text-lg mb-4">{profileData.fitnessGoals}</h2>
          <ul className="list-disc pl-4">
            {userConseils.fitnessGoals.map((item, index) => (
              <li key={index}>{item.conseil}</li>
            ))}
          </ul>
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Ma compétence à développer:</h3>
          <h2 className="text-lg mb-4 ">{profileData.skillsToDevelop}</h2>
          <ul className="list-disc pl-4">
            {userConseils.skillsToDevelop.map((item, index) => (
              <li key={index}>{item.conseil}</li>
            ))}
          </ul>
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Mon habitude quotidienne:</h3>
          <h2 className="text-lg mb-4 ">{profileData.dailyHabits}</h2>
          <ul className="list-disc pl-4">
            {userConseils.dailyHabits.map((item, index) => (
              <li key={index}>{item.conseil}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Mon bien-être émotionnel:</h3>
          <h2 className="text-lg mb-4 ">{profileData.emotionalWellbeing}</h2>
          <ul className="list-disc pl-4">
            {userConseils.emotionalWellbeing.map((item, index) => (
              <li key={index}>{item.conseil}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
