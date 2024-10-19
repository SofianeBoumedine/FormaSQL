Voici la partie post-installation en français pour ton **README** :

---

## Post-installation de MySQL

### **Étape 1 : Démarrage de MySQL**

Pour démarrer MySQL et le configurer pour qu'il se lance automatiquement à chaque démarrage de votre système :

- **Démarrer MySQL en tant que service :**

  ```bash
  brew services start mysql
  ```

- **Ou démarrer MySQL manuellement (sans service en arrière-plan) :**

  ```bash
  /opt/homebrew/opt/mysql/bin/mysqld_safe --datadir=/opt/homebrew/var/mysql
  ```

### **Étape 2 : Sécuriser l'installation MySQL**

Exécute la commande suivante pour sécuriser ton installation MySQL et configurer un mot de passe root, ainsi que d'autres paramètres de sécurité :

```bash
mysql_secure_installation
```

Pendant cette configuration, vous serez guidé à travers plusieurs étapes :

- **Configurer le composant de validation des mots de passe** :
  Tapez `y` pour activer ce composant. Cela vous aidera à définir des mots de passe sécurisés.

- **Sélectionner le niveau de validation des mots de passe** :
  - `0 = Faible` (Longueur >= 8 caractères)
  - `1 = Moyen` (Longueur >= 8 caractères avec chiffres, majuscules et minuscules)
  - `2 = Fort` (Longueur >= 8 caractères avec chiffres, majuscules, minuscules, et caractères spéciaux)

  Sélectionnez `0` si vous souhaitez un mot de passe simple.

- **Définir un mot de passe pour l'utilisateur root** : Entrez le mot de passe que vous souhaitez utiliser pour l'utilisateur `root`.

- **Supprimer les utilisateurs anonymes** :
  Tapez `y` pour supprimer les utilisateurs anonymes afin de sécuriser la base de données.

- **Désactiver la connexion root à distance** :
  Tapez `n` si vous souhaitez permettre à l'utilisateur `root` de se connecter uniquement depuis `localhost`.

- **Supprimer la base de données de test** :
  Tapez `y` pour supprimer la base de données de test et empêcher son accès non autorisé.

- **Recharger les tables de privilèges** :
  Tapez `y` pour appliquer immédiatement les changements de privilèges.

---

### **Étape 3 : Connexion à MySQL**

Après avoir sécurisé l'installation, connectez-vous à MySQL en utilisant l'utilisateur root :

```bash
mysql -u root -p
```

Entrez le mot de passe root que vous avez configuré lors de l'installation sécurisée.



Voici la section dédiée aux scripts SQL à exécuter pour configurer la base de données de ton projet **Frigo & Recettes** après l'installation de MySQL.

---

## Scripts SQL pour la configuration de la base de données

### **Étape 1 : Créer la base de données**

Connecte-toi à MySQL en tant qu'utilisateur root et crée la base de données pour le projet :

```bash
mysql -u root -p
```

Ensuite, exécute la commande suivante pour créer la base de données **`frigo_recettes`** :

```sql
CREATE DATABASE frigo_recettes;
```

### **Étape 2 : Utiliser la base de données**

Une fois la base de données créée, utilise-la avec la commande suivante :

```sql
USE frigo_recettes;
```

### **Étape 3 : Créer la table des produits**

Exécute le script suivant pour créer la table **`produits`** :

```sql
CREATE TABLE produits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    quantite INT NOT NULL,
    date_expiration DATE,
    categorie VARCHAR(50)
);
```

### **Étape 4 : Créer la table des recettes**

Exécute ce script pour créer la table **`recettes`** :

```sql
CREATE TABLE recettes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    instructions TEXT NOT NULL,
    difficulte VARCHAR(50) NOT NULL,
    temps_preparation INT NOT NULL
);
```

### **Étape 5 : Vérifier les tables**

Tu peux vérifier que les tables ont été créées correctement en listant les tables dans la base de données **`frigo_recettes`** avec la commande :

```sql
SHOW TABLES;
```

---

### Résumé des étapes à suivre :

1. **Démarrer MySQL** et se connecter avec l'utilisateur root :
   ```bash
   mysql -u root -p
   ```

2. **Créer la base de données** et **utiliser** cette base :
   ```sql
   CREATE DATABASE frigo_recettes;
   USE frigo_recettes;
   ```

3. **Exécuter les scripts pour créer les tables `produits` et `recettes`**.

4. **Vérifier que les tables ont été créées** avec la commande `SHOW TABLES;`.

---

Ces étapes te permettront de configurer correctement la base de données MySQL pour ton projet **Frigo & Recettes**. Une fois les tables créées, tu pourras ajouter des produits et des recettes à partir de ton application.