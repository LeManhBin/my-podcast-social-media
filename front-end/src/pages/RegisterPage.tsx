import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineLock, AiOutlineMail, AiOutlineUser } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import PopupOTP from '../components/PopupOTP'
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import {registerSchema} from '../constants/validateRegisterSchema'
import { useDispatch, useSelector } from 'react-redux'
import { actRegister } from '../redux/features/userSlice';
import Loading from '../components/Loading';

type Inputs = {
    name: string,
    email: string,
    password: string,
};
const RegisterPage = () => {
    const [isShowPass, setIsShowPass] = useState(false)
    const [isOpenOTP, setIsOpenOTP] = useState(false)
    const [registerData, setRegisterData] = useState({})
    const {isLoading, isValidRegister} = useSelector((state:any) => state.users)

    const dispatch:any = useDispatch()
    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(registerSchema)
    })

    const navigate = useNavigate() 

    const goLoginPage = () => {
        navigate("/auth/login")
    }
    const handleToggleShowPass = () => {
        setIsShowPass(!isShowPass)
    }

    const onSubmit:SubmitHandler<Inputs> = (value) => {
        setIsOpenOTP(true)
        dispatch(actRegister(value))
        setRegisterData(value)
        reset();
    }
    
  return (
    <div className='flex w-full h-screen'>
        {
            isLoading &&
            <Loading/>
        }
        {
           isValidRegister && isOpenOTP && !isLoading &&
            <PopupOTP setIsOpenOTP={setIsOpenOTP} value={registerData}/>
        }
        <div className='flex-1 flex justify-center p-[20px] max-md:hidden'>
            <img src="https://i.pinimg.com/564x/fd/cb/73/fdcb73c6079e4066c069810a356fc21b.jpg" alt="" className='object-cover w-full h-full rounded-[15px]' />
        </div>
        <div className='flex-1 flex flex-col p-[50px] max-sm:p-[20px]'>
            <h1 className="text-[24px] logo text-red-500">MyPodCast</h1>
            <div className='flex flex-grow flex-col gap-5 items-center mt-[100px]'>
                <h1 className='font-semibold  text-[26px]'>Đăng ký tài khoản</h1>
                <p className='text-gray-500 text-center'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora, quasi suscipit.</p>
                <form action="" className='flex flex-col items-center gap-5 w-[50%] max-lg:w-[70%] max-sm:w-[80%]' onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col gap-1 w-full'>
                        <label htmlFor="" className='font-medium'>Họ Tên</label>
                        <div className='border flex items-center gap-2 px-[10px] py-[5px] rounded'>
                            <AiOutlineUser size="20"/>
                            <input type="text" placeholder='Join Doe' className='outline-none w-full'  {...register("name")}/>
                        </div>
                        {errors.name && <p className='text-[12px] text-red-500'>{errors.name.message}</p>}
                    </div>
                    <div className='flex flex-col gap-1 w-full'>
                        <label htmlFor="" className='font-medium'>Email</label>
                        <div className='border flex items-center gap-2 px-[10px] py-[5px] rounded'>
                            <AiOutlineMail size="20"/>
                            <input type="email" placeholder='example@gmail.com' className='outline-none w-full' {...register("email")}/>
                        </div>
                        {errors.email && <p className='text-[12px] text-red-500'>{errors.email.message}</p>}
                    </div>
                    <div className='flex flex-col gap-1 w-full'>
                        <label htmlFor="" className='font-medium'>Mật khẩu</label>
                        <div className='border flex items-center gap-2 px-[10px] py-[5px] rounded'>
                            <AiOutlineLock size="20"/>
                            <div className='flex items-center justify-between w-full'>
                                <input type={isShowPass ? 'text' : 'password'} placeholder='Nhập vào mật khẩu của bạn' className='outline-none w-full' {...register("password")}/>
                                {
                                    isShowPass ?
                                    <AiOutlineEyeInvisible size="20" className="cursor-pointer" onClick={handleToggleShowPass}/> 
                                    :
                                    <AiOutlineEye size="20" className="cursor-pointer" onClick={handleToggleShowPass}/>  
                                }
                            </div>
                        </div>
                        {errors.password && <p className='text-[12px] text-red-500'>{errors.password.message}</p>}
                    </div>
                    <div>
                        <button type='submit' className='border px-[15px] py-[5px] font-bold rounded bg-black text-white hover:bg-red-500'>Đăng ký</button>
                    </div>
                </form>
                <div>
                    <p className='text-gray-500'>Tôi chưa có tài khoản? <span className='cursor-pointer text-black hover:text-red-500' onClick={goLoginPage}>Đăng nhập</span></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RegisterPage