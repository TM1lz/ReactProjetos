import { useState } from "react";
import styler from "./Register.module.css";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userCPassword, setUserCPassword] = useState("");
  const [error , setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("")
    const user = {
      userName,
      userEmail,
      userPassword
    }
    if(userPassword!== userCPassword){
      setError("As senhas precisam ser iguais")
      return
    }
    console.log(user)
  };

  return (
    <div className={styler.register}>
      <div className={styler.formbox} onSubmit={handleSubmit}>
        <form className={styler.form}>
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
          {error && <p>{error}</p>}
          <button>Cadastrar</button>
        </form>
        <div className={styler.formsection}>
          <p>
            Ja possui uam conta? <a href="/login">Entrar</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
