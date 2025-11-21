# Mini-Projet : SuperHeroManager

## Description
Ce mini-projet est une application web full-stack permettant de gérer 
une base de super-héros importée depuis un fichier JSON.
Il comprend :
- Un **frontend** en React + TypeScript (interface utilisateur, formulaire, navigation).
- Un **backend** en Node.js + Express + TypeScript (API REST).
- Une **base MongoDB** pour stocker les héros et les utilisateurs.
- Une **authentification JWT** avec rôle (admin, éditeur, visiteur).
- Une **gestion des images** (uploads, affichage, supression).

## Installation
1. Cloner le dépôt :
```bash
git clone https://github.com/Natacha62/superhero-manager.git
```
2. Installer les dépendances :
```bash
cd backend && npm install
cd ../frontend && npm install
```
3. Lancer le projet :
```bash
# Backend
npm run dev

# Frontend
npm run dev
```

## Utilisation
- **Connexion** : authentification par JWT (admin, éditeur, visiteur).
- **Dashboard** : liste des héros avec recherche, filtres et tri.
- **CRUD** : ajouter, modifier, supprimer des héros.
- **Images** : upload et suppression automatique liées aux héros.
- **Rôles** :
1. Admin : accès complet
2. Editeur : création et modification
3. Visiteur + Utilisateur simple : lecture seule

## Documentation technique

### Routes API
- ***POST /api/auth/register*** --> inscription
- ***POST /api/auth/login*** --> connexion
- ***GET /api/heroes*** --> liste des héros
- ***GET /api/heroes/:id*** --> détails d'un héros
- ***POST /api/heroes*** --> création (admin/éditeur)
- ***PUT /api/heroes/:id*** --> modification (admin/éditeur)
- ***DELETE /api/heroes/:id*** --> suppression (admin uniquement)

## Schéma MongoDB

### Collection ***users***
```bash
{
  "_id": ObjectId,
  "username": String,
  "passwordHash": String, // mot de passe chiffré avec bcrypt
  "role": "admin" | "editor" | "user",
  "createdAt": Date,
  "__v": Number
}
```
### Collection ***heroes***
```bash
{
  "_id": ObjectId,
  "id": Number,
  "name": String,
  "slug": String,
  "powerstats": {
    "intelligence": Number,
    "strength": Number,
    "speed": Number,
    "durability": Number,
    "power": Number,
    "combat": Number
  },
  "appearance": {
    "gender": String,
    "race": String,
    "height": [String, String],
    "weight": [String, String],
    "eyeColor": String,
    "hairColor": String
  },
  "biography": {
    "fullName": String,
    "alterEgos": String,
    "aliases": [String],
    "placeOfBirth": String,
    "firstAppearance": String,
    "publisher": String,
    "alignment": String
  },
  "work": {
    "occupation": String,
    "base": String
  },
  "connections": {
    "groupAffiliation": String,
    "relatives": String
  },
  "images": {
    "xs": String,
    "sm": String,
    "md": String,
    "lg": String
  },
  "createdAt": Date,
  "updatedAt": Date,
  "__v": Number
}
```

## Outils utilisés
- React + TypeScript + Vite
- Node.js + Express + TypeScript
- JWT + bcrypt
- Multer (upload images)
- Axio (communication front/back)
- Visual Studio Code
- Git & GitHub