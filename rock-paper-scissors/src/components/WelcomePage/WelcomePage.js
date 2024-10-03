import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';

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
    localStorage.removeItem('username'); 
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  return (
    <div className="welcome-container">
      <h1>Welcome</h1>
      <p>You are now signed in.</p>
      <button onClick={() => navigate('/game')}>Start Playing</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default WelcomePage;
