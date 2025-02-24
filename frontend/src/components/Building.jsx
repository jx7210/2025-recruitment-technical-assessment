import React from 'react';
import { Box, Typography } from '@mui/material';

function Building( {item} ) {
  return (
    <div>
      <Box className='building' style={{
        backgroundColor: '#ef6c00', 
        borderRadius: '10px', 
        position: 'relative',
      }}>
        {/*Building Image*/}
        <img 
          src={item.building_picture} 
          alt='building'
          style={{ 
            width: '100%',
            height: '100%',
            borderRadius: '10px',
        }}/>
        {/*Rooms Available*/}
        <Box 
          className = 'Rooms'
          style={{ 
            backgroundColor: 'white', 
            borderRadius: '15px',
            position: 'absolute',
            top: 0,
            right: 0,
            margin: '10px',
            padding: '10px 15px',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex'
          }}>
          {/* Green Circle */}
          <Box 
            style={{ 
              backgroundColor: 'green', 
              borderRadius: '50%', 
              height: '10px', 
              width: '10px', 
              marginRight: '10px',
            }}>
          </Box>
          <Typography variant='body1' style={{ fontSize: '12px', fontWeight: 'bold'}}>
            {item.rooms_available} rooms available
          </Typography>
        </Box>

        {/*Building Name */}
        <Box
          style={{
            bottom: 0,
            left: 0,
            right: 0,
            color: 'white',
            backgroundColor: '#ef6c00', 
            borderRadius: '10px',
            position: 'absolute',
            margin: '10px',
            padding: '15px 20px',
            boxSizing: 'border-box',
            display: 'flex',
            fontWeight: 'bold'
          }}
        >
          {item.name}
        </Box>
      </Box>
    </div>
  );
}

export default Building;