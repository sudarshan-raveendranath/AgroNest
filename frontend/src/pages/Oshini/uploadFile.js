import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, TextField, FormControlLabel, Checkbox, IconButton, styled } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';

const Container = styled('div')({
  width: '100%',
  maxWidth: 700,
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 'calc(100vh - 150px)', /* Adjust height as needed */
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  position: 'fixed',
  top: '75px', /* Adjust top position based on AppBar height */
  left: '50%',
  transform: 'translateX(-50%)',
});

function UploadFile() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const requestId = searchParams.get('requestId');
  const [userName, setUserName] = useState('');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);

  // Fetch user name from session storage
  useEffect(() => {
    const storedUserName = sessionStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  // Function to handle file upload
  const handleFileUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);
    formData.append('requestId', requestId);

    const result = await axios.post('http://localhost:8070/labReport/upload-files', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log(result);
  };

  // Function to handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div style={{ paddingTop: '70px' }}>
      <AppBar position="fixed" style={{ marginTop: '75px', backgroundColor: '#0F5132' }}>
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <Typography variant="h5" component="div" sx={{ flexGrow: 0, color: 'white' }}>
            Upload File
          </Typography>
          <Typography variant="body1" style={{ color: 'white', marginRight: '-1100px' }}>
            Hello {userName}
          </Typography>
          <Link to="/labProfile" style={{ textDecoration: 'none', color: 'inherit' }}>
            <IconButton>
              <AccountCircleIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
      <Container>
        <div style={{ padding: '20px' }}>
          <form onSubmit={handleFileUpload}>
            <center><h2>Upload Lab Report here</h2></center>
            <TextField
              label="Title"
              variant="outlined"
              required
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <br />
            <br />
           
            <Button
  variant="contained"
  component="label"
  style={{ backgroundColor: '#0F5132'}} // Add margin-right
>
  Choose File
  <input type="file" hidden accept="application/pdf" onChange={handleFileChange} />
</Button>
{file && (
  <Typography variant="body2" gutterBottom>
    Selected: {file.name}
  </Typography>
)}
<br />
<br />
<Button type="submit" variant="contained" color="primary" style={{ backgroundColor: '#0F5132' }}>
  Submit
</Button>


          </form>
        </div>
      </Container>
    </div>
  );
}

export default UploadFile;
