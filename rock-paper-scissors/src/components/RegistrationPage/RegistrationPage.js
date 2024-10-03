import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import './RegistrationPage.css';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import registrationImage from '../../assets/rock-paper-scissors.png';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    axiosInstance.post('register/', {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword
    })
    .then(response => {
      console.log(response.data);
      toast.success('Your player account is registered!'); 
    })
    .catch(error => {
      console.error('There was an error registering!', error.response.data);
      toast.error('Registration failed! Please try again.');
    });
  };

  return (
    <div className="RegistrationPage">
      <ToastContainer />  
      <img src={registrationImage} alt="Registration" className="registration-image" />
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="username">Username</label>
              </td>
              <td>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="email">Email</label>
              </td>
              <td>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="password">Password</label>
              </td>
              <td>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="confirmPassword">Confirm Password</label>
              </td>
              <td>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <a href="/login">Go to Login</a>
      </p>
    </div>
  );
};

export default RegistrationPage;
