import { Link} from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import React, { useState } from "react";
import axios from "axios";
import backgroundImage from "./../../images/icon/webcam.jpg"; // Import your background image
import { Alert } from '@mui/material';





const Signup = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    username: "",
    role: "user", // Assuming role defaults to "user" during signup
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
 
  const handleSignupClick = () => {
    setShowAlert(true); // Show the alert when signup button is clicked
  };


  const handleCloseAlert = () => {
    setShowAlert(false); // Close the alert
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8070/Detecto/auth/signup", formData);
      const { token, user } = response.data;
      login(token, user);
    } catch (error) {
      setError("Failed to sign up");
      console.error("Signup Error:", error);
    }
    setLoading(false);
  };

  return (
    
    <div className="w-full h-screen flex items-start">
      <div className="relative w-1/2 h-full flex flex-col">
        <div className='absolute top-[20%] left-[10%] flex flex-col'>
        <h1 className='text-4xl text-white font-bold my-5 '>Detecto Security System</h1>
        <p className='text-x1 text-white font-normal'>Security is a world wide issue which separates nations and brings them together.</p>
        </div>
        
        
        <img src={backgroundImage} alt="Background" className="w-full h-full object-cover"  />
         </div>

         <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between">
          <h1 className='text-xl text-[#060606] font-semibold p-5'  >DETECTO SECURITY SYSTEM </h1>
          <form onSubmit={handleSubmit}>
          <div className='w-full flex flex-col max-w-[500px]'>
          <div className='w-full  flex flex-col mb-2'>
          <h3 className='text-3x1 font-semibold mb-2 text-[#060606]'>Register</h3>
          <p className='text-base mb-2'>Welcome Back! Please Enter Your Details</p>
          </div>

          <div className='w-full flex flex-col'>
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required 
          className="w-full text-black bg-gray-200 py-2 my-4 border-b border-black outline-none focus:outline-none" />

          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required 
          className="w-full text-black bg-gray-200 py-2 my-4 border-b border-black outline-none focus:outline-none" />
           


           <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required 
           className="w-full text-black bg-gray-200 py-2 my-4 border-b border-black outline-none focus:outline-none" />

          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required 
           className="w-full text-black bg-gray-200 py-2 my-4 border-b border-black outline-none focus:outline-none" />

          </div>

          <div className='w-full flex flex-col-4' >
          <button type="submit" disabled={loading} onClick={handleSignupClick}
          className="w-full text-white bg-[#060606] rounded-md p-4 text-center flex items-center justify-center my-2">
            {loading ? 'Signing Up...' : 'Sign Up'}</button>
          </div>
          </div>
          </form>
        

          <div className="w-full">
          <p className='text-sm flex font-normal text-black font-semibold justify-center'>
            Already have an account?{' '}
            <Link to="/Dashboard/SignIn" className="text-primary">
              Sign in
            </Link>
          </p>
        </div>

         
  
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <Alert severity="info" onClose={handleCloseAlert}sx={{ position: 'absolute', bottom: 16, right: 16, zIndex: 9999 }} open={showAlert}>
        Admin will give access to the Detecto System
      </Alert>
    </div>
  );
};

export default Signup;
