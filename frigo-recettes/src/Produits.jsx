import React, { useState, useEffect } from "react";
import axios from "axios";
import AjoutProduit from "./AjoutProduit";
import { motion, AnimatePresence } from 'framer-motion';

const Produits = () => {
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/produits")
      .then((response) => setProduits(response.data))
      .catch((error) => console.error("Erreur : ", error));
  }, []);

  const handleProduitAjoute = (nouveauProduit) => {
    setProduits([...produits, nouveauProduit]); // Met à jour la liste des produits
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/produits/${id}`)
      .then(() => {
        setProduits(produits.filter((produit) => produit.id !== id)); // Met à jour la liste après suppression
        alert("Produit supprimé avec succès");
      })
      .catch((error) =>
        console.error("Erreur lors de la suppression du produit", error)
      );
  };

  const incrementerProduit = (id, quantite) => {
    axios
      .put(`http://localhost:3001/produits/${id}`, { quantite: quantite + 1 })
      .then(() => {
        setProduits(
          produits.map((produit) =>
            produit.id === id ? { ...produit, quantite: quantite + 1 } : produit
          )
        );
      })
      .catch((error) =>
        console.error("Erreur lors de l'incrémentation du produit", error)
      );
  };

  const decrementerProduit = (id, quantite) => {
    if (quantite > 0) {
      axios
        .put(`http://localhost:3001/produits/${id}`, { quantite: quantite - 1 })
        .then(() => {
          setProduits(
            produits.map((produit) =>
              produit.id === id
                ? { ...produit, quantite: quantite - 1 }
                : produit
            )
          );
        })
        .catch((error) =>
          console.error("Erreur lors de la décrémentation du produit", error)
        );
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleFrigo = () => setIsOpen(!isOpen);


  return (
    <div>
      <AjoutProduit onProduitAjoute={handleProduitAjoute} />

      <div className="mt-12 max-w-4xl mx-auto">
      <motion.div
        className="bg-gray-200 rounded-lg shadow-xl overflow-hidden"
        initial={false}
        animate={{ height: isOpen ? 'auto' : '80px' }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <button
          onClick={toggleFrigo}
          className="w-full bg-blue-500 text-white py-6 flex justify-between items-center px-8 focus:outline-none"
        >
          <span className="text-2xl font-bold">Mon Frigo</span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            ▼
          </motion.span>
        </button>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {produits.map((produit) => (
                  <motion.div
                    key={produit.id}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-blue-50 p-4 rounded-lg shadow-md border-2 border-blue-200"
                  >
                    <h3 className="text-xl font-bold text-blue-800 mb-2">{produit.nom}</h3>
                    <p className="text-blue-600 mb-1">
                      Quantité: {produit.quantite}
                    </p>
                    <p className="text-blue-600 mb-1">
                      Expire le: {formatDate(produit.date_expiration)}
                    </p>
                    <p className="text-blue-600 mb-3">
                      Catégorie: {produit.categorie}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="space-x-2">
                        <button
                          onClick={() => incrementerProduit(produit.id, produit.quantite)}
                          className="px-3 py-1 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
                        >
                          +
                        </button>
                        <button
                          onClick={() => decrementerProduit(produit.id, produit.quantite)}
                          className="px-3 py-1 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition"
                        >
                          -
                        </button>
                      </div>
                      <button
                        onClick={() => handleDelete(produit.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                      >
                        🗑️
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
              {produits.length === 0 && (
                <p className="text-center text-gray-500 mt-4">Votre frigo est vide !</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
    </div>
  );
};

export default Produits;
