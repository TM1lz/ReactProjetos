import styler from './Login.module.css'

const Login = () => {
  return (
    <div className={styler.login}>
      <div className={styler.formbox}>
        <form className={styler.form}>
          <span className={styler.title}>Login</span>
          <span className={styler.subtitle}>Faca loguin para mais acesso ao site.</span>
          <div className={styler.formcontainer}>
            <input type='email' className={styler.input} placeholder='E-mail' />
            <input type='password' className={styler.input} placeholder='Senha' />
          </div>
          <button>Cadastrar</button>
        </form>
        <div className={styler.formsection}>
          <p>Nao possui uma conta <a href='/register'>Entrar</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
