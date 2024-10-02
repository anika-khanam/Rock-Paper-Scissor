import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import LeaderBoards from './components/LeaderBoardPage/LeaderBoard';
import DebugView from './components/DebugPage/DebugView';
import './App.css';
import PlayerPage from './components/PlayerPage/PlayerPage';
import GameHub from './components/game/GameHub';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import LoginPage from './components/LoginPage/LoginPage';
import ForgotPasswordPage from './components/ForgotPasswordPage/ForgotPasswordPage'; 
import { ToastContainer } from 'react-toastify';
import WelcomePage from './components/WelcomePage/WelcomePage';

const App = () => {
  return (
    <Router>
      <ToastContainer /> 
      <Routes>  
        <Route path="/" element={<LandingPage />} /> 
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/gamehub" element={<GameHub />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/leaderboard" element={<LeaderBoards/>}/>
        <Route path="/player/:playerId" element={<PlayerPage/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
