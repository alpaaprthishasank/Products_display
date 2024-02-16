import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './AllProducts.css'; // Import CSS file for styling

function ProductDetails() {
  const [productData, setProductData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortedBy, setSortedBy] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Retrieve the username from the cookie
    const usernameCookie = getCookie('username_Product');
    setUsername(usernameCookie);
    
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => setProductData(data.products))
      .catch(error => console.error('Error fetching data:', error));
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

  // Function to handle search input change
  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  // Function to sort products by name
  const sortByName = () => {
    const sortedProducts = [...productData].sort((a, b) => a.title.localeCompare(b.title));
    setProductData(sortedProducts);
    setSortedBy('name');
  };

  // Function to sort products by price
  const sortByPrice = () => {
    const sortedProducts = [...productData].sort((a, b) => a.price - b.price);
    setProductData(sortedProducts);
    setSortedBy('price');
  };

  // Function to filter products based on search query
  const filteredProducts = productData.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="product-container">
      {!username && (
        <div className="login-prompt">
          <p>You need to <Link to="/">log in</Link> to view this page.</p>
        </div>
      )}
      {username && (
        <div>
          <div className="welcome-message">
            Welcome, {username}!
          </div>
          <div className="top-section">
            <h1 className="product-heading">All Products</h1>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search by name or description"
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
              />
            </div>
            <div className="sort-buttons">
              <button onClick={sortByName} className="sort-button">Sort by Name</button>
              <button onClick={sortByPrice} className="sort-button">Sort by Price</button>
            </div>
            <div className="profile-container">
              <Link to="/profile" className="profile-button">Profile</Link> {/* Profile button */}
            </div>
          </div>
          {filteredProducts.length > 0 && (
            <div className="product-grid">
              {filteredProducts.map(product => (
                <div key={product.id} className="product-box">
                  <img src={product.thumbnail} alt="Product Thumbnail" />
                  <div className="product-info">
                    <p className="product-title">{product.title}</p>
                    <p className="product-description">{product.description}</p>
                    <p className="product-price">Price: ${product.price}</p>
                    <p className="product-rating">Rating: {product.rating}</p>
                    {/* Add more product details here */}
                    <Link to={`/product/${product.id}`} className="view-details-link"><button className="view-details-button">View Details</button></Link> {/* Button to view details of the product */}
                  </div>
                </div>
              ))}
            </div>
          )}
          {sortedBy && <p className="sorting-info">Sorted by: {sortedBy}</p>} {/* Display the current sorting criteria */}
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
