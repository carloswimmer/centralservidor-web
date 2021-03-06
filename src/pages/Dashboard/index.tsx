import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button } from '@material-ui/core';

const Dashboard: React.FC = () => {
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width={1}
      >
        <h1>Dashboard</h1>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/next-page"
        >
          Next Page
        </Button>
      </Box>
    </>
  );
};

export default Dashboard;
