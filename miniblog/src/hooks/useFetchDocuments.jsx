import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, query, orderBy, onSnapshot, where } from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [canceled, setCanceled] = useState(false);

    useEffect(() => {
        if (canceled) return;

        const loadData = async () => {
            setLoading(true);
            const collectionRef = collection(db, docCollection);

            try {
                let q = query(collectionRef, orderBy("createdAt", "desc"));
                
                if (search) {
                    q = query(q, where("field", "==", search)); // Exemplo de filtro com search
                }

                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    setDocuments(
                        querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    );
                    setLoading(false);
                });

                // Cleanup when component is unmounted or canceled
                return () => unsubscribe();
            } catch (error) {
                console.log(error);
                setError(error);
                setLoading(false);
            }
        };

        loadData();

        // Cleanup on cancel
        return () => {
            setCanceled(true);
        };
    }, [docCollection, search, uid, canceled]);

    return { documents, loading, error };
};
