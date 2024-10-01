import React from 'react';
import { Link } from 'react-router-dom'; 
import './LandingPage.css';
import rockPaperScissorsImg from '../../assets/rock-paper-scissors.png'; 

const LandingPage = () => {
  return (
    <div className="LandingPage">
      <header className="hero">
        <div className="hero-content">
          <h1>Challenge the World in Rock, Paper, Scissors!</h1>
          <p>Play against your friends, track your stats, and become the ultimate champion!</p>
          <div className="cta-buttons">
            <Link to="/login"> {/* Link to the Login Page */}
              <button>Login</button>
            </Link>
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

      <footer>
        <p>&copy; 2024 Rock Paper Scissors Game. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
