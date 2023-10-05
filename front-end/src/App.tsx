import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import HomeLayout from './layouts/HomeLayout';
import ProfilePage from './pages/ProfilePage';
import FollowingPage from './pages/FollowingPage';
import ExplorePage from './pages/ExplorePage';
import LivePage from './pages/LivePage';
import NotFoundPage from './pages/NotFoundPage';
import AuthLayout from './layouts/AuthLayout';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/RegisterPage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actReLogin } from './redux/features/userSlice';
function App() {
  const token:string | null = localStorage.getItem("token")

  const dispatch:any = useDispatch()
  useEffect(() => {
    if(token) {
      dispatch(actReLogin(token))
    }
  },[token])

  return (
    <div className='App '>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomeLayout/>}>
            <Route index element={<HomePage />} />
            <Route path='/profile/:id' element={<ProfilePage />} />
            <Route path='/following' element={<FollowingPage />} />
            <Route path='/explore' element={<ExplorePage />} />
            <Route path='/live' element={<LivePage />} />
          </Route>
          <Route path='/auth' element={<AuthLayout/>}>
            <Route path='login' element={<LoginPage />} />
            <Route path='register' element={<RegisterPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
