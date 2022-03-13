import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export const Copyright = () => {
  return (
    <Typography style={{color:"rgb(67,67,67)", marginTop:"20px"}} variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link  style={{color:"rgb(67,67,67)"}}  href="https://my-expenses-final.netlify.app/">
        myEXPENSES
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}