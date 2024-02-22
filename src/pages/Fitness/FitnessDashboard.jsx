import { useState } from "react";
import CreateFitnessEntry from "../../components/Fitness/CreateFitnessEntry";
import UsersFitness from "../../components/Fitness/UsersFitness";
import UpdateFitnessEntry from "../../components/Fitness/UpdateFitnessEntry";
import Cookies from "js-cookie";

const FitnessDashboardPage = () => {
  const [selectedFitnessId, setSelectedFitnessId] = useState(null);

  const handleUpdateFitnessClick = (fitnessId) => {
    setSelectedFitnessId(fitnessId);
  };

  const handleCancelUpdate = () => {
    setSelectedFitnessId(null);
  };
  const isConnected = Cookies.get("token");

  return (
    <div className="container mx-auto p-4">
      {isConnected ? (
        <>
          <h1 className="text-3xl font-bold mb-8 ">
            Tableau de bord de la condition physique
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-4">
                Mes entrées de condition physique
              </h2>
              <UsersFitness onFitnessUpdateClick={handleUpdateFitnessClick} />
              {selectedFitnessId && (
                <div className="rounded-md shadow-md mt-4 overflow-hidden ">
                  {/* Utilisez la couleur rose pour le fond de cette section */}
                  <UpdateFitnessEntry
                    fitnessId={selectedFitnessId}
                    onCancel={handleCancelUpdate}
                  />
                </div>
              )}
            </div>
            <CreateFitnessEntry className="mb-4" />
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
            Veuillez vous connecter pour accéder au tableau de bord de la
            condition physique.
          </span>
        </div>
      )}
    </div>
  );
};

export default FitnessDashboardPage;
