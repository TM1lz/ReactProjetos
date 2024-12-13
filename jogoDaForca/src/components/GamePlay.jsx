import "./GamePlay.css"
import './GamePlay.css'
export default function GamePlay() {
  return (
    <div className="game">
      <p className="points">
        <span>Pontuacao : 000</span>
      </p>
      <h1>Adivinha a Palavra</h1>
      <h3 className="tip"> 
        Dica sobre a palavra 
        <span> Dica:</span>
      </h3>
      <div className="wordContainer">
        <span className="letter">A</span>
        <span className="blankSquere">B</span>
      </div>
      <div className="latterContainer">
        <p>Tente Adivinha uma letra</p>
        <form >
          <input type="text" name="letter" maxLength = "1" required/>
          <button onClick={()=>console.log("Teste")}>Jogar</button>

        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras Ultilizadas</p>
        <span>a</span>
        <span>b</span>
      </div>
    </div>
  )
}
