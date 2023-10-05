import React, { useMemo, useState } from 'react';
import {HiOutlineSearch} from 'react-icons/hi'
import type { MenuProps } from 'antd';
import { Dropdown, Modal } from 'antd';
import {BiSolidMessage, BiSolidBell, BiBookmark} from 'react-icons/bi';
import {CiLogout} from 'react-icons/ci';
import {MdAdd, MdOutlineNightlight} from 'react-icons/md';
import TooltipComp from './TooltipComp';
import { AiOutlineLogin, AiOutlineSetting, AiOutlineUser } from 'react-icons/ai';
import { Switch } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actLogout } from '../redux/features/userSlice';
import { AVATAR_URL } from '../constants/url';
import PostModal from './PostModal';

const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<Boolean>(false)
  const [isDark, setIsDark] = useState<Boolean>(false)
  const [openUpload, setOpenUpload] = useState(false);
  const navigate = useNavigate()
  const dispatch:any = useDispatch()
  const {myUser, accessToken, isLogged} = useSelector((state:any) => state.users)

  const handleToggleDarkMode = (checked: Boolean) => {
    setIsDark(checked)
  }
  
  const handleLogout = () => {
    dispatch(actLogout())
    navigate("/auth/login")
  }

  const handleGoLogin = () => {
    navigate("/auth/login")
  }


  //Stop menu close when click
  const handleOpenChange = (open:any) => {
    setIsOpenMenu(open)
  };

  const goProfile = (idUser:number) => {
    navigate(`/profile/${idUser}`)
  } 

  const goHomePage = () => {
    navigate(`/`)
  }

  // Lấy chữ cái đầu của tên
  const handleGetFirstLetterName = (name:string) => {
    const parts = name?.split(" ");
    let firstLetter
    if (parts?.length >= 2) {
      const lastName = parts[parts.length - 1];
      firstLetter = lastName.charAt(0);
    } else {
      const lastName1 = parts[0];
      firstLetter = lastName1.charAt(0);
    }
    return firstLetter.toUpperCase()
  }

  // Data menu
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div className='flex items-center gap-1 w-[200px] py-[5px]' onClick={() => goProfile(myUser?.id)}>
          <AiOutlineUser size='20px'/>
          <span className='font-semibold'>Xem hồ sơ</span>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div className='flex items-center gap-1 w-[200px] py-[5px]'>
          <BiBookmark size='20px'/>
          <span className='font-semibold'>Yêu thích</span>
        </div>
      ),
    },
    {
      key: '3',
      label: (
        <div className='flex items-center gap-1 w-[200px] py-[5px]'>
          <AiOutlineSetting size='20px'/>
          <span className='font-semibold'>Cài đặt</span>
        </div>
      ),
    },
    {
      key: '4',
      label: (
        <div className='flex items-center justify-between w-[200px] py-[5px]'>
          <div className='flex items-center gap-1'>
            <MdOutlineNightlight size='20px'/>
            <span className='font-semibold'>Chế độ tối</span>
          </div>
          <Switch size="small"  onChange={handleToggleDarkMode} checked={!!isDark} />
        </div>
      ),
    },
    {
      key: '5',
      label: (
        <div className='flex items-center gap-1 w-[200px] py-[5px] border-t' onClick={handleLogout}>
          <CiLogout size='20px'/>
          <span className='font-semibold'>Đăng xuất</span>
        </div>
      ),
    },
  ];
  return (
    <header className='fixed z-20 bg-white top-0 left-0 right-0 flex items-center justify-between px-[20px] py-[10px] shadow'>
      <div className='flex-1'>
        <h1 className="text-[24px] logo text-red-500 cursor-pointer" onClick={goHomePage}>MyPodCast</h1>
      </div>
      <div className="flex-1 flex items-center justify-between gap-3 bg-gray-100 w px-[10px] py-[10px] rounded-full">
        <input type="text" placeholder='Tìm kiếm' className="outline-none bg-transparent border-r-2 border-gray-500 w-[95%]"/>
        <button>
          <HiOutlineSearch size='20px' color='#6B7280'/>
        </button>
      </div>
      {
        accessToken && isLogged ? 
        <div className='flex-1 flex justify-end items-center gap-5'>
          <button className='px-[10px] py-[5px] flex items-center gap-2 border-[2px] font-semibold rounded bg-gray-200' onClick={() => setOpenUpload(true)}>
            Đăng <MdAdd size="24px"/>
          </button>
          <TooltipComp text={"Tin nhắn"}>
            <BiSolidMessage size="24px" className="cursor-pointer text-gray-500"/>
          </TooltipComp>
          <TooltipComp text={"Thông báo"}>
            <BiSolidBell size="24px" className="cursor-pointer text-gray-500"/>
          </TooltipComp>
          <Dropdown menu={{ items }} open={!!isOpenMenu} onOpenChange={handleOpenChange} placement="bottomRight" arrow={{ pointAtCenter: true }}>
            {
              myUser?.avatar ?
                <img className="w-[35px] h-[35px] object-cover rounded-full cursor-pointer" src={`${AVATAR_URL}${myUser?.avatar}`} alt="Rounded avatar"/>
              :
              <div className='flex items-center justify-center w-[35px] h-[35px] bg-gray-300 rounded-full cursor-pointer'>
                {
                  myUser?.name &&
                  <div className='font-medium text-[20px] text-white'>{handleGetFirstLetterName(myUser?.name)}</div>
                }
              </div>
            }
          </Dropdown>
        </div> :
        <div className='flex-1 flex justify-end items-center gap-5'>
          <button className='px-[10px] py-[5px] flex items-center gap-2 border-[2px] font-semibold rounded bg-black text-white' onClick={() => handleGoLogin()}>
            Đăng nhập <AiOutlineLogin size="20px"/>
          </button>
        </div>
      }
      <PostModal openUpload={openUpload} setOpenUpload={setOpenUpload}/>
    </header>
  )
}

export default Header