//Imports of component
import GamePlay from "./components/GamePlay";
import EndGame from "./components/EndGame";
import StartScreen from "./components/StartScreen";
import { wordList } from "./data/palavrasword";

//Import css end ReactJS
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
  const [pickedCategory, setPikedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const pickWordAndCategory = () => {
    // Obter todas as categorias
    const categories = Object.keys(words);

    // Gerar um índice aleatório para a categoria
    const randomIndex = Math.floor(Math.random() * categories.length);

    // Selecionar uma categoria aleatória
    const category = categories[randomIndex];
    // Pegar uma palavra aleatória dessa categoria
    const wordList = words[category];
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    // Exibir a palavra selecionada
    console.log(randomWord);
    console.log(category)
    return {randomWord , category}
  };

  const startGame = () => {
    setGameStage(stage[1].name);
    const {randomWord , category} =pickWordAndCategory();
    console.log(randomWord , category , "StartGame" )
    let wordLetters = randomWord.split('')
    wordLetters = wordLetters.map((l)=>l.toLowerCase())
    console.log(wordLetters)
//Create an arrey of latters
  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && <GamePlay />}
      {gameStage === "end" && <EndGame />}
    </div>
  );
}

export default App;
