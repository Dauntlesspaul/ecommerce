import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
  return (
    <Box sx={{ display: 'flex'}}>
      <CircularProgress style={{width:'20px', height:'20px', color:'white'}} />
    </Box>
  );
}