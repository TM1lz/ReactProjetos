import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Correct import for routing
import NavBar from './components/Navbar';
import './App.css';

// Componentes
import List from './components/List';
import UserInfo from './components/UserInfo';

function App() {
  return (
    <Router>
      <div className='app'>
        <NavBar />
        <div className='content-app'>
          <Routes>
            <Route path="/" element={<List />} />
            <Route path="/user/:id" element={<UserInfo />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

