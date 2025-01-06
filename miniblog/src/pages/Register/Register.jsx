import { useState } from "react";
import styler from "./Register.module.css";
import  useAuthentication  from "../../hooks/useAuthentication";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userCPassword, setUserCPassword] = useState("");
  const { createUser , error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Limpar erro anterior
    if (userPassword !== userCPassword) {
      return alert("As senhas precisam ser iguais");
    }

    const user = {
      displayName: userName,
      email: userEmail,
      password: userPassword,
    };

    try {
      console.log(user)
      await createUser(user); // Chamar a função de registro do hook
    } catch (error) {
      console.log(error);            
    }
  };

  return (
    <div className={styler.register}>
      <div className={styler.formbox}>
        <form className={styler.form} onSubmit={handleSubmit}>
          <span className={styler.title}>Cadastrar-se</span>
          <span className={styler.subtitle}>
            Crie uma conta gratuita com seu e-mail.
          </span>
          <div className={styler.formcontainer}>
            <input
              type="text"
              className={styler.input}
              placeholder="Nome completo"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="email"
              className={styler.input}
              placeholder="E-mail"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <input
              type="password"
              className={styler.input}
              onChange={(e) => setUserPassword(e.target.value)}
              placeholder="Senha"
              value={userPassword}
            />
            <input
              type="password"
              className={styler.input}
              onChange={(e) => setUserCPassword(e.target.value)}
              placeholder="Confirme a Senha"
              value={userCPassword}
            />
          </div>
          {authError && <p>{authError}</p>} {/* Exibir erro do hook */}
          {loading && <p>Carregando...</p>} {/* Exibir carregando */}
          <button type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>
        <div className={styler.formsection}>
          <p>
            Já possui uma conta? <a href="/login">Entrar</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
