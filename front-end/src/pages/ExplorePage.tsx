import React, {useEffect, useState} from 'react'
import PostMini from '../components/PostMini'
import { useDispatch, useSelector } from 'react-redux'
import { actGetAllCategory } from '../redux/features/categorySlice'
import { actGetPostByCategory } from '../redux/features/postSlice'

const ExplorePage = () => {
  const {categories} = useSelector((state:any) => state.categories)
  const {postsByCategory} = useSelector((state:any) => state.posts)
  const dispatch:any = useDispatch()
  const [activeButton, setActiveButton] = useState(1)

  useEffect(()  => {
    dispatch(actGetAllCategory())
  },[])
  
  const handleChangeCategory = (categoryId:number) => {
    setActiveButton(categoryId)
  }

  useEffect(() => {
    dispatch(actGetPostByCategory(activeButton))
  },[activeButton])

  console.log(postsByCategory);
  
  return (
    <div className='mb-[50px]'>
        <div className='flex items-center gap-5'>
            {
              categories.map((category: {id:number, name: string}) => {
                return (
                  <button key={category?.id} className={`${category?.id == activeButton && "explore-active"} px-[15px] py-[10px] bg-gray-300 rounded font-semibold text-[14px]`} onClick={() => handleChangeCategory(category?.id)}>{category.name}</button>
                )
              })
            }
        </div>
        <div className='grid grid-cols-3 gap-5 mt-[20px]'>
          {
            postsByCategory?.map((post:any) => {
              return(
                <PostMini key={post?.id} post={post}/>
              )
            })
          }

        </div>
    </div>
  )
}

export default ExplorePage