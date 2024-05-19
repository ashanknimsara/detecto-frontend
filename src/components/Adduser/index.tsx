
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function AddUser() {
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
      <TextField id="outlined-basic-username" label="User Name" variant="outlined" style={{ marginBottom: '16px' }} />
      <TextField id="outlined-basic-email" label="Email" variant="outlined" style={{ marginBottom: '16px' }} />
      <TextField id="outlined-basic-phonenumber" label="Phone Number" variant="outlined" style={{ marginBottom: '16px' }} />
      <Button variant="contained" style={{ backgroundColor: 'green', color: 'white' }}>ADD USER</Button>
    </div>
    </Box>
  );
}
