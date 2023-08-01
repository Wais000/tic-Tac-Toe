import React, { useState } from 'react';
import {MdOutlineCircle} from 'react-icons/md';
import {AiOutlineClose} from 'react-icons/ai';
import PlayerNameInput from './PlayerNameInput';


const initialBoard = Array(9).fill(null);

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [playerX, setPlayerX] = useState('');
  const [playerO, setPlayerO] = useState('');
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  };

  const handleSquareClick = (index) => {
    if (board[index] || checkWinner(board)) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner) {
      if (winner === 'X') {
        setScoreX(scoreX + 1);
      } else {
        setScoreO(scoreO + 1);
      }
    }

    setXIsNext(!xIsNext);
  };

  const renderSquare = (index) => {
    return (
      <div className="square" onClick={() => handleSquareClick(index)}>
        {board[index] === 'X' ? <AiOutlineClose size={32} /> : board[index] === 'O' ? <MdOutlineCircle size={32} /> : null}
      </div>
    );
  };

  const renderStatus = () => {
    const winner = checkWinner(board);
    if (winner) {
      return `Winner: ${winner}`;
    } else if (board.every((square) => square)) {
      return 'It\'s a draw!';
    } else {
      return `Next player: ${xIsNext ? 'X' : 'O'}`;
    }
  };

  const handleRestart = () => {
    setBoard(initialBoard);
    setXIsNext(true);
  };

  const handleStartGame = (playerXName, playerOName) => {
    setGameStarted(true);
    setPlayerX(playerXName);
    setPlayerO(playerOName);
  };

  const handleResetScore = () => {
    setScoreX(0);
    setScoreO(0);
  };

  if (!gameStarted) {
    return <PlayerNameInput onStartGame={handleStartGame} />;
  }

  return (
    <div className="game">
      <div className="board">
        {board.map((square, index) => (
          <div key={index}>{renderSquare(index)}</div>
        ))}
      </div>
      <div className="status">{renderStatus()}</div>
      <div className="score-summary">
        <div>
          {playerX}: {scoreX}
        </div>
        <div>
          {playerO}: {scoreO}
        </div>
      </div>
      <button className="restart-button" onClick={handleRestart}>Restart</button>
      <button className="reset-score-button" onClick={handleResetScore}>Reset Score</button>
    </div>
  );
};

export default App;