import React from 'react';
import { Box, Button, Grid } from '@material-ui/core';

import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width={1}
    >
      <h1>Dashboard</h1>
      <Button variant="contained" color="secondary" onClick={signOut}>
        Logout
      </Button>
    </Box>
  );
};

export default Dashboard;
