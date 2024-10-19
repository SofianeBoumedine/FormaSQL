Voici un **README** en français avec des instructions détaillées pour relancer le serveur SQL, le frontend, et le backend.

---

# Guide de redémarrage du projet Frigo & Recettes

## 1. Relancer le serveur MySQL

Si MySQL est installé via Homebrew, tu peux relancer le serveur MySQL de deux manières : en tant que service ou en mode manuel.

### Démarrer MySQL en tant que service :
Cette commande démarre MySQL et le configure pour qu'il se relance automatiquement à chaque démarrage de la machine.

```bash
brew services start mysql
```

### Démarrer MySQL manuellement (sans service en arrière-plan) :
Si tu préfères lancer MySQL manuellement, utilise cette commande :

```bash
/opt/homebrew/opt/mysql/bin/mysqld_safe --datadir=/opt/homebrew/var/mysql
```

### Se connecter à MySQL :
Une fois MySQL démarré, connecte-toi en utilisant la commande suivante :

```bash
mysql -u root -p
```

Saisis le mot de passe root lorsque demandé.

### Vérifier la base de données :
Pour t'assurer que la base de données **frigo_recettes** est bien en place, exécute cette commande une fois connecté à MySQL :

```sql
USE frigo_recettes;
SHOW TABLES;
```

Cela affichera toutes les tables dans la base de données.

---

## 2. Relancer le Backend (Serveur Express)

### 1. Aller dans le répertoire du backend :
Navigue dans le répertoire du backend dans ton terminal :

```bash
cd /path/to/your/backend
```

### 2. Démarrer le serveur backend :
Utilise la commande suivante pour démarrer le serveur Node.js :

```bash
node server.js
```

Tu devrais voir un message similaire à :
```bash
Serveur backend sur le port 3001
```

Cela indique que le serveur backend est bien démarré et écoute sur le port 3001.

---

## 3. Relancer le Frontend (Vite + React)

### 1. Aller dans le répertoire du frontend :
Navigue dans le répertoire de ton projet React :

```bash
cd /path/to/your/frontend
```

### 2. Démarrer le serveur frontend (Vite.js) :
Lance le serveur de développement Vite.js avec la commande suivante :

```bash
npm run dev
```

Tu verras un message te donnant l'URL sur laquelle le frontend est accessible, généralement quelque chose comme :

```bash
VITE v3.x  ready in 300 ms
➜  Local:   http://localhost:5173/
```

Ouvre cette URL dans ton navigateur pour accéder à l'interface de l'application.

---

### Résumé des commandes :

1. **Démarrer MySQL** :
   ```bash
   brew services start mysql
   ```
   Ou en manuel :
   ```bash
   /opt/homebrew/opt/mysql/bin/mysqld_safe --datadir=/opt/homebrew/var/mysql
   ```

2. **Démarrer le backend** :
   ```bash
   cd /path/to/your/backend
   node server.js
   ```

3. **Démarrer le frontend** :
   ```bash
   cd /path/to/your/frontend
   npm run dev
   ```

---

Avec ces étapes, tu devrais être capable de relancer le serveur SQL, le backend Express, et le frontend React sans problème. Si tu rencontres des erreurs ou des difficultés, assure-toi que les processus sont bien démarrés et que les ports ne sont pas bloqués.