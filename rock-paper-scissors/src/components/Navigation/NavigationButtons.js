import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { ToastContainer, toast } from 'react-toastify';

function NavigationButtons() {
    const [userID, setuserID] = useState(localStorage.getItem("user_id"));
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log(localStorage.getItem('refresh_token'), localStorage.getItem('access_token'));
        axiosInstance.post('logout/', {refresh_token: localStorage.getItem('refresh_token')})
          .then(response => {
            localStorage.clear();
            toast.success('You are logged out successfully!');
            navigate('/'); 
          })
          .catch(error => {
            toast.error('Logout failed!');
          });
      };

    return ( 
        <>
            <ToastContainer />
            {userID === null && <button onClick={() => navigate('/')}>Home</button>}
            <button onClick={() => navigate('/gamehub')}>Start Playing</button>
            {userID !== null && 
            <>
            <button onClick={() => navigate(`/player/${userID}`)}>Edit Profile</button>
            </>}
            <button onClick={() => navigate(`/leaderboard`)}>Leaderboards</button>
            <button onClick={handleLogout}>Logout</button>
        </> 
    );
}

export default NavigationButtons;