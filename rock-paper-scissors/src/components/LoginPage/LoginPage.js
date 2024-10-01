import React from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import rockPaperScissorsImg from '../../assets/rock-paper-scissors.png'; 

const LoginPage = () => {
  return (
    <div className="LoginPage">
      <header className="header">
        <h1>Login to Your Account</h1>
      </header>
      <div className="form-container">
        <img src={rockPaperScissorsImg} alt="Rock Paper Scissors" className="login-image" />
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit" className="login-button">Login</button>
          <div className="links">
            <Link to="/forgot-password">Forgot Password?</Link>
            <Link to="/register">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
