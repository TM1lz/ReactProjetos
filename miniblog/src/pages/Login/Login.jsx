import { useState } from "react";
import styler from "./Login.module.css";
import useAuthentication from "../../hooks/useAuthentication";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const { loginUser, error: authError, loading } = useAuthentication(); // Destructure loginUser here

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userEmail || !userPassword) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(userEmail)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setErrorMessage(""); // Clear any previous error messages

    const user = {
      email: userEmail,
      password: userPassword,
    };

    try {
      await loginUser(user); // Call the login function
    } catch (error) {
      setErrorMessage("Failed to login. Please check your credentials.");
      console.log(error); // Optionally log the error
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
          
          {/* Display the error message */}
          {errorMessage && <p className={styler.error}>{errorMessage}</p>}
          
          <button type="submit" disabled={loading}>
            {loading ? 'Carregando...' : 'Login'}
          </button>
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
