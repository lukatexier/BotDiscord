// src/pages/Etudiants.jsx
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { fetchStudents } from "../services/api";

const Etudiants = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await fetchStudents();
        setStudents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, []);

  if (loading) return <p>Chargement des étudiants...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div>
      <h2>Liste des étudiants</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} <Link to={`/edt/${student.id}`}>Voir EDT</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Etudiants;
