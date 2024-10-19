import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrouverRecette = () => {
  const [recettesDisponibles, setRecettesDisponibles] = useState([]);
  const [loading, setLoading] = useState(false);

  const chercherRecettes = () => {
    setLoading(true);
    axios
      .get('http://localhost:3001/recettes_disponibles')
      .then((response) => {
        setRecettesDisponibles(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des recettes disponibles:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    chercherRecettes();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl shadow-lg">
  <h2 className="text-3xl font-bold mb-6 text-center text-purple-800">
    🧙‍♂️ Recettes Magiques Disponibles 🍽️
  </h2>
  
  <button
    onClick={chercherRecettes}
    className="w-full mb-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-full hover:from-purple-600 hover:to-pink-600 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
  >
    🔮 Découvrir les Recettes Magiques
  </button>

  {loading ? (
    <div className="text-center">
      <p className="text-xl text-purple-700">✨ Préparation des ingrédients magiques... ✨</p>
      <div className="mt-4 animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
    </div>
  ) : recettesDisponibles.length > 0 ? (
    <ul className="space-y-6">
      {recettesDisponibles.map((recette, index) => (
        <li
          key={index}
          className="bg-white shadow-lg p-6 rounded-xl hover:shadow-xl transition duration-300"
        >
          <h3 className="text-2xl font-bold text-purple-700 mb-3">🍳 {recette.nom}</h3>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">🥕 Ingrédients :</span> {recette.ingredients}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">📝 Instructions :</span> {recette.instructions}
          </p>
          <div className="flex justify-between items-center mt-4">
            <p className="text-purple-600">
              <span className="font-semibold">🏆 Difficulté :</span> {recette.difficulte}
            </p>
            <p className="text-pink-600">
              <span className="font-semibold">⏱️ Temps :</span> {recette.temps_preparation} minutes
            </p>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <div className="text-center bg-white p-8 rounded-xl shadow-inner">
      <p className="text-xl text-gray-600">🔍 Oups ! Aucune recette magique disponible pour le moment.</p>
      <p className="mt-2 text-gray-500">Essayez d'ajouter plus d'ingrédients à votre chaudron ! 🧪</p>
    </div>
  )}
</div>
  );
};

export default TrouverRecette;
