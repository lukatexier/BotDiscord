const spreadsheetService = require('../services/spreadsheetService');

const getUsers = async (req, res, next) => {
  try {
    const etudiants = await spreadsheetService.lireUser();
    res.json(etudiants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEDT = async (req, res, next) => {
  try {
    const id = req.params.id;
    const edt = await spreadsheetService.lireEDT(id);
    res.json(edt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const setCours = async (req, res, next) => {
  try {
    const { jour, heure, cours } = req.body;
    const id = req.params.id;

    if (jour === undefined || heure === undefined || !cours) {
      return res.status(400).json({ error: 'Paramètres manquants' });
    }

    await spreadsheetService.setCours(id, jour, heure, cours);
    res.json({ success: true });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const getAllEDT = async (req, res) => {
  try {
    const allEDT = await spreadsheetService.getAllEDT();
    res.json(allEDT);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  getEDT,
  setCours,
  getAllEDT
};
