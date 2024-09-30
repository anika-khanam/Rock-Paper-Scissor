import React from 'react';
import './styles.css';
import rockPaperScissorsImg from './rock-paper-scissors.png';
import GameComponent from './components/game/Game';

const App = () => {
  return (
    <div className="App">

      <header className="hero">
        <div className="hero-content">
          <h1>Challenge the World in Rock, Paper, Scissors!</h1>
          <p>Play against your friends, track your stats, and become the ultimate champion!</p>
          <div className="cta-buttons">
            <button onClick={() => alert('Login functionality coming soon!')}>Login</button>
            <button onClick={() => alert('Playing as a guest!')}>Play as Guest</button>
          </div>
        </div>
      </header>


      <section className="game-overview">
        <h2>How to Play</h2>
        <p>The rules are simple:</p>
        <ul>
          <li><strong>Rock</strong> beats Scissors</li>
          <li><strong>Scissors</strong> beats Paper</li>
          <li><strong>Paper</strong> beats Rock</li>
        </ul>
        <div className="game-image">
          <img src={rockPaperScissorsImg} alt="Rock Paper Scissors Game" />
        </div>
      </section>


      <section className="feature-section">
        <div className="feature-text">
          <h2>Get on the Leaderboard</h2>
          <p>Prove your skills and rise to the top! Compete with players worldwide and secure your spot on the leaderboard.</p>
        </div>
        <div className="feature-image">
       
        </div>
      </section>


      <section className="feature-section reverse">
        <div className="feature-image">
       
        </div>
        <div className="feature-text">
          <h2>Your Personalized Profile</h2>
          <p>Track your wins, losses, and progress! Customize your avatar and showcase your achievements to the world.</p>
        </div>
      </section>


      <footer>
        <p>&copy; 2024 Rock Paper Scissors Game. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
