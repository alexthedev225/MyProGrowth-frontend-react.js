import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [userConseils, setUserConseils] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const authToken = Cookies.get("token");
  const userId = Cookies.get("userId");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          `https://myprogrowth.onrender.com/api/users/user-profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Échec de la récupération du profil utilisateur");
        }

        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du profil utilisateur:",
          error
        );
        setError(
          "Une erreur s'est produite lors de la récupération du profil utilisateur."
        );
      }
    };

    fetchUserProfile();
  }, [userId, authToken]);

  useEffect(() => {
    const fetchUserConseils = async () => {
      try {
        const response = await fetch(
          `https://myprogrowth.onrender.com/api/users/${userId}/conseils`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user conseils");
        }

        const data = await response.json();
        setUserConseils(data);
      } catch (error) {
        console.error("Error fetching user conseils:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserConseils();
  }, [userId, authToken]);

  const isConnected = authToken;

  return (
    <div className="container mx-auto mt-8 mb-8 p-4">
      {isConnected ? (
        <>
        
          {loading ? (
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              className="text-4xl text-pink-500"
            />
          ) : (
            <div>
              {error && <p className="text-red-500">{error}</p>}
              {profileData && (
                <div>
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-2">
                      Mon objectif de fitness:
                    </h3>
                    <h2 className="text-lg mb-4">{profileData.fitnessGoals}</h2>
                    <ul className="list-disc pl-4">
                      {userConseils &&
                        userConseils.fitnessGoals &&
                        userConseils.fitnessGoals.map((item, index) => (
                          <li key={index}>{item.conseil}</li>
                        ))}
                    </ul>
                  </div>
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-2">
                      Ma compétence à développer:
                    </h3>
                    <h2 className="text-lg mb-4 ">
                      {profileData.skillsToDevelop}
                    </h2>
                    <ul className="list-disc pl-4">
                      {userConseils &&
                        userConseils.skillsToDevelop &&
                        userConseils.skillsToDevelop.map((item, index) => (
                          <li key={index}>{item.conseil}</li>
                        ))}
                    </ul>
                  </div>
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-2">
                      Mon habitude quotidien:
                    </h3>
                    <h2 className="text-lg mb-4 ">{profileData.dailyHabits}</h2>
                    <ul className="list-disc pl-4">
                      {userConseils &&
                        userConseils.dailyHabits &&
                        userConseils.dailyHabits.map((item, index) => (
                          <li key={index}>{item.conseil}</li>
                        ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Mon bien-être émotionnel:
                    </h3>
                    <h2 className="text-lg mb-4 ">
                      {profileData.emotionalWellbeing}
                    </h2>
                    <ul className="list-disc pl-4">
                      {userConseils &&
                        userConseils.emotionalWellbeing &&
                        userConseils.emotionalWellbeing.map((item, index) => (
                          <li key={index}>{item.conseil}</li>
                        ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Attention :</strong>
          <span className="block sm:inline">
            {" "}
            Veuillez vous connecter pour accéder à votre profil.
          </span>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
