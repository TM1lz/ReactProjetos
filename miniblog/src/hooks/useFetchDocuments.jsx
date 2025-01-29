import { useState, useEffect } from "react"; // Importando hooks do React
import { db } from "../firebase/config"; // Importando a configuração do Firebase
import { collection, query, orderBy, onSnapshot, where } from "firebase/firestore"; // Importando funções do Firebase Firestore

// Custom Hook para buscar documentos de uma coleção no Firestore
export const useFetchDocuments = (docCollection, search = null, uid = null) => {
    // Estado para armazenar os documentos recuperados
    const [documents, setDocuments] = useState(null);
    
    // Estado para armazenar erros, caso ocorram
    const [error, setError] = useState(null);
    
    // Estado para controlar o carregamento dos dados
    const [loading, setLoading] = useState(true);
    
    // Estado para evitar chamadas de rede após o componente ser desmontado
    const [canceled, setCanceled] = useState(false);

    useEffect(() => {
        // Se o efeito foi cancelado, não faz nada
        if (canceled) return;

        const loadData = async () => {
            setLoading(true); // Inicia o carregamento
            const collectionRef = collection(db, docCollection); // Referência à coleção no Firestore

            try {
                // Criando uma consulta ordenada pela data de criação (assumindo que 'createdAt' é um campo)
                let q = query(collectionRef, orderBy("createdAt", "desc"));
                
                // Se um valor de pesquisa for fornecido, aplica um filtro (usando 'where' no campo)
                if (search) {
                    q = query(q, where("field", "==", search)); // Exemplo de filtro com o parâmetro 'search'
                }

                // Criando um "listener" para observar mudanças na coleção e retornar os dados em tempo real
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    // Mapear os documentos e retornar com o ID e os dados
                    setDocuments(
                        querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    );
                    setLoading(false); // Define o estado de carregamento como falso após a conclusão
                });

                // Cleanup (desinscrever-se) quando o componente for desmontado ou a busca for cancelada
                return () => unsubscribe();
            } catch (error) {
                console.log(error); // Log de erro
                setError(error); // Armazena o erro no estado
                setLoading(false); // Finaliza o estado de carregamento, mesmo em caso de erro
            }
        };

        // Chama a função para carregar os dados
        loadData();

        // Cleanup em caso de cancelamento
        return () => {
            setCanceled(true); // Marca como cancelado
        };
    }, [docCollection, search, uid, canceled]); // Dependências: se algum desses valores mudar, o efeito será executado novamente

    return { documents, loading, error }; // Retorna os estados de documentos, loading e error
};
