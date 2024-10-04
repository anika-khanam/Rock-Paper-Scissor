import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { ToastContainer, toast } from 'react-toastify';

function NavigationButtons() {
    const [userID, setuserID] = useState(localStorage.getItem("user_id"));
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        console.log(location.pathname);
    })

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
            <button className={location.pathname==='/gamehub' ? 'active' : 'inactive'} onClick={() => navigate('/gamehub')}>Start Playing</button>
            {userID !== null && 
            <>
            <button className={location.pathname===`/player/${userID}` ? 'active' : 'inactive'} onClick={() => navigate(`/player/${userID}`)}>Edit Profile</button>
            </>}
            <button className={location.pathname==='/leaderboard' ? 'active' : 'inactive'} onClick={() => navigate(`/leaderboard`)}>Leaderboards</button>
            <button onClick={handleLogout}>Logout</button>
        </> 
    );
}

export default NavigationButtons;