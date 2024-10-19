import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from 'framer-motion';

const Recettes = () => {
  const [recettes, setRecettes] = useState([]);
  const [recetteForm, setRecetteForm] = useState({
    nom: "",
    instructions: "",
    difficulte: "",
    temps_preparation: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleBook = () => setIsOpen(!isOpen);

  useEffect(() => {
    // Récupérer les recettes du backend
    axios
      .get("http://localhost:3001/recettes")
      .then((response) => {
        console.log("Recettes récupérées:", response.data); // Log des recettes récupérées
        setRecettes(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des recettes:", error);
        alert(
          "Erreur lors de la récupération des recettes. Vérifiez que le backend est opérationnel."
        );
      });
  }, []);

  const handleChange = (e) => {
    setRecetteForm({ ...recetteForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Mettre à jour une recette existante
      axios
        .put(`http://localhost:3001/recettes/${editId}`, recetteForm)
        .then(() => {
          setRecettes(
            recettes.map((recette) =>
              recette.id === editId ? { ...recette, ...recetteForm } : recette
            )
          );
          setIsEditing(false);
          setEditId(null);
          setRecetteForm({
            nom: "",
            ingredients: "",
            instructions: "",
            difficulte: "",
            temps_preparation: "",
          });
          alert("Recette mise à jour avec succès");
        })
        .catch((error) =>
          console.error("Erreur lors de la mise à jour de la recette", error)
        );
    } else {
      // Ajouter une nouvelle recette
      axios
        .post("http://localhost:3001/recettes", recetteForm)
        .then((response) => {
          setRecettes([...recettes, response.data]);
          alert("Recette ajoutée avec succès");
        })
        .catch((error) =>
          console.error("Erreur lors de l'ajout de la recette", error)
        );
    }
  };

  const handleEdit = (id) => {
    const recette = recettes.find((recette) => recette.id === id);
    setRecetteForm(recette);
    setIsEditing(true);
    setEditId(id);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/recettes/${id}`)
      .then(() => {
        setRecettes(recettes.filter((recette) => recette.id !== id));
        alert("Recette supprimée avec succès");
      })
      .catch((error) =>
        console.error("Erreur lors de la suppression de la recette", error)
      );
  };

  const handleRecetteAjoute = (nouvelleRecette) => {
    setRecettes([...recettes, nouvelleRecette]); // Met à jour la liste des recettes
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-amber-50 min-h-screen">
      <h1 className="text-4xl font-cursive text-amber-800 text-center mb-12">
        Mon Livre de Recettes
      </h1>

      <div className="bg-white shadow-2xl rounded-lg overflow-hidden border-4 border-amber-200">
        <div className="bg-amber-100 p-6">
          <h2 className="text-2xl font-serif text-amber-800 mb-4">
            Ajouter une Nouvelle Recette
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label
                htmlFor="nom"
                className="text-amber-700 font-semibold mb-1"
              >
                Nom de la Recette :
              </label>
              <input
                id="nom"
                name="nom"
                type="text"
                value={recetteForm.nom}
                onChange={handleChange}
                className="border-b-2 border-amber-200 p-2 bg-transparent focus:outline-none focus:border-amber-500"
                placeholder="Ex: Tarte aux Pommes de Grand-Mère"
                required
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="instructions"
                className="text-amber-700 font-semibold mb-1"
              >
                Instructions :
              </label>
              <textarea
                id="instructions"
                name="instructions"
                value={recetteForm.instructions}
                onChange={handleChange}
                className="border-2 border-amber-200 rounded p-2 bg-transparent focus:outline-none focus:border-amber-500"
                placeholder="Étapes de préparation..."
                rows="4"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor="difficulte"
                  className="text-amber-700 font-semibold mb-1"
                >
                  Difficulté :
                </label>
                <select
                  id="difficulte"
                  name="difficulte"
                  value={recetteForm.difficulte}
                  onChange={handleChange}
                  className="border-b-2 border-amber-200 p-2 bg-transparent focus:outline-none focus:border-amber-500"
                  required
                >
                  <option value="">Choisir...</option>
                  <option value="Facile">Facile</option>
                  <option value="Moyen">Moyen</option>
                  <option value="Difficile">Difficile</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="temps_preparation"
                  className="text-amber-700 font-semibold mb-1"
                >
                  Temps (min) :
                </label>
                <input
                  id="temps_preparation"
                  name="temps_preparation"
                  type="number"
                  value={recetteForm.temps_preparation}
                  onChange={handleChange}
                  className="border-b-2 border-amber-200 p-2 bg-transparent focus:outline-none focus:border-amber-500"
                  placeholder="60"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="ingredients"
                className="text-amber-700 font-semibold mb-1"
              >
                Ingrédients :
              </label>
              <input
                id="ingredients"
                name="ingredients"
                type="text"
                value={recetteForm.ingredients}
                onChange={handleChange}
                className="border-b-2 border-amber-200 p-2 bg-transparent focus:outline-none focus:border-amber-500"
                placeholder="Farine, sucre, beurre..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 text-white font-semibold py-2 rounded-lg hover:bg-amber-600 transition duration-300 transform hover:scale-105"
            >
              {isEditing ? "Mettre à jour" : "Ajouter au Livre"}
            </button>
          </form>
        </div>

        <div>
      <button
        onClick={toggleBook}
        className="w-full bg-amber-700 text-white py-4 rounded-t-lg font-serif text-2xl hover:bg-amber-800 transition-colors duration-300"
      >
        {isOpen ? "Fermer le Livre de Recettes" : "Ouvrir le Livre de Recettes"}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="bg-amber-100 rounded-b-lg shadow-2xl overflow-hidden"
          >
            <motion.div
              initial={{ rotateX: -90 }}
              animate={{ rotateX: 0 }}
              exit={{ rotateX: 90 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="origin-top"
            >
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                <h2 className="text-3xl font-cursive text-amber-800 mb-6 text-center">
                  Mes Recettes Précieuses
                </h2>
                {recettes.length > 0 ? (
                  <div className="space-y-8">
                    {recettes.map((recette) => (
                      <motion.div
                        key={recette.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white p-6 rounded-lg shadow-md border-2 border-amber-200"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-2xl font-cursive text-amber-800">
                            {recette.nom}
                          </h3>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(recette.id)}
                              className="text-amber-600 hover:text-amber-800 transition-colors"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => handleDelete(recette.id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                        <p className="text-amber-700 mb-2">
                          <span className="font-semibold">Difficulté :</span> {recette.difficulte} |
                          <span className="font-semibold"> Temps :</span> {recette.temps_preparation} min
                        </p>
                        <p className="text-amber-700 mb-2">
                          <span className="font-semibold">Ingrédients :</span> {recette.ingredients}
                        </p>
                        <details className="mt-4">
                          <summary className="cursor-pointer text-amber-600 hover:text-amber-800 font-semibold">
                            Instructions
                          </summary>
                          <p className="mt-2 text-amber-700 pl-4 border-l-2 border-amber-300">
                            {recette.instructions}
                          </p>
                        </details>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-amber-600 italic">
                    Votre livre de recettes est vide pour le moment.
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
      </div>
    </div>
  );
};

export default Recettes;
