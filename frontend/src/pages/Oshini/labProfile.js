import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Button, styled } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import the ArrowBack icon

const StyledContainer = styled(Container)({
  marginTop: '50px',
});

const Label = styled(Typography)({
  display: 'block',
  marginBottom: '2px',
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

const LabProfile = () => {
  const [labDetails, setLabDetails] = useState({});
  const navigate = useNavigate(); 
  const storedUserName = sessionStorage.getItem('userName');
    
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

  const handleEdit = () => {
    navigate('/labEdit');
  };

  const handleDelete = async (userName) => {
    try {
      await axios.delete(`http://localhost:8070/labAccount/delete/${storedUserName}`);
      alert('Account deleted successfully');
      navigate('/labSignup');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete account. Please try again later.');
    }
  };

  const handleBack = () => {
    navigate('/labDash');
  }

  const generatePDF = async () => {
    try {
      const storedUserName = sessionStorage.getItem('userName');
      const response = await axios.get(`http://localhost:8070/labAccount/get/${storedUserName}`);
      const laboratory = response.data.labAccount;
  
      const doc = new jsPDF();
      const imgData = '../../../images/Oshini/logo.jpeg';
      doc.addImage(imgData, 'JPEG', 170, 10, 40, 40);
  
      const data = [
        { label: 'Lab Name', value: laboratory.name },
        { label: 'Address', value: laboratory.address },
        { label: 'Phone', value: laboratory.phone },
        { label: 'District', value: laboratory.district },
        { label: 'City', value: laboratory.city },
        { label: 'Completed Tests', value: laboratory.completed },
        { label: 'Rejected Tests', value: laboratory.rejected }
      ];

      doc.autoTable({
        body: data.map(row => [row.label, row.value]),
      });
  
      doc.save('laboratory_details.pdf');
    } catch (error) {
      console.error('Error fetching laboratory details:', error);
    }
  };
  
  return (
    <StyledContainer maxWidth="md">
      <Paper style={{ padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.9)', width: '55%', position: 'fixed', left: '20%', right : '40%' }}>
        <Typography variant="h4" gutterBottom>
          <center>Your Details</center>
        </Typography> <br></br>
        {/* Add the back icon with Link to navigate to labDash */}
        <Link to="/labDash" style={{ textDecoration: 'none', color: 'inherit', position: 'absolute', top: '30px', left: '10px' }}>
          <ArrowBackIcon />
        </Link>
        <div>
          <Label>User Name:</Label>
          <ValueLabel>{labDetails.userName}</ValueLabel>
        </div>
        <div>
          <Label>Name:</Label>
          <ValueLabel>{labDetails.name}</ValueLabel>
        </div>
        <div>
          <Label>Address:</Label>
          <ValueLabel>{labDetails.address}</ValueLabel>
        </div>
        <div>
          <Label>Phone:</Label>
          <ValueLabel>{labDetails.phone}</ValueLabel>
        </div>
        <div>
          <Label>District:</Label>
          <ValueLabel>{labDetails.district}</ValueLabel>
        </div>
        <div>
          <Label>City:</Label>
          <ValueLabel>{labDetails.city}</ValueLabel>
        </div>
        {/* Add buttons for editing and deleting accounts */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <Button variant="contained" color="primary" style={{ width: '30%' }} onClick={handleEdit}>
            Edit
          </Button>
          <Button variant="contained" color="secondary" style={{ width: '30%' }} onClick={handleDelete}>
            Delete Account
          </Button>
          <Button variant="contained" color="primary" style={{ width: '30%' }} onClick={generatePDF}>
            Download Statistics
          </Button>
        </div>
      </Paper>
    </StyledContainer>
  );
};

export default LabProfile;

