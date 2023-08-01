import React, { useState } from 'react';
import './index.css'
const PlayerNameInput = ({ onStartGame }) => {
  const [playerX, setPlayerX] = useState('');
  const [playerO, setPlayerO] = useState('');

  const handleStartGame = () => {
    if (playerX.trim() !== '' && playerO.trim() !== '') {
      onStartGame(playerX, playerO);
    }
  };

  return (
    <div className="player-names">
 
      <div>
        Player X: <input type="text" value={playerX} onChange={(e) => setPlayerX(e.target.value)} placeholder='Type your Name'/>
      </div>
      <div>
        Player O: <input type="text" value={playerO} onChange={(e) => setPlayerO(e.target.value)} placeholder='Type your Name'/>
      </div>
      <button className="start-button" onClick={handleStartGame}>Start Game</button>
    </div>
  );
};

export default PlayerNameInput;
