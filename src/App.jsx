import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import MusicPage from './pages/MusicPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import UserContext from './context/UserContext'
import FavoritesPage from './pages/FavoritesPage'
import JoyMessagesTemplate from './pages/MessagesPage/Messages'
import JoySignInSideTemplate from './pages/SignInPage/SignIn'
import JoyRegisterSideTemplate from './pages/RegisterPage/Register'

function App() {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userId')))
  
  

  return (
    
    <UserContext.Provider value={{"user": user}}>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<HomePage />} />
            <Route path='login' element={<JoySignInSideTemplate setUser={setUser} />} />
            <Route path='register' element={<JoyRegisterSideTemplate />} />
            <Route path='music' element={<MusicPage />} />
            <Route path='favorites' element={<FavoritesPage />} />
            <Route path='landing' element={<JoyMessagesTemplate />} />
          </Route>
        </Routes>
      </BrowserRouter >
    </UserContext.Provider>
  )
}

export default App
