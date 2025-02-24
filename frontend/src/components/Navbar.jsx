
import React, { useState } from 'react';
import { AppBar, Toolbar, Stack } from '@mui/material';
import IconButton from './IconButton';

function Navbar() {
  const [isDoorOpen, setIsDoorOpen] = useState(true);

  const handleLogoClick = () => {
    setIsDoorOpen((prevState) => !prevState);
  };

  return (
    <div className="Navbar">
      <AppBar
        position="fixed"
        style={{
          backgroundColor: 'white',
          height: '65px', 
          borderBottom: '1px solid #dedede',
          justifyContent: 'space-between',
          boxShadow: 'none' 
        }}
      >
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between', height: '100%' }}>
          {/* Left-aligned section */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* Logo */}
            <img onClick={handleLogoClick}
              src={isDoorOpen ? '/assets/freeRoomsLogo.png' : '/assets/freeroomsDoorClosed.png'}
              alt="Logo"
              style={{ height: '50px', width: '50px' }} 
            />
            {/* Freerooms */}
            <div className="freerooms" style={{ color: '#ef6c00', fontFamily: 'Josefin Sans', fontSize: '32px', fontWeight: '600'}}>
              Freerooms
            </div>
          </div>

          {/* Right-aligned section */}
          <Stack direction="row" spacing={1}>
            <IconButton icon={"/assets/search.png"} />
            <IconButton icon={"/assets/grid_view.png"} />
            <IconButton icon={"/assets/map.png"} />
            <IconButton icon={"/assets/dark_mode.png"} />
          </Stack>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default Navbar;