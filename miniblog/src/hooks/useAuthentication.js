import { auth } from "../firebase/config";  // Importando auth corretamente
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState, useEffect } from "react";

const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [cancelled, setCancelled] = useState(false);

    // Função para criar usuário
    const createUser = async (user) => {
        if (cancelled) return;  // Impede a execução da função se o componente foi desmontado
        setLoading(true);
        setError(null); // Limpa erros anteriores

        try {
            const { user: firebaseUser } = await createUserWithEmailAndPassword(
                auth,
                user.email,
                user.password
            );

            // Atualiza o perfil do usuário no Firebase
            await updateProfile(firebaseUser, { displayName: user.displayName });
        } catch (error) {
            setError(error.message); // Corrige para passar a mensagem de erro
        } finally {
            setLoading(false); // Garantir que a flag de loading seja atualizada
        }
    };

    // Função de limpeza
    useEffect(() => {
        return () => setCancelled(true); // Marca que o componente foi desmontado
    }, []);

    return { createUser, error, loading };
};
// eslint-disable-next-line no-undef
de = useAuthentication;
