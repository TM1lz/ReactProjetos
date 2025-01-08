// useAuthentication.js
import {
    createUserWithEmailAndPassword,
    updateProfile,
    getAuth,
    signInWithEmailAndPassword,
  } from "firebase/auth";
  import { useState, useEffect } from "react";
  import { auth } from "../firebase/config"; // Import the auth instance
  
  const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [cancelled, setCancelled] = useState(false);
    const auth = getAuth(); // Create auth instance here
  
    // Function to create a user
    const createUser = async (user) => {
      setLoading(true);
      setError(null); // Clear previous errors
  
      try {
        const { user: firebaseUser } = await createUserWithEmailAndPassword(
          auth,
          user.email,
          user.password
        );
  
        // Update user profile in Firebase
        await updateProfile(firebaseUser, { displayName: user.displayName });
      } catch (error) {
        setError(error.message); // Pass the error message
      } finally {
        setLoading(false); // Ensure loading flag is updated
      }
    };
  
    // Function to log in the user
    const loginUser = async (user) => {
      setLoading(true);
      try {
        const auth = getAuth(); // Create auth instance here
        await signInWithEmailAndPassword(auth, user.email, user.password);
        // Further handling after successful login (e.g., redirect or user info)
       
      } catch (error) {
        setError(error.message); // Pass the error message
      } finally {
        setLoading(false); // Ensure loading flag is updated
      }
   
      
    };
  
    // Cleanup function
    useEffect(() => {
      return () => setCancelled(true); // Mark the component as unmounted
    }, []);
  
    // Return both createUser and loginUser functions
    return { createUser, loginUser, error, loading };
  };
  
  export default useAuthentication; // Make sure to export the hook correctly
  