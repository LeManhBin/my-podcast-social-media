import React from 'react'

const Loading = () => {
  return (
    <div>
        <div className='fixed z-40 inset-0 bg-black opacity-50'>
        </div>
        <div className='fixed left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] z-50'>
          <div className="loader">
            <li className="ball"></li>
            <li className="ball"></li>
            <li className="ball"></li>
          </div>
        </div>
    </div>
  )
}

export default Loading