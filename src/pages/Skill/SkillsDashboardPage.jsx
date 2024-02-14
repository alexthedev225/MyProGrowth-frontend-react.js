import { useState } from "react";
import UserSkills from "../../components/Skill/UserSkills";
import SkillForm from "../../components/Skill/SkillForm";
import UpdateSkill from "../../components/Skill/UpdateSkill";
import Cookies from "js-cookie";

const SkillsDashboardPage = () => {
  const [selectedSkillId, setSelectedSkillId] = useState(null);

  const handleUpdateSkillClick = (skillId) => {
    setSelectedSkillId(skillId);
  };

  const handleCancelUpdate = () => {
    setSelectedSkillId(null);
  };
  const isConnected = Cookies.get("token");

  return (
    <div className="container mx-auto mt-8 p-4">
      {isConnected ? (
        <>
          <h1 className="text-3xl font-bold mb-8">
            Tableau de bord des compétences
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-4">Mes compétences</h2>
              <UserSkills onSkillUpdateClick={handleUpdateSkillClick} />
              <>
                {selectedSkillId && (
                  <div className="bg-white p-6 rounded-md shadow-md mt-4">
                    <h2 className="text-xl font-semibold mb-4">
                      Mise à jour de Compétence
                    </h2>
                    <UpdateSkill
                      skillId={selectedSkillId}
                      onCancel={handleCancelUpdate}
                    />
                  </div>
                )}
              </>
            </div>

            <div
              className="bg-white p-6 rounded-md shadow-md h-[max-content]"
              
            >
              <h2 className="text-xl font-semibold ">
                Ajouter une compétence
              </h2>
              <SkillForm />
            </div>
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
            Veuillez vous connecter pour accéder au tableau de bord des
            compétences.
          </span>
        </div>
      )}

      {/* Afficher le formulaire de mise à jour si selectedSkillId est défini */}
    </div>
  );
};

export default SkillsDashboardPage;
