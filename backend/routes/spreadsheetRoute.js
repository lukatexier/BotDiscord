const express = require('express');
const router = express.Router();
const spreadsheetController = require('../controller/spreadsheetController');

// Récupérer la liste des étudiants
router.get('/etudiants', spreadsheetController.getUsers);

// Récupérer l'EDT d'un étudiant
router.get('/etudiants/:id', spreadsheetController.getEDT);

// Récupérer tous les EDT
router.get('/edt', spreadsheetController.getAllEDT);

// Modifier un cours d'un étudiant
router.post('/etudiants/:id', spreadsheetController.setCours);

module.exports = router;
