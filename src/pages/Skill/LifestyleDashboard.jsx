import { useState } from "react";
import CreateLifestyle from "../../components/Lifestyle/CreateLifestyle";
import UpdateLifestyle from "../../components/Lifestyle/UpdateLifestyle";
import UserLifestyle from "../../components/Lifestyle/Lifestyle";
import Cookies from "js-cookie";

const LifestyleDashboardPage = () => {
  const [selectedLifestyleId, setSelectedLifestyleId] = useState(null);
  const [hasLifestyle, setHasLifestyle] = useState(false); // Ajout d'un état pour vérifier si l'utilisateur a déjà un mode de vie

  const handleUpdateLifestyleClick = (lifestyleId) => {
    setSelectedLifestyleId(lifestyleId);
  };

  const handleCancelUpdate = () => {
    setSelectedLifestyleId(null);
  };

  // Fonction pour mettre à jour l'état hasLifestyle
  const handleHasLifestyle = (value) => {
    setHasLifestyle(value);
  };

  const isConnected = Cookies.get("token");

  return (
    <div className="container mx-auto mt-8 p-4">
      {isConnected ? (
        <>
          <h1 className="text-3xl font-bold mb-8">
            Tableau de bord du mode de vie
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-4">Mon mode de vie</h2>
              <UserLifestyle
                onLifestyleUpdateClick={handleUpdateLifestyleClick}
                onHasLifestyle={handleHasLifestyle} // Passez la fonction pour mettre à jour l'état hasLifestyle
              />
              {selectedLifestyleId && (
                <div className="bg-white rounded-md shadow-md mt-4 overflow-hidden">
                  <UpdateLifestyle
                    lifestyleId={selectedLifestyleId}
                    onCancel={handleCancelUpdate}
                  />
                </div>
              )}
            </div>

            {/* Vérifiez si l'utilisateur a déjà un mode de vie avant d'afficher le formulaire de création */}
            {!hasLifestyle && (
              <div className="bg-white p-6 rounded-md shadow-md">
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
