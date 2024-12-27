import React, { useState } from 'react';
import axios from '../axiosInstance';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Clear any previous error
    setError('');

    try {
      const res = await axios.post('/login', { email, password });
      const { token } = res.data;
      console.log('Token:', token); // Debug

      // Store the token in localStorage
      localStorage.setItem('token', token);

      // Decode the token to extract user information
      const decoded = jwtDecode(token);
      console.log('Decoded User Data:', decoded); // Debug

      alert('Login successful!');

      // Redirect user based on role
      if (decoded.user.role?.toLowerCase() === 'student') {
        navigate('/student');
      } else if (decoded.user.role?.toLowerCase() === 'faculty') {
        navigate('/faculty');
      } else {
        alert('Invalid user role!');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.msg || 'Login failed');
    }
  };


  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
