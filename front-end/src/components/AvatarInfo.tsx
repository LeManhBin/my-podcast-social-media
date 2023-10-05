import React from 'react'
import { AVATAR_URL } from '../constants/url'
import { useNavigate } from 'react-router-dom'
import { handleGetFirstLetterName } from '../constants/func'

interface infoProps {
  id: number,
  avatar: string,
  email: string,
  nickName: string,
  name: string,

}
const AvatarInfo = ({info}:any) => {
  const navigate = useNavigate()

  const goToProfile = (userId:number) => {
    navigate(`/profile/${userId}`)
  }
  return (
    <div className="flex items-center space-x-4 cursor-pointer" onClick={() => goToProfile(info?.id)}>
        {
          info?.avatar ?
          <img className="w-10 h-10 object-cover rounded-full" src={`${AVATAR_URL}${info?.avatar}`} alt="avatar"/>
          :
          <div className='flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full cursor-pointer'>
            {
              info?.name &&
              <div className='font-medium text-[15px] text-white'>{handleGetFirstLetterName(info?.name)}</div>
            }
          </div>
        }
        <div className="font-medium dark:text-white">
            <div className='font-bold'>{info?.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{info?.nickName}</div>
        </div>
    </div>
  )
}

export default AvatarInfo