import React from "react";
import axios from "axios";

const ViderFrigo = ({ setProduits }) => {
  const viderLeFrigo = () => {
    if (window.confirm("Êtes-vous sûr de vouloir vider le frigo ?")) {
      axios
        .delete("http://localhost:3001/produits/vider")
        .then(() => {
          setProduits([]); // Met à jour l'état pour afficher un frigo vide
          alert("Frigo vidé avec succès");
        })
        .catch((error) =>
          console.error("Erreur lors du vidage du frigo:", error)
        );
    }
  };

  return (
<div className="flex justify-end mb-8">
  <button
    onClick={viderLeFrigo}
    className="group relative bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-3 px-6 rounded-full hover:from-red-600 hover:to-pink-600 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 shadow-lg"
  >
    <span className="flex items-center">
      <span className="mr-2">🧹</span>
      Vider le frigo
      <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">💨</span>
    </span>
    <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-yellow-400 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full transform rotate-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      Pouf !
    </span>
  </button>
</div>
  );
};

export default ViderFrigo;
