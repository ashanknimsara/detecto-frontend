import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';


const Update = ({ selectedUser, onUpdate }) => {
  // Destructure the selected user data
  const { _id, username: initialUsername, email: initialEmail, phone: initialPhone } = selectedUser;

  // State for input fields
  const [username, setUsername] = useState(initialUsername);
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState(initialPhone);

  // Handle input field changes
  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePhoneChange = (event) => setPhone(event.target.value);

  // Function to update user data
  const handleUpdate = () => {
    const updatedUserData = {
      _id,
      username,
      email,
      phone
    };

    // Send updated data to the server
    axios.post(`http://localhost:8070/Detecto/manage/update/${_id}`, updatedUserData)
      .then(response => {
        console.log("User updated:", response.data);
        // Call onUpdate function passed from parent component to update table data
        onUpdate();
        setOpenPopupUpdate(false);
         alert(`${username} your information updated`);
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
        textAlign: 'center', // Center align all children within the Box
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        {/* Input fields */}
        <TextField id="outlined-basic-username" label="User Name" variant="outlined" style={{ marginBottom: '16px' }} value={username} onChange={handleUsernameChange} />
        <TextField id="outlined-basic-email" label="Email" variant="outlined" style={{ marginBottom: '16px' }} value={email} onChange={handleEmailChange} />
        <TextField id="outlined-basic-phonenumber" label="Phone Number" variant="outlined" style={{ marginBottom: '16px' }} value={phone} onChange={handlePhoneChange} />
        {/* Update button */}
        <Button variant="contained" style={{ backgroundColor: 'green', color: 'white' }} onClick={handleUpdate}>UPDATE USER</Button>
      </div>
    </Box>
  );
};

export default Update;
