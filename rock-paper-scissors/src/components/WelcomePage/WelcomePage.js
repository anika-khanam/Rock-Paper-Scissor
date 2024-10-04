import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';
import NavigationButtons from '../Navigation/NavigationButtons';

const WelcomePage = () => {
  const [username, setUsername] = useState('');
  const [userID,setUserId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username'); 
    const storedId = localStorage.getItem('user_id')
    if (storedUsername) {
      setUsername(storedUsername);
      setUserId(storedId)
    } else {
      navigate('/login'); 
    }
  }, [navigate]);

  return (
    <div className="welcome-container">
      <h1>Welcome, {username}!</h1>
      <p>You are now signed in.</p>
      <NavigationButtons />
    </div>
  );
};

export default WelcomePage;
