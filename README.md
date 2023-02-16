
# OPENCLASSROOMS -- PARCOURS DEVELOPPEUR WEB -- PROJET 7 Groupomania -- PIERRE COURTEILLE

## Présentation du projet

> Le projet consiste à construire un réseau social interne pour les employés de Groupomania.
> Le but de cet outil est de faciliter les interactions entre collègues.
> Le département RH de Groupomania a imaginé plusieurs fonctionnalités pour favoriser les échanges entre collègues.

D'après ce brief, créer une application *from scratch*, de l'intégration HTML/CSS au frontend (avec framework) en passant par le backend, l'API et la base de données.

*Build a social network for internal comunication within the fictional Groupomania company. Start from scratch and cover every aspect, from HTML/CSS integration to the frontend features, including backend, API comunications and database*

### Stack choisi

- Backend : Express, Node.js
- Frontend : JavaScript, Vue.js
- Intégration : HTML/CSS, Sass
- Base de données : MongoDB (NoSQL)

## Instructions

*For English instructions, see below*

### COMMENT INSTALLER

- Clonez ce repository localement
- Dans le dossier backend, créez un fichier .env
- Ajoutez-y les lignes suivantes :
    MONGO_URI = ''
    SIGN = ''
- Entre les apostrophes à la ligne MONGO_URI, copiez les informations de connexion à votre base de données MongoDB
- Entre les apostrophes à la ligne SIGN, créez une signature complexe pour le JSON Web Token (une chaîne de caractères difficile à deviner)
- (optionnel) Si vous souhaitez configurer un port personnalisé, ajoutez également la ligne PORT = suivi de la valeur de votre port
- Dans la console, exécutez la commande `npm install`
- Une fois l'installation terminée, exécutez la commande `npm run backend`
- Dans une console séparée, exécutez la commande `npm run frontend`
- Ouvrez votre navigateur à l'adresse indiquée dans la console par Vue (par défaut `localhost:8080`)
- Vous pouvez naviguer !

### FONCTIONNEMENT

- Créez d'abord un compte depuis la page `Créer un compte`
- Entrez une adresse mail et un mot de passe

> Le mot de passe DOIT contenir au moins une minuscule, une majuscule, un chiffre et un caractère spécial ou l'application renverra une erreur HTTP 400 !

- Si vous essayez de vous connecter plus tard, entrez ces identifiants sur la page `Se connecter`
- Une fois sur la page principale, vous verrez les publications ajoutées par les utilisateurs

### FONCTIONNALITES

- Ajoutez une nouvelle publication
    * Tapez votre publication, ajoutez éventuellement une image et validez
- Aimez les publications en cliquant sur `J'aime` ou annulez en cliquant sur `Je n'aime plus`
- Modifiez ou supprimez votre publication en cliquant sur le bouton approprié sur la publication
- Modifiez ou supprimez votre compte en cliquant sur `Compte`

> Les restrictions de mot de passe s'appliquent toujours !

- Déconnectez-vous avec le bouton `Se déconnecter`

## ENGLISH

### HOW TO INSTALL

- Clone this repository locally
- In your backend folder, create a file .env
- Add the following lines to it :
    MONGO_URI = ''
    SIGN = ''
- Between the apostrophes of the line MONGO_URI, copy your MongoDB database connection info
- Between the apostrophes of the line SIGN, create a complex signature for the JSON Web Token (a string of hard to guess characters)
- (optional) If you want to setup your own connection port, add the line PORT = followed by your preferred port value
- In the console, run the command `npm install`
- After the installation is completed, run the command `npm run backend`
- In another console, run the command `npm run frontend`
- Open your browser at the URL indicated by Vue (by default `localhost:8080`)
- You can browse the app !

### HOW IT WORKS

- First, create an account at the page `Créer un compte` (Create an acocunt)
- Choose an email address and a password
    !! The password MUST include at least a lowercase letter, an uppercase letter, a number and a special character otherwise the app will return an HTTP error of 400 !!
- If you want to use the app later, just login in the `Se connecter` (Login) page with your info
- Once on the landing page, you will see all the posts added by the users

### WHAT YOU CAN DO

- Add a new post
    * Fill in the text of your post, add an image if you want and confirm
- Like a post by clicking `J'aime` (I like) or cancel by clicking `Je n'aime plus` (I don't like anymore)
- Edit or delete your post by clicking the related button in the card (`Modifier` to edit, `Supprimer` to delete)
- Edit or delete your account by clicking `Compte` (Account)

> The restrictions for the password still apply !

- Logout by clicking `Se déconnecter` (logout)
