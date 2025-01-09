import { useState } from "react";
import styler from "./Login.module.css";
import useAuthentication from "../../hooks/useAuthentication";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State para mensagem de erro
  const { loginUser, error: authError, loading } = useAuthentication(); // Obtemos a função de login e o erro de autenticação

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("teste click" , userPassword)

    // Verificando se os campos estão preenchidos
    if (!userEmail || !userPassword) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    setErrorMessage(""); // Limpando a mensagem de erro anterior

    const user = {
      email: userEmail,
      password: userPassword,
    };
console.log(user)
    try {
      await loginUser(user); // Chama a função de login
    } catch (error) {
      console.log(error); // Para depuração, você pode verificar o erro completo
      // Checando o tipo de erro e exibindo mensagens específicas
      if (error.message.includes("auth/wrong-password")) {
        setErrorMessage("Senha incorreta. Tente novamente.");
      } else if (error.message.includes("auth/user-not-found")) {
        setErrorMessage("Usuário não encontrado. Verifique seu e-mail.");
      } else {
        setErrorMessage("Falha ao fazer login. Verifique suas credenciais.");
      }
    }
  };

  return (
    <div className={styler.login}>
      <div className={styler.formbox}>
        <form className={styler.form} onSubmit={handleSubmit}>
          <span className={styler.title}>Login</span>
          <span className={styler.subtitle}>
            Faça login para mais acesso ao site.
          </span>
          <div className={styler.formcontainer}>
            <input
              type="email"
              className={styler.input}
              placeholder="E-mail"
              onChange={(e) => setUserEmail(e.target.value)}
              value={userEmail}
            />
            <input
              type="password"
              className={styler.input}
              placeholder="Senha"
              onChange={(e) => setUserPassword(e.target.value)}
              value={userPassword}
            />
          </div>
          
          {errorMessage && <p className={styler.error}>{errorMessage}</p>}
          
          <button type="submit" disabled={loading} onClick={handleSubmit}>
            {loading ? 'Carregando...' : 'Login'}
          </button>
          {authError}
        </form>
        <div className={styler.formsection}>
          <p>
            Não possui uma conta? <a href="/register">Cadastrar</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
