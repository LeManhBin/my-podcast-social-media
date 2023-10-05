import React, { useEffect } from 'react'
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { Image } from 'antd';
import { Fragment, useState } from 'react'
import TabMyPost from '../components/TabMyPost';
import TabWishList from '../components/TabWishList';
import EditProfileModel from '../components/EditProfileModel';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { actGetUserById } from '../redux/features/userSlice';
import Loading from '../components/Loading';
import { AVATAR_URL } from '../constants/url';
import TabPrivate from '../components/TabPrivate';
import { actGetFollower, actGetFollowing } from '../redux/features/followSlice';
import { handleGetFirstLetterName } from '../constants/func';

const ProfilePage = () => {
    let [isOpen, setIsOpen] = useState(false)
    const param = useParams()
    const userId:any = param?.id
    const dispatch:any = useDispatch()
    const {user, isLoading, myUser} =  useSelector((state:any) => state.users)
    const {followers, following} = useSelector((state:any) => state.follow)

    function openModal() {
      setIsOpen(true)
    }
    
    const onChangeTabs = (key: string) => {
        console.log(key);
    };

    const handleGetUserById = async(idUser:number) => {
      await dispatch(actGetUserById(idUser))
    }

    useEffect(() => {
      if(userId)  {
        handleGetUserById(userId)
        dispatch(actGetFollower(userId))
        dispatch(actGetFollowing(userId))
      }
    },[param])
    

    let items: TabsProps['items']
    if(param.id == myUser?.id) {
      items = [
        {
          key: '1',
          label: 'Bài viết',
          children: <TabMyPost/>,
        },
        {
          key: '2',
          label: 'Riêng tư',
          children: <TabPrivate/>,
        },
        {
          key: '3',
          label: 'Yêu Thích',
          children: <TabWishList/>,
        },
    ];
    } else {
      items = [
          {
            key: '1',
            label: 'Bài viết',
            children: <TabMyPost/>,
          },
      ];
    }
  return (
    <div className='flex flex-col gap-[50px] mb-[20px]'>
      {
        isLoading &&
        <Loading/>
      }
        <div className='flex items-center justify-between w-full'>
            <div className="flex items-start space-x-4">
                <div className="w-[150px] h-[150px] flex  rounded-full overflow-hidden justify-center">
                    {
                      user?.avatar ?
                      <Image className="w-[150px] h-[150px] object-cover" src={`${AVATAR_URL}${user?.avatar}`} alt="avatar"/>                      :
                      <div className='flex items-center justify-center w-[150px] h-[150px] bg-gray-300 rounded-full cursor-pointer'>
                        {
                          user?.name &&
                          <div className='font-medium text-[60px] text-white'>{handleGetFirstLetterName(user?.name)}</div>
                        }
                      </div>
                    }
                </div>
                <div className="font-medium dark:text-white flex flex-col gap-[10px]">
                    <div className='flex items-center gap-5'>
                        <p className='font-semibold text-[26px]'>{user?.name}</p>
                        <p className="text-[16px] text-gray-500 dark:text-gray-400">{user?.nickName}</p>
                    </div>
                    <div className='flex items-center gap-5'>
                        <p className='font-bold text-[18px]'>{following?.length} <span className='font-normal text-[14px] text-gray-500'>Đang follow</span></p>
                        <p className='font-bold text-[18px]'>{followers?.length} <span className='font-normal text-[14px] text-gray-500'>Follow</span></p>
                        <p className='font-bold text-[18px]'>100 <span className='font-normal text-[14px] text-gray-500'>Thích</span></p>
                    </div>
                    <span className='font-normal text-[16px] text-gray-500'>{user?.summary}</span>
                </div>
            </div>
            <div className='w-max'>
              {
                userId == myUser?.id &&
                <button className='bg-gray-100 font-semibold rounded px-[15px] py-[10px]' onClick={openModal}>
                    Sửa hồ sơ
                </button>
              }
            </div>
        </div>
        <Tabs defaultActiveKey="1" items={items} onChange={onChangeTabs} size="large"/>
        {/* Model Edit */}
        <EditProfileModel isOpen={isOpen} setIsOpen={setIsOpen}/>
    </div>
  )
}

export default ProfilePage