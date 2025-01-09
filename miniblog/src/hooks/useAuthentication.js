import {
  createUserWithEmailAndPassword,
  updateProfile,
  getAuth,
  signInWithEmailAndPassword,
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
    if (cancelled) return; // Se o componente foi desmontado, não continua a execução
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
      setError(error.message || "Ocorreu um erro"); // A mensagem de erro pode ser algo como 'email já em uso'
    } finally {
      // Quando o processo for concluído (sucesso ou falha), o loading é desativado
      setLoading(false);
    }
  };

  // Função para fazer login do usuário
  const loginUser = async (user) => {
    if (cancelled) return; // Verifica se o componente foi desmontado antes de continuar
    setLoading(true); // Inicia o carregamento
    setError(null); // Limpa o erro anterior

    try {
      // Tentando fazer o login com o email e a senha fornecidos
      await signInWithEmailAndPassword(auth, user.email, user.password);
      // Aqui você pode adicionar lógica extra, como redirecionar o usuário após o login bem-sucedido
    } catch (error) {
      // Em caso de erro, exibe a mensagem de erro
      setError(error.message || "Ocorreu um erro ao fazer login");
    } finally {
      // O loading é desativado após o processo (sucesso ou falha)
      setLoading(false);
    }
  };

  // Hook de efeito para limpar o estado 'cancelled' quando o componente for desmontado
  useEffect(() => {
    return () => setCancelled(true); // Marca o componente como desmontado
  }, []);

  // Retorna as funções de autenticação, o estado de erro e de loading
  return { createUser, loginUser, error, loading };
};

export default useAuthentication; // Exporta o hook para ser utilizado em outros componentes
