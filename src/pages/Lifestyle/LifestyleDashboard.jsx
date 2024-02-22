import { useState, useEffect } from "react";
import CreateLifestyle from "../../components/Lifestyle/CreateLifestyle";
import UpdateLifestyle from "../../components/Lifestyle/UpdateLifestyle";
import UserLifestyle from "../../components/Lifestyle/Lifestyle";
import Cookies from "js-cookie";

const LifestyleDashboardPage = () => {
  const [selectedLifestyleId, setSelectedLifestyleId] = useState(null);
  const [hasLifestyle, setHasLifestyle] = useState(false); // Ajout d'un état pour vérifier si l'utilisateur a déjà un mode de vie
  const [loading, setLoading] = useState(true); // Ajout d'un état pour contrôler le chargement initial des données du mode de vie

  const handleUpdateLifestyleClick = (lifestyleId) => {
    setSelectedLifestyleId(lifestyleId);
  };

  const handleCancelUpdate = () => {
    setSelectedLifestyleId(null);
  };

  const handleHasLifestyle = (value) => {
    setHasLifestyle(value);
  };

  const isConnected = Cookies.get("token");

  useEffect(() => {
    const checkUserLifestyle = async () => {
      try {
        const userId = Cookies.get("userId");
        const authToken = Cookies.get("token");

        const response = await fetch(
          `https://myprogrowth.onrender.com/api/lifestyle/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            "Échec de la récupération du mode de vie de l'utilisateur"
          );
        }

        const data = await response.json();

        if (data && Object.keys(data).length > 0) {
          setHasLifestyle(true);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du mode de vie de l'utilisateur:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    if (isConnected) {
      checkUserLifestyle();
    }
  }, [isConnected]);

  return (
    <div className="container mx-auto p-4">
      {isConnected ? (
        <>
          <h1 className="text-3xl font-bold mb-8">
            Tableau de bord du mode de vie
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-md shadow-md min-h-[325px]">
              <h2 className="text-xl font-semibold mb-4">Mon mode de vie</h2>
              <UserLifestyle
                onLifestyleUpdateClick={handleUpdateLifestyleClick}
                onHasLifestyle={handleHasLifestyle}
              />
              {selectedLifestyleId && (
                <div className="bg-white rounded-md shadow-md mt-4 overflow-hidden h-[max-content]">
                  <UpdateLifestyle
                    lifestyleId={selectedLifestyleId}
                    onCancel={handleCancelUpdate}
                  />
                </div>
              )}
            </div>

            {/* Afficher le formulaire de création uniquement si l'utilisateur n'a pas de mode de vie */}
            {!loading && !hasLifestyle && (
              <div className="bg-white p-6 rounded-md shadow-md h-[max-content]">
                <CreateLifestyle />
              </div>
            )}
          </div>
        </>
      ) : (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Attention :</strong>
          <span className="block sm:inline">
            {" "}
            Veuillez vous connecter pour accéder au tableau de bord du mode de vie.
          </span>
        </div>
      )}
    </div>
  );
};

export default LifestyleDashboardPage;
