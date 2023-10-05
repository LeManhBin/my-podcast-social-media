import React, { useEffect } from 'react'
import Post from '../components/Post'
import { useDispatch, useSelector } from 'react-redux'
import { actGetAllPost } from '../redux/features/postSlice'
import { actGetFollowing } from '../redux/features/followSlice'

const HomePage = () => {
  const dispatch:Function = useDispatch()
  const {posts} = useSelector((state:any) => state.posts)
  const {myUser} = useSelector((state:any) => state.users)
  const {myFollowing} = useSelector((state:any) => state.follow)


  
  useEffect(() => {
    dispatch(actGetAllPost())
  },[])

  useEffect(() => {
    dispatch(actGetFollowing(myUser?.id))
  },[myUser])

  const handleCheckFollow  = (postUserId:number) => {
    const following =  myFollowing.find((user: {id:number}) => user.id == postUserId)
    if(following) {
      return true
    }else {
      return false
    }
  }
  

  
  return (
    <div className='flex flex-col gap-[50px] mb-[20px]'>
      {
        posts.map((post:any) => {
          return(
            <Post key={post.id} post={post} checkFollow={handleCheckFollow}/>
          )
        })
      }
    </div>
  )
}

export default HomePage