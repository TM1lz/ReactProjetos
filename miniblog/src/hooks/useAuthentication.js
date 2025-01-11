import {
  createUserWithEmailAndPassword,
  updateProfile,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"; // Importando funções do Firebase para autenticação
import { useState, useEffect } from "react"; // Importando hooks do React
import { auth } from "../firebase/config"; // Importando a instância de auth configurada no Firebase

const useAuthentication = () => {
  // Estado para controlar erros durante a autenticação
  const [error, setError] = useState(null);
  // Estado para controlar se está carregando (processo assíncrono)
  const [loading, setLoading] = useState(false);
  // Estado para verificar se o componente foi desmontado
  const [cancelled, setCancelled] = useState(false);

  // Função para criar um novo usuário
  const createUser = async (user) => {
    if (!cancelled) return; // Se o componente foi desmontado, não continua a execução
    setLoading(true); // Inicia o carregamento (loading)
    setError(null); // Limpa qualquer erro anterior

    try {
      // Tentando criar o usuário com email e senha
      const { user: firebaseUser } = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

      // Após criar o usuário, atualiza o nome de exibição (displayName) no Firebase
      await updateProfile(firebaseUser, { displayName: user.displayName });
    } catch (error) {
      // Em caso de erro, define a mensagem de erro no estado
      setError("Email invalido")
      console.log(error); // A mensagem de erro pode ser algo como 'email já em uso'
    } finally {
      // Quando o processo for concluído (sucesso ou falha), o loading é desativado
      setLoading(false);
    }
  };

  // Função para fazer login do usuário
  const loginUser = async (user) => {
    setLoading(true); 
    setError(null);
  
    try {
      console.log('Tentando login com:', user.email, user.password); // Verifique os dados aqui
      await signInWithEmailAndPassword(auth, user.email, user.password);
      console.log("login feito com sucesso");
    } catch (err) {
      setError( "Senha ou Email invalidos");
      console.log(err)
    } finally {
      setLoading(false);
    }
  };
  const logout = ()=>{
    
    signOut(auth)
  }
  

  // Hook de efeito para limpar o estado 'cancelled' quando o componente for desmontado
  useEffect(() => {
    return () => setCancelled(true); // Marca o componente como desmontado
  }, []);

  // Retorna as funções de autenticação, o estado de erro e de loading
  return { createUser, loginUser, error, loading , logout };
};

export default useAuthentication; // Exporta o hook para ser utilizado em outros componentes
