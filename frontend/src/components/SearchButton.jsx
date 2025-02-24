import React from 'react';
import Button from '@mui/material/Button';

function SearchButton( {icon, text} ) {
  return (
    <div>
      <Button
        variant="outlined"
        startIcon={
          <img src={icon} alt="icon" style={{ width: '24px', height: '24px'}}/>
        }
        sx={{
          height: '45px',
          width: '140px',
          padding: '5px 20px',
          fontSize: '16px',
          display: 'flex',
          flexDirection: 'row',
          justifyItems: 'center',
          position: 'relative',
          alignItems: 'center',
          borderColor: '#ef6c00',
          borderRadius: '10px',
          borderWidth: '2px',
          color: '#ef6c00',
          textTransform: 'none',
          fontWeight: 'bold',
        }}
      >
        {text}
      </Button>
    </div>
  );
}

export default SearchButton;