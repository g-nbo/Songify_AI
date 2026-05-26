import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { UserProvider } from './context/UserContext'
import PrivateRoute from './components/PrivateRoute'
import FavoritesPage from './pages/FavoritesPage/FavoritesPage'
import JoyMessagesTemplate from './pages/MessagesPage/Messages'
import SignIn from './pages/SignInPage/SignIn'
import JoyRegisterSideTemplate from './pages/RegisterPage/Register'
import Home from './pages/HomePage/Home'

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<Home />} />
            <Route path='login' element={<SignIn />} />
            <Route path='register' element={<JoyRegisterSideTemplate />} />
            <Route path='favorites' element={<PrivateRoute><FavoritesPage /></PrivateRoute>} />
            <Route path='messages' element={<PrivateRoute><JoyMessagesTemplate /></PrivateRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
