import { useState } from "react";

const Square = ({ value, onClick }) => {
  return <button className="square" onClick={onClick}>{value}</button>;
}

function Board({ board, player, onPlay }) {
  const winner = computeWinner(board)
  const gameOver = winner !== null || board.every(square => square !== null)

  const handleOnClick = (idx) => {
    if (gameOver || board[idx] !== null) return

    const nextBoard = board.slice(0)

    nextBoard[idx] = player

    onPlay(nextBoard)
  }

  let status

  if (winner) {
    status = `Winner: ${winner}`
  } else if (gameOver) {
    status = "Game over"
  } else {
    status = `Next player: ${player}`
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={board[0]} onClick={() => handleOnClick(0)} />
        <Square value={board[1]} onClick={() => handleOnClick(1)} />
        <Square value={board[2]} onClick={() => handleOnClick(2)} />
      </div>
      <div className="board-row">
        <Square value={board[3]} onClick={() => handleOnClick(3)} />
        <Square value={board[4]} onClick={() => handleOnClick(4)} />
        <Square value={board[5]} onClick={() => handleOnClick(5)} />
      </div>
      <div className="board-row">
        <Square value={board[6]} onClick={() => handleOnClick(6)} />
        <Square value={board[7]} onClick={() => handleOnClick(7)} />
        <Square value={board[8]} onClick={() => handleOnClick(8)} />
      </div>
    </>
  )
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const board = history[currentMove]
  const player = currentMove % 2 === 0 ? "X" : "O"

  const handleOnPlay = (nextBoard) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextBoard]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  const jumpTo = (idx) => {
    setCurrentMove(idx)
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board board={board} player={player} onPlay={handleOnPlay} />
      </div>
      <div className="game-info">
        <ol>
          {history.map((_, idx) => (
            <li key={idx}>
              <button onClick={() => jumpTo(idx)}>
                {idx === 0 ? "Go to game start" : `Go to move: ${idx}`}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

const computeWinner = (board) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (board[a] === board[b] && board[b] === board[c]) {
      return board[a]
    }
  }

  return null
}