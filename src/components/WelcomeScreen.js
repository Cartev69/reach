import React from 'react';

function WelcomeScreen({ onBegin }) {
  return (
    <div className="screen-container">
      <h1>Welcome to REACH</h1>
      <button onClick={onBegin}>Begin</button>
    </div>
  );
}

export default WelcomeScreen;
