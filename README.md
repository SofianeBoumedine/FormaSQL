# FormaSQL

## Prérequis : installer sql sur windows / macos
## Crée son utilisateur et sa db :

### Instructions pour lancer un serveur MySQL sur macOS et Windows

---

## **Sur macOS**

### **Étape 1 : Installer MySQL avec Homebrew**

Si Homebrew n’est pas déjà installé sur ton système, tu peux l’installer avec la commande suivante dans le terminal :
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Ensuite, installe MySQL en utilisant Homebrew :
```bash
brew install mysql
```

### **Étape 2 : Démarrer le serveur MySQL**

Une fois MySQL installé, démarre le serveur MySQL avec cette commande :
```bash
brew services start mysql
```

Cela démarre le serveur MySQL en tant que service et il sera disponible à chaque redémarrage.

### **Étape 3 : Configurer MySQL (mot de passe root)**

Une fois MySQL installé et démarré, configure un mot de passe pour l'utilisateur root. Ouvre le terminal et exécute cette commande pour démarrer MySQL en tant qu’utilisateur root :
```bash
mysql_secure_installation
```

Tu seras guidé à travers une série d'options pour configurer MySQL, notamment :
- Définir un mot de passe pour l'utilisateur root.
- Configurer certaines sécurités supplémentaires (comme la suppression des utilisateurs anonymes, désactivation des connexions root distantes, etc.).

### **Étape 4 : Accéder à MySQL**

Une fois la configuration terminée, tu peux accéder à MySQL avec cette commande :
```bash
mysql -u root -p
```

Tu seras invité à entrer le mot de passe que tu as défini lors de la configuration.

### **Étape 5 : Arrêter MySQL (facultatif)**

Si tu veux arrêter le serveur MySQL, exécute :
```bash
brew services stop mysql
```

---

## **Sur Windows**

### **Étape 1 : Télécharger MySQL**

1. Télécharge MySQL depuis le site officiel [MySQL Community Server](https://dev.mysql.com/downloads/mysql/).
2. Sélectionne la version Windows de MySQL Community Server, et télécharge l'installateur **MySQL Installer**.

### **Étape 2 : Installer MySQL**

1. Lance l’installateur MySQL que tu viens de télécharger.
2. Suis les étapes d'installation et choisis une configuration "Server only" si tu souhaites uniquement installer MySQL.
3. Lorsque tu configures MySQL, tu seras invité à définir un mot de passe pour l’utilisateur root. Note-le bien car tu en auras besoin pour te connecter au serveur MySQL.

### **Étape 3 : Démarrer le serveur MySQL**

1. MySQL sera configuré pour démarrer en tant que **service** Windows, donc il démarrera automatiquement après l'installation.
2. Tu peux vérifier que le service MySQL est bien démarré en ouvrant le **Panneau de Configuration des Services** (tape `services.msc` dans la barre de recherche Windows) et en cherchant **MySQL** dans la liste des services.

### **Étape 4 : Accéder à MySQL**

1. Ouvre **MySQL Workbench**, qui est fourni avec l'installation de MySQL (ou utilise un autre client comme **phpMyAdmin**).
2. Si tu préfères utiliser la ligne de commande, ouvre l'invite de commande (`cmd`) et exécute :
   ```bash
   mysql -u root -p
   ```
   Ensuite, entre le mot de passe root que tu as défini lors de l'installation.

### **Étape 5 : Arrêter MySQL (facultatif)**

Si tu veux arrêter le service MySQL manuellement, tu peux aller dans le **Panneau de Configuration des Services** (via `services.msc`), trouver le service **MySQL**, faire un clic droit, puis sélectionner **Arrêter**.

---

### **Résumé des Commandes Utiles**

#### **Sur macOS :**
- **Démarrer MySQL** : 
  ```bash
  brew services start mysql
  ```
- **Arrêter MySQL** : 
  ```bash
  brew services stop mysql
  ```
- **Accéder à MySQL** :
  ```bash
  mysql -u root -p
  ```

#### **Sur Windows :**
- **Démarrer MySQL** : Le service démarre automatiquement après installation.
- **Arrêter MySQL** : Via le **Panneau de Configuration des Services** (`services.msc`).
- **Accéder à MySQL** :
  ```bash
  mysql -u root -p
  ```

---

Avec ces instructions, tu devrais pouvoir installer et démarrer un serveur MySQL sur macOS ou Windows, prêt à être utilisé avec ton projet **Frigo & Recettes**.