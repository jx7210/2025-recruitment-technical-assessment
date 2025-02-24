import React from 'react';
import { Box, Stack } from '@mui/material';
import filter_list from '../assets/filter_list.png';
import filter_alt from '../assets/filter_alt.png';
import SearchButton from './SearchButton';
import SearchForm from './SearchForm';

function CollapsedSearchbar() {

  return (
    <div className="CollapsedSearchbar" style={{ marginBottom: '8px' }} >
      {/* Search Form */}
      <SearchForm/>
      <Stack direction="row" style={{ justifyContent: 'space-between' }} >
        {/* Filter button */}
        <Box alignContent={'center'}>
          <SearchButton icon={filter_alt} text="Filters"/>
        </Box>

        {/* Sort button */}
        <Box alignContent={'center'}>
          <SearchButton icon={filter_list} text="Sort"/>
        </Box>
      </Stack>
    </div>
  );
}
export default CollapsedSearchbar;