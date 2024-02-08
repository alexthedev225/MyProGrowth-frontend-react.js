import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const authToken = Cookies.get("token");
  const userId = Cookies.get("userId");

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://myprogrowth.onrender.com/api/dashboard/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            "Échec de la récupération des informations du tableau de bord"
          );
        }

        const data = await response.json();
        setDashboardData(data);
        console.log(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des informations du tableau de bord:",
          error
        );
        setError(
          "Une erreur s'est produite lors de la récupération des informations du tableau de bord."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [authToken, userId]);

  return (
    <div className="container mx-auto my-8 p-4 bg-white rounded-md ">
      <h2 className="text-3xl font-bold mb-8">Tableau de bord</h2>
      {loading ? (
        <FontAwesomeIcon
          icon={faSpinner}
          spin
          className="text-4xl text-pink-500"
        />
      ) : !dashboardData ||
        (dashboardData.userDashboard === null &&
          dashboardData.fitnessEntries.length === 0 &&
          dashboardData.emotionalWellnessEntries.length === 0 &&
          dashboardData.lifestyleEntries.length === 0 &&
          dashboardData.skillsEntries.length === 0) ? (
        <div className="text-center">
          <p className="text-lg mb-4">Le tableau de bord est vide.</p>
          <p>
            Cet espace affichera les informations que vous ajouterez depuis les
            pages dédiées pour ajouter des compétences, des entrées de condition
            physique, des journaux de bien-être émotionnel, et du mode de vie.
            Naviguez vers les différentes pages pour saisir et consulter vos
            informations.
          </p>
        </div>
      ) : (
        <div>
          {dashboardData && (
            <div>
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">
                  Informations du tableau de bord
                </h3>
                {/* Ajoutez d'autres éléments en fonction des propriétés du tableau de bord */}
              </div>
              {dashboardData.fitnessEntries.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">
                    Entrées de condition physique
                  </h3>
                  {dashboardData.fitnessEntries.map((entry) => (
                    <div key={entry._id} className="mb-4">
                      {/* Affichez les propriétés spécifiques de l'entrée de condition physique */}
                      <p className="text-gray-700">
                        Exercise Type: {entry.exerciseType}
                      </p>
                      {/* Ajoutez d'autres éléments en fonction des propriétés de l'entrée de condition physique */}
                    </div>
                  ))}
                </div>
              )}
              {dashboardData.emotionalWellnessEntries.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">
                    Journaux de bien-être émotionnel
                  </h3>
                  {dashboardData.emotionalWellnessEntries.map((entry) => (
                    <div key={entry._id} className="mb-4">
                      {/* Affichez les propriétés spécifiques du journal de bien-être émotionnel */}
                      <p className="text-gray-700">Emotion: {entry.emotion}</p>
                      {/* Ajoutez d'autres éléments en fonction des propriétés du journal de bien-être émotionnel */}
                    </div>
                  ))}
                </div>
              )}
              {dashboardData.lifestyleEntries.length > 0&& (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Modes de vie</h3>
                  {dashboardData.lifestyleEntries.map((entry) => (
                    <div key={entry._id} className="mb-4">
                      <p className="text-gray-700">
                        Sommeil (heures): {entry.sleepHours}
                      </p>
                      {/* Ajoutez d'autres éléments en fonction des propriétés du mode de vie */}
                    </div>
                  ))}
                </div>
              )}
              {dashboardData.skillsEntries.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Compétences</h3>
                  {dashboardData.skillsEntries.map((entry) => (
                    <div key={entry._id} className="mb-4">
                      <p className="text-gray-700">
                        Nom de la compétence: {entry.skillName}
                      </p>
                      {/* Ajoutez d'autres éléments en fonction des propriétés de la compétence */}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Dashboard;
