import { auth } from "../firebase/config";  // Importando auth corretamente
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState, useEffect } from "react";

const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [cancelled, setCancelled] = useState(false);

    const createUser = async (user) => {
        console.log("teste", user);
        setLoading(true);

        try {
            // Aguardar o retorno da promise do Firebase
            const { user: firebaseUser } = await createUserWithEmailAndPassword(
                auth,
                user.email,
                user.password
            );
            // Atualizando o perfil do usuário no Firebase
            await updateProfile(firebaseUser, { displayName: user.displayName });
        } catch (error) {
            setError(error.message); // Corrigido para passar a mensagem de erro diretamente
        }
        setLoading(false);
    };

    useEffect(() => {
        return () => setCancelled(true); // Cleanup
    }, []);

    return { createUser, error, loading }; // Expondo o erro corretamente
};

export default useAuthentication;
