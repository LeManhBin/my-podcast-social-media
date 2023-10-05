import React, { useEffect, useState, useMemo } from 'react'
import {BsShieldFillCheck} from "react-icons/bs"
import { GrFormClose } from 'react-icons/gr';
import { message} from 'antd';
import {useDispatch, useSelector} from "react-redux"
import { LoadingOutlined } from '@ant-design/icons';
import { actVerityOTP } from '../redux/features/userSlice';

interface PopupOTPProps {
  setIsOpenOTP: any
  value: any
}
const PopupOTP:React.FC<PopupOTPProps> = ({setIsOpenOTP, value}) => {
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [otpValue, setOtpValue] = useState(['', '', '', '', '', '']);
  const dispatch:any = useDispatch()
  const {isLoadingCreate, isSuccessOTP} = useSelector((state:any) => state.users)
  useEffect(() => {
    setTimeout(() => {
      setTimeRemaining(timeRemaining - 1)
    }, 1000);
  }, [timeRemaining])

  const handleInputChange = (index:number, value:string) => {
    // Tạo một bản sao mới của mảng inputValues với giá trị của input tại index được cập nhật
    const newOtpValue = [...otpValue];
    newOtpValue[index] = value;
    setOtpValue(newOtpValue);
  };

  const handleSubmit = () => {
    const isValidOTP = otpValue.some((otp) => otp == "")
    const formatOTP = otpValue.join("")
    const payload = {
      // Value gồm thông tin name, email, password
      name: value.name,
      email:value.email,
      password: value.password,
      otp: formatOTP
    }
    if(isValidOTP) {
      return message.warning('vui lòng nhập đủ 6 ký tự!')
    }
    dispatch(actVerityOTP(payload))
  }

  useEffect(()=> {
    if(isSuccessOTP == true) {
      handleClose()
    }
  },[isSuccessOTP])

  const handleClose = () => {
    setIsOpenOTP(false)
  }
  return (
    <div className='relative right-0 flex justify-center items-center'>
        <div className='fixed inset-0 bg-black opacity-25' onClick={handleClose}>
        </div>
        <div className='fixed left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] bg-white z-50 w-[300px] h-[300px] rounded-md p-[20px]'>
          <div className='absolute right-[5px] top-[5px] p-[5px] shadow w-max cursor-pointer rounded-full hover:bg-red-500 hover:text-white' onClick={handleClose}>
            <GrFormClose size="20" />
          </div>
          <div className='flex flex-col items-center mt-5'>
            <h1 className='text-center font-bold text-[20px]'>Vui lòng xác nhận mã OTP</h1>
            {
              isLoadingCreate ?
              <LoadingOutlined className='text-[40px] text-[#03C988]' />
              : 
              <BsShieldFillCheck size="40" color="#03C988"/>
            }


          </div>
          <div className='flex flex-col items-center gap-5 h-full mt-[20px]'>
            <div className='grid grid-cols-6 gap-3'>
            {
              otpValue.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  className='border outline-none text-center'
                  value={value}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
              ))
            }
            </div>
            <div className='flex flex-col gap-3 justify-center'>
              <button className='border px-[15px] py-[5px] font-bold rounded bg-black text-white hover:bg-red-500' onClick={handleSubmit}>Xác nhận</button>
            </div>
            {
              timeRemaining > 0 ?
              <p className='text-gray-500'>Mã OTP đã được gửi <span className='font-semibold text-black'>{timeRemaining}s</span></p>
              :
              <div>
                <p className='text-gray-500'>Không nhận được mã OTP?</p>
                <p className='text-center font-semibold text-red-500 cursor-pointer'>Gửi lại mã</p>
              </div>
            }

          </div>
        </div>
    </div>
  )
}

export default PopupOTP