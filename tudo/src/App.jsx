
import NavBar from './components/Navbar'
import './App.css'

import List from './components/List'

function App() {
  return (
    <div className='app'>
      <NavBar></NavBar>
      <div className='content-app'>
        <h1>Teste</h1>
        <List></List>
      </div>
    </div>
  )
}

export default App
