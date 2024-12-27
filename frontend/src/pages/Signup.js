import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Default role is student
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/signup', { name, email, password, role });
      setSuccess(res.data.msg);
      setError('');
      // Clear the form after successful signup
      setName('');
      setEmail('');
      setPassword('');
      setRole('student');
    } catch (err) {
        console.error(err);
      setError(err.response?.data?.msg || 'Signup failed');
      setSuccess('');
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSignup}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
