import React, { useState } from 'react';
import './ForgotPasswordPage.css';
import forgotPasswordImage from '../../assets/rock-paper-scissors.png'; // Make sure this path is correct

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <div className="ForgotPasswordPage">
      <img src={forgotPasswordImage} alt="Forgot Password" className="forgot-password-image" />

      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Enter your email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleChange}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      <p>
        Remembered your password? <a href="/login">Go to Login</a>
      </p>
    </div>
  );
};

export default ForgotPasswordPage;
