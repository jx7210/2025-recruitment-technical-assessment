import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { TextField, InputAdornment, Box } from '@mui/material';

function SearchForm() {

  return (
    <>
      <Box className='search-form' style={{ margin: '8px'}} >
        <TextField
          className='search-field'
          variant="outlined"
          placeholder="Search for a building..."
          fullWidth
          sx={{
            backgroundColor: 'white',
            borderRadius: '4px',
            height: '45px',
            '& .MuiInputBase-root': { height: '45px' } 
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </>
  );
}
export default SearchForm;