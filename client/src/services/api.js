// src/services/api.js

const BASE_URL = "http://localhost:3000/api/spreadsheet"; // URL de ton backend

/**
 * Récupère la liste des étudiants
 */
export async function fetchStudents() {
  const res = await fetch(`${BASE_URL}/etudiants`);
  if (!res.ok) throw new Error("Erreur lors de la récupération des étudiants");
  return res.json();
}

/**
 * Récupère l'emploi du temps d'un étudiant
 * @param {string|number} id - ID de l'étudiant
 */
export async function fetchEDT(id) {
  const res = await fetch(`${BASE_URL}/etudiants/${id}`);
  if (!res.ok) throw new Error("Erreur lors de la récupération de l'emploi du temps");
  return res.json();
}

/**
 * Met à jour un cours pour un étudiant
 * @param {string|number} id - ID de l'étudiant
 * @param {number} jour - jour (0 = lundi, 4 = vendredi)
 * @param {number} heure - heure (8-17)
 * @param {string} cours - nom du cours
 */
export async function setCours(id, jour, heure, cours) {
  const res = await fetch(`${BASE_URL}/etudiants/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ jour, heure, cours }),
  });

  if (!res.ok) throw new Error("Erreur lors de la mise à jour du cours");
  return res.json();
}
