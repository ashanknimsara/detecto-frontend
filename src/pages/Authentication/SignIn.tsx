import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from "axios";
import backgroundImage from "./../../images/icon/webcam.jpg";

const SignIn = () => {
 
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8070/Detecto/auth/login", formData);
      const { token, user } = response.data;
      if (user.access === 'true') {
        // User has access, proceed with login
        login(token, user);
        navigate('/Dashboard/security-camera');
      } else {
        // User does not have access, display an error message
        setError("You do not have access to the system.");
      }
    } catch (error) {
      setError("Invalid username or password");
      console.error("Signing Error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="w-full h-screen flex items-start">
      {/* Left side: Image */}
      <div className="relative w-1/2 h-full flex flex-col">
        <div className='absolute top-[20%] left-[10%] flex flex-col'>
          <h1 className='text-4xl text-white font-bold my-5 '>Detecto Security System</h1>
          <p className='text-x1 text-white font-normal'>Security is a world wide issue which separates nations and brings them together.</p>
        </div>
        <img src={backgroundImage} alt="Background" className="w-full h-full object-cover" />
      </div>
      {/* Right side: Login Form */}
      <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between">
        <h1 className='text-xl text-[#060606] font-semibold p-14'>DETECTO SECURITY SYSTEM </h1>
        <form onSubmit={handleSubmit}>
          <div className='w-full flex flex-col max-w-[500px]'>
            <div className='w-full  flex flex-col mb-2'>
              <h3 className='text-3x1 font-semibold mb-2 text-[#060606]'>Login</h3>
              <p className='text-base mb-2'>Welcome Back! Please Enter Your Email & Password</p>
            </div>
            <div className='w-full flex flex-col'>
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full text-black bg-gray-200 py-2 my-4 border-b border-black outline-none focus:outline-none" />
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full text-black py-2 my-4 border-b border-black outline-none focus:outline-none bg-transparent" />
            </div>
            <div className='w-full flex flex-col-4' >
              <button type="submit" disabled={loading} className="w-full text-white bg-[#060606] rounded-md p-4 text-center flex items-center justify-center my-2">
                {loading ? 'Signing In...' : 'Sign In'}</button>
            </div>
          </div>
        </form>
        <div className='w-full'>
          <p className='text-sm flex font-normal text-black font-semibold justify-center'>
            Don't have an account?{' '}
            <Link to="/Dashboard/SignUp" className="text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default SignIn;
