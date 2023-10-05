import React from 'react'
import { FILE_URL } from '../constants/url'

const PostMini = ({post}) => {
  return (
    <div className='overflow-hidden cursor-pointer hover:shadow-sm px-[5px] py-[3px]'>
        <div className="h-[200px] rounded">
            <img src={`${FILE_URL}${post?.image}`} alt="img" className='w-full h-full object-contain rounded bg-gray-100'/>
        </div>
    </div>
  )
}

export default PostMini