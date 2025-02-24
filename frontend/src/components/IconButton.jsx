import React from 'react';
import Button from '@mui/material/Button';

function IconButton( {icon} ) {
  return (
    <div>
      <Button 
        variant="outlined"
        style={{width: '42px', height: '42px', minWidth: 0 }}
        sx={{
          borderWidth: '1px',
          borderColor: '#ef6c00',
          backgroundColor: 'white',
          '&:hover': {
            borderColor: '#FF6B2B',
            backgroundColor: '#ffe8de',
          }
        }}
      >
        <img src={icon} alt="icon" style={{ width: '24px', height: '24px' }} />
      </Button>
    </div>
  );
}

export default IconButton;