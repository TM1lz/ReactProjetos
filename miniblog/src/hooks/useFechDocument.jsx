import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export const useFetchDocument = (docCollection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDocument = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, docCollection, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDocument(docSnap.data());
        } else {
          throw new Error("Documento não encontrado");
        }
      } catch (error) {
        console.error(error);
        setError(error);  // Mantendo o erro como um objeto para mais detalhes
      } finally {
        setLoading(false);
      }
    };

    loadDocument();

    return () => {
      // Não é mais necessário configurar `canceled` aqui
    };
  }, [docCollection, id]);  // Removendo `canceled` das dependências

  return { document, loading, error };
};
