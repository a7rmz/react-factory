import { useState } from "react";

const Square = ({ value, onClick }) => {
  return <button className="square" onClick={onClick}>{value}</button>;
}

export default function Board() {
  const [player, setPlayer] = useState("X")
  const [board, setBoard] = useState(Array(9).fill(null))
  const winner = computeWinner(board)
  const gameOver = winner !== null || board.every(square => square !== null)

  const handleOnClick = (idx) => {
    if (gameOver || board[idx] !== null) return

    const nextBoard = board.slice(0)

    nextBoard[idx] = player

    setBoard(nextBoard)
    setPlayer(player === "X" ? "O" : "X")
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