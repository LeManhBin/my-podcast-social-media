import React, {useEffect, useState } from 'react'
import { Image } from 'antd';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaCommentDots, FaShare } from 'react-icons/fa';
import AvatarInfo from './AvatarInfo';
import { FILE_URL } from '../constants/url';
import { useDispatch, useSelector } from 'react-redux';
import { actToggleFollow } from '../redux/features/followSlice';

interface PostProps {
    post: any,
    followPage?: boolean,
    checkFollow?: any,
}
const Post:React.FC<PostProps> = ({post, followPage, checkFollow}) => {
    const [isSeeMore, setIsSeeMore] = useState(false)
    const [isLike, setIsLike] = useState(false)
    const [isFollow, setIsFollow] = useState(false)
    const {myUser} = useSelector((state:any) => state.users)
    const dispatch:Function = useDispatch()
    
    const handleToggleIsLike = () => {
        setIsLike(!isLike)
    }

    const toggleSeeMore = () => {
        setIsSeeMore(!isSeeMore)
    }

    const handleCheckFollow = () => {
        if(followPage || checkFollow(post?.user?.id) || myUser?.id == post?.user?.id) {
            setIsFollow(true)
        }else {
            setIsFollow(false)
        }
    }

    useEffect(() => {
        handleCheckFollow()
    },[])

    console.log(isFollow);
    

    const handleFollow = (userId:number, followerId:number) => {
        const payload = {
            userId: userId,
            followerId: followerId
        }
        dispatch(actToggleFollow(payload))
    }

  return (
    <div className='max-w-[540px] mx-auto shadow p-[20px]'> 
        <div className='flex items-start justify-between'>
            <div className="flex items-start space-x-4 ">
                <AvatarInfo info={post?.user}/>
            </div>
            {
                !isFollow &&
                <button className='border-2 border-red-500 rounded px-[15px] py-[5px] font-bold text-[16px] hover:bg-gray-100' onClick={() => handleFollow(myUser?.id, post?.user?.id)}>Follow</button>
            }
        </div>
        <div className={`mt-[10px] ${isSeeMore ? "" : " line-clamp-3"}`}>
            {post?.description} 
        </div>
        {
            post?.description.length > 160 &&
            <span className='text-blue-500 cursor-pointer' onClick={toggleSeeMore}>{isSeeMore ? `Thu gọn` : `Xem thêm`}</span>
        }
        <div className='mt-2 w-full h-[300px] bg-gray-100 rounded-lg overflow-hidden'>
            <Image src={`${FILE_URL}${post?.image}`} alt="image"  className='w-full h-full object-contain'/>
        </div>
        <audio  src={`${FILE_URL}${post?.sound}`} controls  className='w-full mt-5'/>
        <div className='border-t mt-2 flex items-center justify-between py-[10px] px-[20px]'>
            <button className='flex items-center gap-1 font-medium cursor-pointer' onClick={handleToggleIsLike}>
                {
                    isLike ?
                    <AiFillHeart size="20" className='text-red-500'/>
                    :
                    <AiOutlineHeart size="20"/>
                } 
            </button>
            <div className='flex items-center gap-1 font-medium cursor-pointer'>
                <FaCommentDots size="20" />
            </div>
            <div className='flex items-center gap-1 font-medium cursor-pointer'>
                <FaShare size="20" />
            </div>
        </div>
    </div>
  )
}

export default Post