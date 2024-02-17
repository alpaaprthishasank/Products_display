import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './ProfileComponent.css'; // Import external CSS file

const ProfileComponent = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // Function to extract user information from cookies
    const getUserInfoFromCookies = (name) => {
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

    // Fetch user details using the token or cookies
    const fetchUserDetails = async () => {
      try {
        let token = getUserInfoFromCookies('token');
        if (!token) {
          token = ''; // Set empty token if not found
        }

        // Check if token is empty and fetch user details using cookies
        if (!token) {
          const username = getUserInfoFromCookies('username_Product');
          const firstName = getUserInfoFromCookies('firstName');
          const lastName = getUserInfoFromCookies('lastName');
          const age = getUserInfoFromCookies('age');
          const email = getUserInfoFromCookies('email');
          const gender=getUserInfoFromCookies('gender')
          if (!username || !firstName || !lastName || !age || !email||!gender) {
            throw new Error('User information not found in cookies');
          }

          // Set userDetails object using user information from cookies
          setUserDetails({
            username,
            firstName,
            lastName,
            age,
            email,
            gender,
            // Add more user details as needed
          });
          return; // Exit the function if user details are set from cookies
        }

        const response = await fetch('https://dummyjson.com/auth/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }

        const userData = await response.json();
        setUserDetails(userData);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []); // Empty dependency array to run the effect only once

  const handleLogout = () => {
    // Clear the token cookie
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    // Clear other user information cookies if needed
    document.cookie = 'username_Product=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'firstName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'lastName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'age=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie='gender=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    // Redirect to the specified path after logout
    navigate('/');
  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {userDetails ? (
        <div className="user-details">
          <img src={userDetails.image} alt="Profile" className="profile-image" />
          <div>
            <p><strong>Username:</strong> {userDetails.username}</p>
            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>First Name:</strong> {userDetails.firstName}</p>
            <p><strong>Last Name:</strong> {userDetails.lastName}</p>
            <p><strong>Gender:</strong> {userDetails.gender}</p>
            {/* Add more user details as needed */}
          </div>
        </div>
      ) : (
        <p>You need to <Link to="/">log in</Link> to view this page.</p>

      )}
      <button className='logout-button' onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ProfileComponent;
