import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import LoginPage from './components/LoginPage/LoginPage';
import ForgotPasswordPage from './components/ForgotPasswordPage/ForgotPasswordPage';
import LeaderBoards from './components/LeaderBoardPage/LeaderBoard';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import DebugView from './components/DebugPage/DebugView';
import './App.css';
import PlayerPage from './components/PlayerPage/PlayerPage';
import GameHub from './components/game/GameHub';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/gamehub" element={<GameHub />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/leaderboard" element={<LeaderBoards/>}/>
        <Route path="/player/:playerId" element={<PlayerPage/>}/>
      </Routes>
    </Router>
  );
};

export default App;
