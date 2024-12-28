
import NavBar from './components/Navbar'
import './App.css'
//Componentns
import List from './components/List'
import UserInfo from './components/UserInfo'

function App() {
  return (
    <div className='app'>
      <NavBar></NavBar>
      <div className='content-app'>
        {/* <List></List> */}
        <UserInfo></UserInfo>
      </div>
    </div>
  )
}

export default App
