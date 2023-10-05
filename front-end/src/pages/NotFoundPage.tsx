import React from 'react'
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
const NotFoundPage = () => {
    const navigate= useNavigate()
    
    const goBack = () => {
        navigate(-1)
    }
  return (
    <div className='h-screen flex items-center justify-center'>
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<button className='px-[10px] py-[5px] font-semibold bg-blue-500 text-white rounded' onClick={goBack}>Go Back</button>}
        />
    </div>
  )
}

export default NotFoundPage