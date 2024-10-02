import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ForgotPasswordPage.css';

import forgotPasswordImage from '../../assets/rock-paper-scissors.png'; 

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/forgot-password/', { email })
      .then(response => {
        toast.success('Password reset link sent to your email.');
      })
      .catch(error => {
        toast.error('Error sending password reset link.');
      });
  };

  return (
    <div className="ForgotPasswordPage">
      <ToastContainer />
      <img src={forgotPasswordImage} alt="Forgot Password" className="forgot-password-image" />
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Enter your email address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      <p>
        Remembered your password? <a href="/login">Go to Login</a>
      </p>
    </div>
  );
};

export default ForgotPasswordPage;
