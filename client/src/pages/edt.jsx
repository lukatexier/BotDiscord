import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // pour récupérer l'id de l'URL
import { fetchEDT } from '../services/api'; // méthode pour récupérer l'EDT

function Edt() {
  const { id } = useParams(); // id de l'étudiant depuis l'URL
  const [edt, setEdt] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEdt = async () => {
      try {
        const data = await fetchEDT(id);
        setEdt(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadEdt();
  }, [id]);

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h2>Emploi du temps de l'étudiant {id}</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Heure</th>
            <th>Lundi</th>
            <th>Mardi</th>
            <th>Mercredi</th>
            <th>Jeudi</th>
            <th>Vendredi</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }, (_, h) => (
            <tr key={h}>
              <td>{h + 8}h</td>
              {Array.from({ length: 5 }, (__, j) => (
                <td key={j}>
                  {edt.find(c => c.heure === h + 8 && c.jour === j)?.cours || ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Edt;
