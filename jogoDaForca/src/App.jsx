import GamePlay from "./components/GamePlay";
import EndGame from "./components/EndGame";
import StartScreen from "./components/StartScreen";
import { wordList } from "./data/palavrasword";
import "./App.css";
import { useState } from "react";

const stage = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  const [gameStage, setGameStage] = useState(stage[0].name);
  const [words] = useState(wordList);
  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);  // Max attempts
  const [score, setScore] = useState(0);

  // Função para escolher palavra e categoria
  const pickWordAndCategory = () => {
    const categories = Object.keys(words);
    const randomIndex = Math.floor(Math.random() * categories.length);
    const category = categories[randomIndex];
    const wordList = words[category];
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];

    return { randomWord, category };
  };

  // Função para reiniciar o jogo
  const resetGame = () => {
    setScore(0);
    setGuesses(3);
    setGameStage(stage[0].name);
    setLetters([]);
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  // Inicia o jogo
  const startGame = () => {
    setGameStage(stage[1].name);
    const { randomWord, category } = pickWordAndCategory();
    setPickedCategory(category);
    setPickedWord(randomWord);
    let wordLetters = randomWord.split("").map((l) => l.toLowerCase());
    setLetters(wordLetters);
  };

  // Função para lidar com a tentativa do jogador
  const handleGuess = (letter) => {
    letter = letter.toLowerCase();

    if (guessedLetters.includes(letter) || wrongLetters.includes(letter)) {
      return console.log("Você já tentou essa letra");
    }

    if (pickedWord.includes(letter)) {
      setGuessedLetters((prevGuessedLetters) => [...prevGuessedLetters, letter]);
      setScore(score + 10);
    } else {
      setWrongLetters((prevWrongLetters) => [...prevWrongLetters, letter]);
      if (guesses === 1) {
        setGameStage(stage[2].name); // Finaliza o jogo
      } else {
        setGuesses(guesses - 1); // Diminui as tentativas restantes
      }
    }
  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <GamePlay
          guessedLetters={guessedLetters}
          letters={letters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
          pickedCategory={pickedCategory}
          handleGuess={handleGuess}
        />
      )}
      {gameStage === "end" && <EndGame resetGame={resetGame} score={score} letters={letters} />}
    </div>
  );
}

export default App;
