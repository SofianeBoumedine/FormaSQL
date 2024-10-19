import React, { useState } from "react";
import axios from "axios";

const AjoutRecettesBulk = () => {
  const [bulkData, setBulkData] = useState("");
  const [recettes, setRecettes] = useState([]);

  const handleChange = (e) => {
    setBulkData(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let recettesData;

    try {
      recettesData = JSON.parse(bulkData); // Essaye de parser le JSON
    } catch (error) {
      alert("Erreur de format JSON");
      return;
    }

    // Vérifie que chaque recette a bien les ingrédients
    const valid = recettesData.every(
      (recette) => recette.nom && recette.ingredients && recette.instructions
    );
    if (!valid) {
      alert(
        "Certaines recettes sont incomplètes. Assurez-vous que chaque recette contient un nom, des ingrédients et des instructions."
      );
      return;
    }

    setRecettes(recettesData); // Affiche les recettes pour vérifier avant soumission
  };

  const handleBulkSubmit = () => {
    axios
      .post("http://localhost:3001/recettes/bulk", recettes)
      .then((response) => {
        alert(`${response.data.affectedRows} recettes ajoutées avec succès`);
      })
      .catch((error) =>
        console.error("Erreur lors de l'ajout en bulk des recettes:", error)
      );
  };
  

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto">
  <h2 className="text-2xl font-bold text-gray-800 mb-6">Ajouter des Recettes en Bulk</h2>
  
  <form onSubmit={handleSubmit} className="space-y-4">
    <div className="relative">
      <textarea
        value={bulkData}
        onChange={handleChange}
        rows="10"
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        placeholder={`[
  {
    "nom": "Tarte aux poireaux",
    "ingredients": "poireaux, crème, pâte brisée",
    "instructions": "Étalez une pâte, faites revenir des poireaux, et cuisez au four.",
    "difficulte": "moyen",
    "temps_preparation": 45
  },
  {
    "nom": "Spaghetti à l'ail",
    "ingredients": "spaghettis, ail, huile d'olive",
    "instructions": "Faites cuire des spaghettis et mélangez avec de l'ail et de l'huile.",
    "difficulte": "facile",
    "temps_preparation": 20
  }
]`}
      />
      <span className="absolute top-2 right-2 text-xs text-gray-400">Format JSON</span>
    </div>
    
    <button 
      type="submit"
      className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
    >
      Vérifier Recettes
    </button>
  </form>

  {recettes.length > 0 && (
    <div className="mt-8 space-y-4">
      <h3 className="text-xl font-semibold text-gray-700">Recettes à soumettre :</h3>
      <ul className="space-y-4">
        {recettes.map((recette, index) => (
          <li key={index} className="bg-gray-50 p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-medium text-gray-800">{recette.nom}</span>
              <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                {recette.difficulte}
              </span>
            </div>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Temps de préparation:</span> {recette.temps_preparation} minutes
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Ingrédients:</span> {recette.ingredients}
            </p>
          </li>
        ))}
      </ul>

      <button 
        onClick={handleBulkSubmit}
        className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg mt-4"
      >
        Soumettre en Bulk
      </button>
    </div>
  )}
</div>
  );
};

export default AjoutRecettesBulk;
