import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header style={styles.header}>
      <h2 style={styles.logo}>EDT Promo</h2>
      <nav>
        <Link style={styles.link} to="/">Accueil</Link>
        <Link style={styles.link} to="/etudiants">Étudiants</Link>
        <Link style={styles.link} to="#">Connexion</Link>
      </nav>
    </header>
  );
}




const styles = {
  header: {
    position: 'fixed',  
    top: 0,
    left: 0,
    width: '100%',
    height: '60px',
    backgroundColor: '#1e293b',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
    boxSizing: 'border-box',
  },
  logo: {
    margin: 0,
  },
  link: {
    color: 'white',
    marginLeft: '15px',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default Navbar;
