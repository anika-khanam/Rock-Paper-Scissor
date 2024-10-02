import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import ForgotPasswordPage from './components/ForgotPasswordPage/ForgotPasswordPage';
import './styles.css';
import rockPaperScissorsImg from './rock-paper-scissors.png';
import DebugView from './components/DebugView';
import LeaderBoards from './components/LeaderBoardPage/LeaderBoard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/leaderboard" element={<LeaderBoards/>}/>
      </Routes>
    </Router>
  );
};

export default App;
