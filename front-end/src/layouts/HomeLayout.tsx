import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const HomeLayout = () => {
  return (
    <div className='flex flex-col justify-between '>
        <Header/>
        <div className='flex mt-[100px] '>
          <div className='scroll min-w-[250px] h-[calc(100vh-100px)] overflow-y-scroll '>
            <Sidebar/>
          </div>
          <div className='px-[100px]  flex-grow h-[calc(100vh-100px)] overflow-auto'>
            <Outlet/>
          </div>
        </div>
    </div>
  )
}

export default HomeLayout