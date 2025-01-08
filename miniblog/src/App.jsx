import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
// components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
// pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
// Hooks
import { useState, useEffect } from "react";
// context
import { AuthProvider } from "./context/AuthContext";
// firebase
import { auth } from "./firebase/config"; // Importe corretamente o auth

import { onAuthStateChanged } from "firebase/auth"; // Importe corretamente a função do Firebase

function App() {
  const [user, setUser] = useState(undefined);
  const loadingUser = user === undefined;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Cleanup function to unsubscribe from auth state change when the component unmounts
    return () => unsubscribe();
  }, []); // A dependência do useEffect é apenas a instância auth

  if (loadingUser) {
    return <p>Loading...</p>;
  }

  return (
    <div className="app">
      <AuthProvider value={{user}}>
        <BrowserRouter>
          <NavBar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
