import React from 'react';
import { Box, Stack } from '@mui/material';
import SearchButton from './SearchButton';
import SearchForm from './SearchForm';

function Searchbar() {

  return (
    <div className="Searchbar">
      <Stack direction="row" style={{ justifyContent: 'space-between' }} >
        {/* Filter button */}
        <Box alignContent={'center'}>
          <SearchButton icon={'/assets/filter_alt.png'} text="Filters"/>
        </Box>

        {/* Search Form */}
        <SearchForm/>

        {/* Sort button */}
        <Box alignContent={'center'}>
          <SearchButton icon={'/assets/filter_list.png'} text="Sort"/>
        </Box>
      </Stack>
    </div>
  );
}
export default Searchbar;