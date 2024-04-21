import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const Signuptype = () => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      style={{ height: '100vh' }}
    >
      <Grid item>
        <Typography variant="h4" gutterBottom>
          Choose Your Role
        </Typography>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/RegisterForm"
        >
          Farmers
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/signupDealer"
        >
          Dealers
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/labSignup"
        >
          Laboratories
        </Button>
      </Grid>
    </Grid>
  );
};

export default Signuptype;
