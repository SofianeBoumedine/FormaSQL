import React, { useState } from 'react';
import axios from 'axios';

const AjoutIngredientsBulk = () => {
  const [bulkData, setBulkData] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const handleChange = (e) => {
    setBulkData(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let ingredientsData;

    try {
      ingredientsData = JSON.parse(bulkData); // Essaye de parser le JSON
    } catch (error) {
      alert('Erreur de format JSON');
      return;
    }

    setIngredients(ingredientsData); // Affiche les ingrédients pour vérifier avant soumission
  };

  const handleBulkSubmit = () => {
    axios
      .post('http://localhost:3001/ingredients/bulk', ingredients)
      .then((response) => {
        alert(`${response.data.affectedRows} ingrédients ajoutés avec succès`);
      })
      .catch((error) =>
        console.error('Erreur lors de l\'ajout en bulk des ingrédients:', error)
      );
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Ajouter des Ingrédients en Bulk</h2>
    
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <textarea
          value={bulkData}
          onChange={handleChange}
          rows="10"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
          placeholder={`[
    {
      "nom": "Pomme",
      "quantite": 10,
      "date_expiration": "2024-12-31",
      "categorie": "Fruits"
    },
    {
      "nom": "Carotte",
      "quantite": 5,
      "date_expiration": "2024-11-15",
      "categorie": "Légumes"
    }
  ]`}
        />
        <span className="absolute top-2 right-2 text-xs text-gray-400">Format JSON</span>
      </div>
      
      <button 
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
      >
        Vérifier les Ingrédients
      </button>
    </form>
  
    {ingredients.length > 0 && (
      <div className="mt-8 space-y-4">
        <h3 className="text-xl font-semibold text-gray-700">Ingrédients à soumettre :</h3>
        <ul className="space-y-4">
          {ingredients.map((ingredient, index) => (
            <li key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-800">{ingredient.nom}</span>
                <span className="text-sm px-2 py-1 bg-green-100 text-green-800 rounded-full">
                  {ingredient.categorie}
                </span>
              </div>
              <div className="mt-2 text-gray-600">
                <span className="font-semibold">Quantité:</span> {ingredient.quantite} unités
              </div>
              <div className="text-gray-600">
                <span className="font-semibold">Expire le:</span> {ingredient.date_expiration}
              </div>
            </li>
          ))}
        </ul>
  
        <button 
          onClick={handleBulkSubmit}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg mt-4"
        >
          Soumettre les Ingrédients en Bulk
        </button>
      </div>
    )}
  </div>
  );
};

export default AjoutIngredientsBulk;
