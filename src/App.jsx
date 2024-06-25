import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import UserContext from './context/UserContext'
import FavoritesPage from './pages/FavoritesPage/FavoritesPage'
import JoyMessagesTemplate from './pages/MessagesPage/Messages'
import SignIn from './pages/SignInPage/SignIn'
import JoyRegisterSideTemplate from './pages/RegisterPage/Register'
import Home from './pages/HomePage/Home'

function App() {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userId')))



  return (

    <UserContext.Provider value={{ "user": user }}>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<Home />} />
            <Route path='login' element={<SignIn setUser={setUser} />} />
            <Route path='register' element={<JoyRegisterSideTemplate />} />
            <Route path='favorites' element={<FavoritesPage />} />
            <Route path='messages' element={<JoyMessagesTemplate />} />
          </Route>
        </Routes>
      </BrowserRouter >
    </UserContext.Provider>
  )
}

export default App
