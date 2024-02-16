import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './AllProducts.css'; // Import CSS file for styling

function ProductDetails() {
  const [productData, setProductData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortedBy, setSortedBy] = useState(null);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => setProductData(data.products))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

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
      </div>
      {filteredProducts.length > 0 ? (
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
      ) : (
        <p>No products found.</p>
      )}
      {sortedBy && <p className="sorting-info">Sorted by: {sortedBy}</p>} {/* Display the current sorting criteria */}
    </div>
  );
}

export default ProductDetails;
