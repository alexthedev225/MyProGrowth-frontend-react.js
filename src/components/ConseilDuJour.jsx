import { useState, useEffect } from "react";

const ConseilDuJour = () => {
  const [conseil, setConseil] = useState("");

  useEffect(() => {
    const fetchConseilDuJour = async () => {
      try {
      
        const response = await fetch(
          "https://myprogrowth.onrender.com/api/conseils/aleatoire"
        );
        if (!response.ok) {
          throw new Error("Échec de la récupération du conseil du jour");
        }
        const data = await response.json();
        setConseil(data.conseil);
      } catch (error) {
        console.error(error);
      }
    };

    fetchConseilDuJour();
  }, []);

  return (
    <div className="mb-8">
      <h2 className="font-bold text-xl mb-4 text-pink-500">Conseil du Jour</h2>
      <p className="text-lg">{conseil}</p>
    </div>
  );
};

export default ConseilDuJour;
