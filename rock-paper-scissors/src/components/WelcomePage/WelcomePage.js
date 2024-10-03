import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const WelcomePage = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username'); 
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      navigate('/login'); 
    }
  }, [navigate]);

  const handleLogout = () => {
    axios.post('http://127.0.0.1:8000/logout/', {refresh_token: localStorage.getItem('refreshToken')})
      .then(response => {
        localStorage.clear();
        toast.success('You are logged out successfully!');
        navigate('/login'); 
      })
      .catch(error => {
        toast.error('Logout failed!');
      });
  };

  return (
    <div className="welcome-container">
      <ToastContainer />
      <h1>Welcome, {username}!</h1>
      <p>You are now signed in.</p>
      <button onClick={() => navigate('/game')}>Start Playing</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default WelcomePage;
