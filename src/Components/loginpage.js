import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './loginPage.css'; // Import external CSS file

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
        })
      });
      
      if (!response.ok) {
        throw new Error('Invalid username or password');
      }
      
      const data = await response.json();
      const { token } = data;
      
      // Store the token in a cookie
      document.cookie = `token=${token}; path=/`; // Set the token in a cookie with path '/'

      // Store the username in a cookie
      document.cookie = `username_Product=${username}; path=/`; // Set the username in a cookie with path '/'

      navigate('/product-details'); // Redirect to the profile page
    } catch (error) {
      setError(error.message);
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Login Page</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="inputContainer">
          <label className="label">Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className="input" 
            required 
          />
        </div>
        <div className="inputContainer">
          <label className="label">Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="input" 
            required 
          />
        </div>
        <button type="submit" className="button">Login</button>
        {error && <div className="error">{error}</div>}
      </form>
      <p className="register-text">If you are a new user, <Link to="/register">register here</Link>.</p>
    </div>
  );
};

export default LoginPage;
