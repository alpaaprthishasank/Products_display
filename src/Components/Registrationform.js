import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrationForm.css'; // Import the CSS file

function RegistrationForm() {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://dummyjson.com/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          firstName,
          lastName,
          age,
          email,
          password,
          gender,
        })
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }


      // Store user information in cookies
      document.cookie = `username_Product=${username}; path=/`;
      document.cookie = `firstName=${firstName}; path=/`;
      document.cookie = `lastName=${lastName}; path=/`;
      document.cookie = `age=${age}; path=/`;
      document.cookie = `email=${email}; path=/`;
      document.cookie = `gender=${gender}; path=/`;

      console.log('Registration successful');
      navigate('/product-details');

    } catch (error) {
      console.error('Registration error:', error.message);
    }
  };

  return (
    <div className="container"> {/* Add container class */}
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group"> {/* Add form-group class */}
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>First Name:</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn-submit">Register</button> {/* Add btn-submit class */}
      </form>
    </div>
  );
}

export default RegistrationForm;
