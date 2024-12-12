import "./StartScreen.css"
import PropTypes from 'prop-types';
export default function StartScreen({startGame}) {
  return (
    <div>
        <h1>Jogo da Forca</h1>
        <p>Clique no botao a baixo para jogar</p>
        <button onClick={startGame}>Jogar</button>
    </div>
  )
}
StartScreen.propTypes = {
    startGame: PropTypes.func.isRequired
  };
