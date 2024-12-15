import GamePlay from "./components/GamePlay";
import EndGame from "./components/EndGame";
import StartScreen from "./components/StartScreen";
import { wordList } from "./data/palavrasword";
import "./App.css";
import { useState, useEffect, useCallback } from "react";

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

  const pickWordAndCategory = () => {
    const categories = Object.keys(words);
    const randomIndex = Math.floor(Math.random() * categories.length);
    const category = categories[randomIndex];
    const wordList = words[category];
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];

    return { randomWord, category };
  };

  const startGame = () => {
    setGameStage(stage[1].name);
    const { randomWord, category } = pickWordAndCategory();
    setPickedCategory(category);
    setPickedWord(randomWord);
    let wordLetters = randomWord.split("").map((l) => l.toLowerCase());
    setLetters(wordLetters);
  };

  const handleGuess = (letter) => {
    // Converte para minúscula antes de comparar
    letter = letter.toLowerCase();
  
    // Evita múltiplas tentativas da mesma letra
    if (guessedLetters.includes(letter) || wrongLetters.includes(letter)) {
      return console.log("teste");
    }
  
    // Verificar se a letra está na palavra
    if (pickedWord.includes(letter)) {
      setGuessedLetters((prevGuessedLetters) => [...prevGuessedLetters, letter]);
      setScore(score + 10);
    } else {
      if (guesses == 1 ) {
        setGameStage(stage[2].name);
      }else{
        setGuesses(guesses - 1);
      }}
      
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
      {gameStage === "end" && <EndGame score={score} letters={letters}/>}
    </div>
  );
}

export default App;
