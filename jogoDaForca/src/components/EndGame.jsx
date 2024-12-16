import "./EndGame.css"

export default function EndGame({score , letters , resetGame}) {
  return (
    <div>
         <div>
             <h1>Jogo da Forca</h1>
             <h1>A palavra era : {letters}</h1>
             <p> Seu Score foi : {score}</p>
             <button onClick={resetGame}>Jogar</button>
         </div>
    </div>
  )
}
