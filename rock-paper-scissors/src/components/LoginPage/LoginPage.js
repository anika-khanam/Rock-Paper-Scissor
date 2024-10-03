import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import rockPaperScissorsImg from '../../assets/rock-paper-scissors.png'; 

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/login/', credentials)
      .then(response => {
        console.log(response.data);
        const { access, refresh, username, user_id } = response.data;
        localStorage.setItem('access_token', access); 
        localStorage.setItem('refresh_token', refresh); 
        localStorage.setItem('username', username); 
        localStorage.setItem('user_id', user_id); 

        axios.defaults.headers.common['Authorization'] = 
                                         `Bearer ${access}`;
        toast.success('You are logged in successfully!');
        navigate('/welcome'); 
      })
      .catch(error => {
        toast.error('Login failed! Please check your username and password.');
      });
    };

  return (
    <div className="LoginPage">
      <ToastContainer /> 
      <header className="header">
        <h1>Login to Your Account</h1>
      </header>
      <div className="form-container">
        <img src={rockPaperScissorsImg} alt="Rock Paper Scissors" className="login-image" />
        <form className="login-form" onSubmit={handleSubmit}> 
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              required 
              value={credentials.username} 
              onChange={handleChange} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              required 
              value={credentials.password} 
              onChange={handleChange} 
            />
          </div>
          <button type="submit" className="login-button">Login</button>
          <div className="links">
            <Link to="/forgot-password">Forgot Password?</Link>
            <Link to="/register">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
