import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './getproduct.css';

function ProductDetail() {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [hoveredImage, setHoveredImage] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${productId}`)
      .then(res => res.json())
      .then(data => setProductData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [productId]);

  return (
    <div className="product-container1">
      <h1>Product Details</h1>
      {productData ? (
        <div className="product-box1">
          <div className="product-info1">
            <p className="product-title1">{productData.title}</p>
            <p className="product-description1">{productData.description}</p>
            <p className="product-price1">Price: ${productData.price}</p>
            <p className="product-rating1">Rating: {productData.rating}</p>
            <div className="product-images1">
              <img 
                src={productData.thumbnail} 
                alt="Product Thumbnail" 
                className="product-main-image" 
                onMouseEnter={() => setHoveredImage(0)}
                onMouseLeave={() => setHoveredImage(null)}
                style={hoveredImage === 0 ? {transform: 'scale(1.2)'} : null}
              />
              {productData.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product ${index}`}
                  className="small-image"
                  onMouseEnter={() => setHoveredImage(index + 1)}
                  onMouseLeave={() => setHoveredImage(null)}
                  style={hoveredImage === index + 1 ? {transform: 'scale(1.2)'} : null}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProductDetail;
