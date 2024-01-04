
import React from 'react';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import "./signin.css"
const Signin = () => {
  const navigate=useNavigate();
  const handleSignin= async () => {
        navigate("/signin")
  };
  return (
    <div className="sign_contanier" onClick={handleSignin}>
        <FaUser className="signin-icon"></FaUser>
        <p className="signin_heading">signin</p>
    </div>
  );
};
export default Signin;
