import { useState, useEffect , useRef  } from 'react';

function generateRandomNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}

export default function Home() {
  const [num1, setNum1] = useState(generateRandomNumber(10));
  const [num2, setNum2] = useState(generateRandomNumber(10));
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
    const timer = setTimeout(() => {
      setGameOver(true);
      document.getElementById("inputt").click();
    }, 5000); // One minute

    return () => clearTimeout(timer);
  }, []);

  const startTimer = () => {
    const timer = setTimeout(() => {
      setGameOver(true);
    }, 5000); // One minute

    return () => clearTimeout(timer);
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (gameOver) return; // Prevent submitting after the game is over

    const result = parseInt(userInput);
    if (result === num1 + num2) {
      setScore(score + 1);
      setMessage('Correct!');
    } else {
      setMessage('Incorrect. Try again.');
    }
    // Generate new numbers for the next question
    setNum1(generateRandomNumber(10));
    setNum2(generateRandomNumber(10));
    setUserInput('');
  };

  const ResetGame = (event) => {
    event.preventDefault();
    setGameOver(false);
    setUserInput('');
    setMessage('');
    startTimer();
    setNum1(generateRandomNumber(10));
    setNum2(generateRandomNumber(10));
    setScore(0);
    document.getElementById("inputt").click();
  }

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-100">
      <div className="bg-white mt-5 p-8 rounded-lg shadow-md">
        <h1 className="text-3xl text-green-500 font-bold mb-4">Calculation Practice</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center mb-4">
            <div className="text-xl mr-2 text-black-500">{num1} + {num2} =</div>
            <input
              ref={inputRef}
              id='inputt'
              className="border border-gray-300 p-2 w-20 text-black-500"
              type="number"
              value={userInput}
              onChange={handleInputChange}
              autoFocus
              
              disabled={gameOver} // Disable input when game is over
            />
          </div>
          {!gameOver && <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" disabled={gameOver}>Check Answer</button>}
        </form>
          {gameOver && <button onClick={ResetGame} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" disabled={!gameOver}>Try again</button>}
        <p className="mt-4">{message}</p>
        {gameOver && <p className="mt-4 text-red-500">Game over!</p>}
        <p className="mt-4">Score: {score}</p>
      </div>
    </div>
  );
}
