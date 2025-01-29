
// Importando o arquivo de estilos CSS específico para o componente Footer
import styles from "./Footer.module.css"

// Definindo o componente Footer
export default function Footer() {
  return (
    // A tag <footer> é usada para definir o rodapé da página. A classe 'footer' é aplicada do arquivo CSS.
    <footer className={styles.footer}>
        {/* Título que chama a atenção do usuário para escrever sobre seus interesses */}
        <h3>Escreva sobre o que você tem interesse</h3>
        {/* Parágrafo com a marca do blog e o ano de copyright */}
        <p>Mine Blog &copy; 2024</p>
    </footer>
  )
}

