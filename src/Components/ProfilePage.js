import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the username from cookie
    const usernameCookie = getCookie('username_Product');

    // Set the username state
    if (usernameCookie) {
      setUsername(usernameCookie);
    } else {
      setError('Username not found');
    }
  }, []);

  // Function to retrieve a cookie by name
  const getCookie = (name) => {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  };

  return (
    <div className="container">
      <h2 className="heading">Profile Page</h2>
      {username && (
        <div className="profile-details">
          <p>Username: {username}</p>
          {/* Add more user details here */}
        </div>
      )}
      {error && <div className="error">{error}</div>}
      <button onClick={() => navigate('/')} className="button">Logout</button>
    </div>
  );
};

export default ProfilePage;
