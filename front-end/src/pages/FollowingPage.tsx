import React, { useEffect } from 'react'
import Post from '../components/Post'
import { useDispatch, useSelector } from 'react-redux'
import { actGetPostFollowing } from '../redux/features/postSlice'

const FollowingPage = () => {
  const dispatch:Function = useDispatch()
  const {postsFollowing} = useSelector((state:any) => state.posts)

  const {myUser} = useSelector((state:any) => state.users)
  
  useEffect(() => {
    dispatch(actGetPostFollowing(myUser?.id))
  },[myUser])

  return (
    <div className='flex flex-col gap-[50px] mb-[20px]'>
      {
        postsFollowing?.map((post:any) => {
          return(
            <Post key={post?.id} post={post} followPage={true}/>
          )
        })
      }
    </div>
  )
}

export default FollowingPage