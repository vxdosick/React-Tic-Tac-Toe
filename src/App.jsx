import {useState} from "react"
function App() {
  const MOVE_X = "X"
  const MOVE_O = "O"

  const [moves, setMoves] = useState([null, null, null, null, null, null, null, null, null])
  const [currentMove, setCurrentMove] = useState(MOVE_X)
  const [gameWinner, setGameWinner] = useState(null)

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const winner = (moves) => {
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i]
      if (moves[a] && moves[a] == moves[b] && moves[a] == moves[c]) {
        return moves[a]
      }
    }
    return null;
  }
  

  const handleTurn = (i) => {
    if (moves[i] || gameWinner) {
      return;
    }
  
    const newMoves = moves.slice();
    newMoves[i] = currentMove;
    setMoves(newMoves);
  
    const winnerResult = winner(newMoves);
    if (winnerResult) {
      setGameWinner(winnerResult);
      return;
    }
  
    if (!newMoves.includes(null)) {
      setGameWinner("Draw <3");
      return;
    }
  
    setCurrentMove(currentMove === MOVE_X ? MOVE_O : MOVE_X);
  };

  const tryAgain = () => {
    setMoves([null, null, null, null, null, null, null, null, null])
    setCurrentMove(MOVE_X)
    setGameWinner(null)
  }

  return (
    <>
      <div className="container">
        <div className="container__game">
          <h2 className="container__title">Tic Tac Toe</h2>
          {gameWinner == "Draw <3" ? <h3><span className="draw">{gameWinner}</span></h3> : ( gameWinner ? <h3>Game winner: <span className={gameWinner == MOVE_X ? "move__x" : "move__o"}>{gameWinner}</span></h3> : <h3>Current turn: <span className={currentMove == MOVE_X ? "move__x" : "move__o"}>{currentMove}</span></h3>)}
          <div className="container__gameplace">
            {moves.map((move, index) => {
              return (
                <button key = {index} onClick={() => handleTurn(index)}>
                  {move == MOVE_X ? <span className="move__x">{move}</span> : <span className="move__o">{move}</span>}
                </button>
              )
            })}
          </div>
          <button className="container__again" onClick={tryAgain}>Try again</button>
        </div>
      </div>
    </>
  )
}

export default App
