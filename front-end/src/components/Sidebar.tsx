import React, { useEffect, useState } from 'react'
import {AiFillHome, AiOutlineTeam, AiFillCompass} from 'react-icons/ai'
import {RiLiveFill} from 'react-icons/ri'
import { NavLink } from "react-router-dom";
import AvatarInfo from './AvatarInfo';
import { useDispatch, useSelector } from 'react-redux';
import { actGetMyFollowing } from '../redux/features/followSlice';
import { user } from '../constants/types';

const Sidebar = () => {
    const dispatch:Function = useDispatch()
    const {myFollowing} = useSelector((state:any) => state.follow)
    const {myUser} = useSelector((state:any) => state.users)
    const [displayFollow, setDisplayFollow] = useState(6)

    const handleSeeMore = () => {
        setDisplayFollow(prev => prev + 6)
    } 

    const handleResetSeeMore = () => {
        setDisplayFollow(6)
    }

    useEffect(() => {
        dispatch(actGetMyFollowing(myUser?.id))
    },[myUser])
    
  return (
    <div className='px-[20px] '>
        <div className=''>
            <ul className='flex flex-col gap-5 pb-[25px] border-b '>
                <NavLink to="/">
                    <li className='flex items-center gap-[5px]'>
                        <AiFillHome size="20px"/>
                        <span className="font-semibold text-[16px]">Dành cho bạn</span>
                    </li>
                </NavLink>
                <NavLink  to="/following">
                    <li className='flex items-center gap-[5px]'>
                        <AiOutlineTeam size="20px"/>
                        <span className="font-semibold text-[16px]">Đang Follow</span>
                    </li>
                </NavLink>
                <NavLink to="/explore">
                    <li className='flex items-center gap-[5px]'>
                        <AiFillCompass size="20px"/>
                        <span className="font-semibold text-[16px]">Khám phá</span>
                    </li>
                </NavLink>
                <NavLink to="/live">
                    <li className='flex items-center gap-[5px]'>
                        <RiLiveFill size="20px"/>
                        <span className="font-semibold text-[16px]">Live</span>
                    </li>
                </NavLink>
            </ul>
            <div className='mt-[20px] flex flex-col gap-5 pb-[25px] border-b '>
                <h5 className='font-semibold text-[14px]'>Các tài khoản đang follow</h5>
                <div className='flex flex-col gap-5'>
                    {
                        myFollowing?.slice(0, displayFollow)?.map((fl: {id:number, user: user}) => {
                            return(
                                <AvatarInfo key={fl?.id} info={fl?.user}/>
                            )
                        })
                    }
                </div>
                {
                    myFollowing?.length > 6 && displayFollow <= myFollowing?.length ?
                    <span className="text-[14px] cursor-pointer font-semibold text-red-500" onClick={handleSeeMore}>Xem thêm</span>
                    :
                    <span className="text-[14px] cursor-pointer font-semibold text-red-500" onClick={handleResetSeeMore}>Thu gọn</span>
                }
            </div>
        </div>
    </div>
  )
}

export default Sidebar