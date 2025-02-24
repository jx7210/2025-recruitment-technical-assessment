
import './App.css';
import React from 'react';
import { Container, useMediaQuery } from '@mui/material';
import data from "./data.json"
import Navbar from './components/Navbar';
import Searchbar from './components/Searchbar';
import CollapsedSearchbar from './components/CollapsedSearchbar';
import Building from './components/Building';

function App() {
  const isLargeScreen = useMediaQuery('(min-width:900px)');

  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <main className="Main-page">
        <Container maxWidth={false} sx={{ padding: '0px 24px 8px 24px', margin: 0}}>
          {/* Search bar */}
          {isLargeScreen ? (
            <Searchbar sx={{ margin: '8px 0px' }} />
          ) : (
            <CollapsedSearchbar sx={{ margin: '8px 0px' }} />
          )}

          {/* Grid of buildings */}
          <div style={{
            position: 'relative',
            display: 'grid',
            width: '100%', gap: '20px', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          }}>
            {data.map((item) => (
              <Building item={item}/>
            ))}
          </div>

        </Container>
      </main>
    </div>
  );
}

export default App;
