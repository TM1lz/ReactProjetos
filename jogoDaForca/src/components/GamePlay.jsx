import React, { useState } from "react";
import "./GamePlay.css";

export default function GamePlay({
  wrongLetters,
  guesses,
  guessedLetters,
  score,
  pickedCategory,
  letters,
  handleGuess,
}) {
  const [letterInput, setLetterInput] = useState("");

  // Função para processar a tentativa de adivinhar a letra
  const handleSubmit = (e) => {
    e.preventDefault();

    // Converte a entrada para minúscula antes de passar para handleGuess
    const letter = letterInput.toLowerCase();
    if (letter) {
      handleGuess(letter);
    }
    setLetterInput(""); // Limpa o input após a tentativa
 console.log(displayWord)
  };

  // Renderiza a palavra com letras adivinhadas e espaços para as não adivinhadas
  const displayWord = letters
    .map((letter, index) =>
      guessedLetters.includes(letter) ? letter : "_"
    )
    .join(" ");

  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: {score}</span>
      </p>
      <h1>Adivinha a Palavra</h1>
      <h3 className="tip">
        Dica: {pickedCategory}
        <p>Você ainda tem {guesses} tentativas</p>
      </h3>

      <div className="wordContainer">
        <span>{displayWord}</span>
      </div>

      <div className="letterContainer">
        <p>Tente adivinhar uma letra:</p>
        <form onSubmit={handleSubmit}>
          <input className="inq"
            type="text"
            value={letterInput}
            onChange={(e) => setLetterInput(e.target.value)}
            maxLength="1"
            required
          />
          <button type="submit">Jogar</button>
        </form>
      </div>

      <div className="wrongLettersContainer">
        <p>Letras Erradas:</p>
        <span>{wrongLetters.join(", ")}</span>
      </div>
    </div>
  );
}

