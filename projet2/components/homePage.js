import React from 'react';
import { useState } from 'react';

const HomePage = () => {
  const [showWeatherApp, setShowWeatherApp] = useState(false);
  const [showToDoApp, setShowToDoApp] = useState(false);

  const handleWeatherAppClick = () => {
    setShowWeatherApp(true);
    setShowToDoApp(false);
    // Votre logique pour afficher l'application météo ici
  };

  const handleToDoAppClick = () => {
    setShowToDoApp(true);
    setShowWeatherApp(false);
    // Votre logique pour afficher l'application To-Do ici
  };

  return (
    <div className="home-page-container">
      <h1>Bienvenue sur ma page d'accueil</h1>
      <div className="button-container">
        <button className="app-button" onClick={handleWeatherAppClick}>
          Météo
        </button>
        <button className="app-button" onClick={handleToDoAppClick}>
          To-Do
        </button>
      </div>
      {showWeatherApp && (
        <div className="app-container">
          {/* Votre contenu pour l'application météo ici */}
          <h2>Application météo</h2>
        </div>
      )}
      {showToDoApp && (
        <div className="app-container">
          {/* Votre contenu pour l'application To-Do ici */}
          <h2>Application To-Do</h2>
        </div>
      )}
    </div>
  );
};

const styles = {
  homePageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '16px',
    marginBottom: '24px',
  },
  appButton: {
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#9333ea',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  appContainer: {
    padding: '24px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
  },
};

export default HomePage;