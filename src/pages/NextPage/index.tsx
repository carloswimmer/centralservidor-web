import React from 'react';
import { Box, Button, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const NextPage: React.FC = () => {
  const history = useHistory();

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width={1}
      >
        <h1>NextPage</h1>
        <Container maxWidth="sm">
          <Box my={8}>
            {[...new Array(20)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
              )
              .join('\n')}
          </Box>
        </Container>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => history.goBack()}
        >
          Go back
        </Button>
      </Box>
    </>
  );
};

export default NextPage;
