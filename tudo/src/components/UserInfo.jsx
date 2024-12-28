import "./UserInfo.css";
export default function UserInfo() {
  return (
    <div className="userinfo">
        <h1>Dados do Usuario</h1>
      <form action="/teste">
      <input type="text" placeholder="Enter username" />
      <input type="text" placeholder="Email" />
      <div className="userinfor-tell">
        <input type="text" placeholder="(DD)" />
        <input type="text" placeholder="Tell" />
      </div>

      <input type="text" placeholder="Enter email or username" />
      <input type="text" placeholder="Enter email or username" />
      <input type="text" placeholder="Enter email or username" />
        <button>Editar</button>
      </form>
      </div>
  );
}
