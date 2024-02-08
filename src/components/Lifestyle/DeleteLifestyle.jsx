// DeleteLifestyle.js
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const DeleteLifestyle = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = Cookies.get("userId"); // Assurez-vous que la clé du cookie est correcte
  const authToken = Cookies.get("token"); // Remplace cela par la vraie logique pour obtenir le token
  useEffect(() => {
    // Supprimer le mode de vie de l'utilisateur lors du montage du composant
    const deleteLifestyle = async () => {
      try {
        const response = await fetch(
          `https://myprogrowth.onrender.com/api/lifestyle/${userId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
              // Ajoutez d'autres en-têtes nécessaires, par exemple, le token d'autorisation
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            "Échec de la suppression du mode de vie de l'utilisateur"
          );
        }
      } catch (error) {
        console.error(
          "Erreur lors de la suppression du mode de vie de l'utilisateur:",
          error
        );
        setError(
          "Une erreur s'est produite lors de la suppression du mode de vie de l'utilisateur."
        );
      } finally {
        setLoading(false);
      }
    };

    deleteLifestyle();
  }, [userId, authToken]);

  return (
    <div>
      <h2>Supprimer le mode de vie</h2>
      {loading && <p>Suppression en cours...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default DeleteLifestyle;
