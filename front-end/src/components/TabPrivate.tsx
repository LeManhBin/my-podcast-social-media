import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PostMini from './PostMini'
import { useDispatch, useSelector } from 'react-redux'
import { actGetPostPrivate } from '../redux/features/postSlice'

const TabPrivate = () => {
    const dispatch:Function = useDispatch()
    const {postsPrivate} = useSelector((state) => state.posts)
    const param = useParams()

    useEffect(() => {
        dispatch(actGetPostPrivate(param.id))
    },[param])
  return (
    <div className='grid grid-cols-3 gap-5'>
        {
            postsPrivate?.length > 0 ?
            postsPrivate?.map((post) => {
                return(
                    <PostMini key={post.id} post={post}/>
                )
            })
            :
            <span>Người dùng chưa có bài đăng nào</span>
        }
    </div>
  )
}

export default TabPrivate