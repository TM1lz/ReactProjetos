import { useState, useEffect, useReducer } from 'react';
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const initialState = {
    loading: false,
    error: null,
};

const insertReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return { loading: true, error: null };
        case "INSERT_DOC":
            return { loading: false, error: null };
        case "ERROR":
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const useInsertDocument = (docCollection) => {
    const [response, dispatch] = useReducer(insertReducer, initialState);
    const [cancelled, setCancelled] = useState(false);

    const checkCancelledBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action);
        }
    };

    const insertComment = async (document) => {
        try {
            // Adicionando a data de criação
            const newDocument = { ...document, createdAt: Timestamp.now() };

            // Dispatching 'LOADING' antes de iniciar a inserção
            dispatch({ type: "LOADING" });

            // Adicionando o novo documento à coleção
            await addDoc(collection(db, docCollection), newDocument);

            // Verificando se a operação não foi cancelada antes de finalizar
            checkCancelledBeforeDispatch({
                type: "INSERT_DOC",
            });
        } catch (error) {
            // Se ocorrer um erro, processamos a mensagem e o tipo
            const errorMessage = error.message || "Erro desconhecido";
            checkCancelledBeforeDispatch({
                type: "ERROR",
                payload: errorMessage,
            });
        }
    };

    useEffect(() => {
        // Marcar o cancelamento da operação no unmount
        return () => setCancelled(true);
    }, []);

    return {
        insertComment,
        response,
    };
};
