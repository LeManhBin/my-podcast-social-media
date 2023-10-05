import React, { useEffect } from 'react'
import PostMini from './PostMini'
import { useDispatch, useSelector } from 'react-redux'
import { actGetPostByUserId } from '../redux/features/postSlice'
import { useParams } from 'react-router-dom'

const TabMyPost = () => {
  const dispatch:Function = useDispatch()
  const {postsByUser} = useSelector((state:any) => state.posts)
  const param:any = useParams()

  useEffect(() => {
    dispatch(actGetPostByUserId(param.id))
  },[param])
  return (
    <div className='grid grid-cols-3 gap-5'>
        {
          postsByUser?.length > 0 ?
          postsByUser?.map((post:any) => {
            return (
              <PostMini key={post.id} post={post}/>
            )
          })
          : 
          <span>Người dùng chưa có bài đăng nào</span>
        }
    </div>
  )
}

export default TabMyPost