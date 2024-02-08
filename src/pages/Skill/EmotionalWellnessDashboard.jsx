import { useState } from "react";
import CreateEmotionalWellnessEntry from "../../components/CreateEmotionalWellnessEntry";
import UpdateEmotionalWellnessEntry from "../../components/UpdateEmotionalWellnessEntry";
import UsersEmotionalWellness from "../../components/UsersEmotionalWellness";
import Cookies from "js-cookie";

const EmotionalWellnessDashboardPage = () => {
  const [selectedEmotionalWellnessId, setSelectedEmotionalWellnessId] =
    useState(null);

  const handleUpdateEmotionalWellnessClick = (EmotionalWellnessId) => {
    setSelectedEmotionalWellnessId(EmotionalWellnessId);
  };

  const handleCancelUpdate = () => {
    setSelectedEmotionalWellnessId(null);
  };

  const isConnected = Cookies.get("token");

  return (
    <div className="container mx-auto mt-8 p-4">
      {isConnected ? ( <>
        <h1 className="text-3xl font-bold mb-8 text-pink-">
          Tableau de bord du bien-être émotionnel
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              Mes journaux de bien-être émotionnel
            </h2>
            <UsersEmotionalWellness
              onEmotionalWellnessUpdateClick={
                handleUpdateEmotionalWellnessClick
              }
            />
            {selectedEmotionalWellnessId && (
              <div className="bg-white rounded-md shadow-md mt-4 overflow-hidden">
                {/* Ajout de la classe overflow-hidden pour éviter le débordement */}
                <UpdateEmotionalWellnessEntry
                  emotionalWellnessId={selectedEmotionalWellnessId}
                  onCancel={handleCancelUpdate}
                />
              </div>
            )}
          </div>
          <div className="bg-white rounded-md">
            <CreateEmotionalWellnessEntry />
          </div>
        </div>
      </>) : (<div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Attention :</strong>
          <span className="block sm:inline">
            {" "}
            Veuillez vous connecter pour accéder au tableau de bord du bien-être émotionnel.
          </span>
        </div>)}
     
    </div>
  );
};

export default EmotionalWellnessDashboardPage;
