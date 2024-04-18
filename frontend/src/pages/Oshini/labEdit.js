import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Button, TextField, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StyledContainer = styled(Container)({
  marginTop: '50px',
});

const Label = styled(Typography)({
    display: 'block',
    marginBottom: '2px', // Adjust the margin bottom here
    fontWeight: 'bold',
  });

const ValueLabel = styled(Typography)({
  display: 'block',
  backgroundColor: 'rgba(169, 169, 169, 0.3)',
  marginBottom: '10px',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
});

const LabEdit = () => {
  const [labDetails, setLabDetails] = useState({});
  const navigate = useNavigate();

  // Function to fetch lab details based on the userName from session
  const fetchLabDetails = async () => {
    try {
      const userName = sessionStorage.getItem('userName');
      const response = await axios.get(`http://localhost:8070/labAccount/retrieve?userName=${userName}`);
      setLabDetails(response.data);
    } catch (error) {
      console.error('Error fetching lab details:', error);
    }
  };

  useEffect(() => {
    fetchLabDetails();
  }, []);

  // Function to handle updating lab details
  const handleUpdate = async () => {
    try {
      const { userName, name, address, phone, district, city, password } = labDetails;
  
      const updateData = {
        name,
        address,
        phone,
        district,
        city,
        password
      };
  
      await axios.put(`http://localhost:8070/labAccount/update/${userName}`, updateData);
      
      // Redirect to lab profile page after updating
      navigate('/labProfile');
    } catch (error) {
      console.error('Error updating lab details:', error);
    }
  };
  

  return (
    <StyledContainer maxWidth="md">
      <Paper style={{ padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.9)', width: '55%', position: 'fixed', left: '20%', right: '40%' }}>
        <Typography variant="h4" gutterBottom>
          <center>Edit Your Details</center>
        </Typography> 
        <div>
          <Label>User Name:</Label>
          <ValueLabel>{labDetails.userName}</ValueLabel>
        </div>
        <div>
          <Label>Name:</Label>
          <TextField
            fullWidth
            variant="outlined"
            value={labDetails.name || ''}
            onChange={(e) => setLabDetails({ ...labDetails, name: e.target.value })}
          />
        </div>
        <div>
          <Label>Address:</Label>
          <TextField
            fullWidth
            variant="outlined"
            value={labDetails.address || ''}
            onChange={(e) => setLabDetails({ ...labDetails, address: e.target.value })}
          />
        </div>
        <div>
          <Label>Phone:</Label>
          <TextField
            fullWidth
            variant="outlined"
            value={labDetails.phone || ''}
            onChange={(e) => setLabDetails({ ...labDetails, phone: e.target.value })}
          />
        </div>
        <div>
          <Label>District:</Label>
          <TextField
            fullWidth
            variant="outlined"
            value={labDetails.district || ''}
            onChange={(e) => setLabDetails({ ...labDetails, district: e.target.value })}
          />
        </div>
        <div>
          <Label>City:</Label>
          <TextField
            fullWidth
            variant="outlined"
            value={labDetails.city || ''}
            onChange={(e) => setLabDetails({ ...labDetails, city: e.target.value })}
          />
        </div>
        <div>
          <Label>Password:</Label>
          <TextField
            fullWidth
            variant="outlined"
            value={labDetails.password || ''}
            onChange={(e) => setLabDetails({ ...labDetails, password: e.target.value })}
          />
        </div>
        <br></br>
        {/* Add button to update lab details */}
        <Button variant="contained" color="primary" fullWidth onClick={handleUpdate}>
          Update
        </Button>
      </Paper>
    </StyledContainer>
  );
};

export default LabEdit;
