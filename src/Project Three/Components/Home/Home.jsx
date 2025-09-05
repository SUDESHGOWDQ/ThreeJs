
import React from 'react';
import './Home.css';
import CubeScene from '../CubeScene';

const Home = () => {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <CubeScene />
      <div className="home-container">
        <div className="home-content">
          <h1>Welcome To Project Three</h1>
          <p>This is the Home page.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
