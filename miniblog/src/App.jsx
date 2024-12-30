import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
// components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
// pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";


function App() {
  return (
    <div className="app">
      <BrowserRouter>
      <NavBar/>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" element={<About/>}></Route>
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
