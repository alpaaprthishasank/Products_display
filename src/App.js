import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/loginpage';
import ProductDetail from './Components/getproduct'; // Import Product_Detail component
import ProductDetails1 from './Components/ALLProducts';
import ProfileComponent from './Components/ProfilePage1'
import RegistrationForm from './Components/Registrationform';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/product-details" element={<ProductDetails1 />} />
        <Route path="/product/:productId" element={<ProductDetail />} /> {/* Add route for product details with parameter */}
        <Route path="/profile" element={<ProfileComponent />} />
        <Route path='register' element={<RegistrationForm/>} />

      </Routes>
    </Router>
  );
}

export default App;
//asdfghjklo