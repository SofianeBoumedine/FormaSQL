import React, { useState } from "react";
import axios from "axios";

const AjoutProduit = ({ onProduitAjoute }) => {
  const [produit, setProduit] = useState({
    nom: "",
    quantite: "",
    date_expiration: "",
    categorie: "",
  });

  const handleChange = (e) => {
    setProduit({ ...produit, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/produits", produit)
      .then((response) => {
        alert("Produit ajouté");
        onProduitAjoute(response.data); // Appelle la fonction de mise à jour après ajout
      })
      .catch((error) => console.error("Erreur : ", error));
  };

  return (
    <>
      <form
  onSubmit={handleSubmit}
  className="space-y-6 bg-white shadow-xl p-8 rounded-xl max-w-md mx-auto"
>
  <h2 className="text-2xl font-bold text-gray-800 mb-6">Ajouter un Produit</h2>
  
  <div className="space-y-4">
    <div>
      <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
        Nom du produit
      </label>
      <input
        id="nom"
        name="nom"
        type="text"
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Ex: Tomate"
        required
      />
    </div>

    <div>
      <label htmlFor="quantite" className="block text-sm font-medium text-gray-700 mb-1">
        Quantité
      </label>
      <input
        id="quantite"
        name="quantite"
        type="number"
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Ex: 5"
        required
      />
    </div>

    <div>
      <label htmlFor="date_expiration" className="block text-sm font-medium text-gray-700 mb-1">
        Date d'expiration
      </label>
      <input
        id="date_expiration"
        name="date_expiration"
        type="date"
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        required
      />
    </div>

    <div>
      <label htmlFor="categorie" className="block text-sm font-medium text-gray-700 mb-1">
        Catégorie
      </label>
      <input
        id="categorie"
        name="categorie"
        type="text"
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Ex: Légume"
        required
      />
    </div>
  </div>

  <button
    type="submit"
    className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
  >
    Ajouter le Produit
  </button>
</form>
    </>
  );
};

export default AjoutProduit;
