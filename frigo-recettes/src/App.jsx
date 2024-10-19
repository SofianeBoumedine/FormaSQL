import React from "react";
import Produits from "./Produits";
import AjoutProduit from "./AjoutProduit";
import Recettes from "./Recettes"; // Ajout du composant Recettes
import AjoutRecettesBulk from "./AjoutRecettesBulk";
import ViderFrigo from "./ViderFrigo";
import './index.css'
import TrouverRecette from "./TrouverRecette";
import AjoutIngredientsBulk from "./AjoutIngredientsBulk";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-12 text-indigo-600 tracking-tight">
          Frigo & Recettes
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
            <Produits />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
            <Recettes />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
            <AjoutRecettesBulk />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
            <AjoutIngredientsBulk />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
            <ViderFrigo />
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Trouver ce que je peux cuisiner
            </h2>
            <TrouverRecette />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
