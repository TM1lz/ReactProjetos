import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

// Hooks
import { useState, useEffect } from "react";

// Context
import { AuthProvider } from "./context/AuthContext";

// Firebase
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import CreatePost from "./pages/CreatePost/CreatePost";
import Post from "./pages/Post/Post";

function App() {
  const [user, setUser] = useState(undefined);
  const loadingUser = user === undefined;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="app">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <NavBar />
          <div className="container">
            <Routes>
              <Route path="/post/:id" element = {<Post/>}></Route>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/login"
                element={user ? <Navigate to="/" /> : <Login />}
              />
              <Route
                path="/register"
                element={user ? <Navigate to="/" /> : <Register />}
              />
              <Route
                path="/create-post"
                element={!user ? <Navigate to="/" /> : <CreatePost />}
              />
            </Routes>
          </div>
        </BrowserRouter>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
