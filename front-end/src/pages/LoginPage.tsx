import { yupResolver } from '@hookform/resolvers/yup'
import React, {useEffect, useState} from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineLock, AiOutlineMail, AiOutlineUser } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { LoginSchema } from '../constants/validateLoginSchema'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchLogin } from '../redux/features/userSlice'
import Loading from '../components/Loading'


type Inputs = {
    email: string,
    password: string,
};
const LoginPage = () => {
    const [isShowPass, setIsShowPass] = useState(false)
    const navigate = useNavigate()
    const dispatch:any = useDispatch()
    const {accessToken, isLogged, isLoading} = useSelector((state:any) => state.users)

    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(LoginSchema)
    })
    const goRegisterPage = () => {
        navigate("/auth/register")
    }
    const handleToggleShowPass = () => {
        setIsShowPass(!isShowPass)
    }

    
    const onSubmit:SubmitHandler<Inputs> = (value) => {
        dispatch(actFetchLogin(value))
    }

    useEffect(() => {
        if(accessToken.length > 0 && isLogged === true) {
            navigate("/")
        }
    },[isLogged])
  return (
    <div className='flex w-full h-screen'>
        {
            isLoading && 
            <Loading/>
        }
        <div className='flex-1 flex flex-col p-[50px] max-sm:p-[20px]'>
            <h1 className="text-[24px] logo text-red-500">MyPodCast</h1>
            <div className='flex flex-grow flex-col gap-5 items-center mt-[100px]'>
                <h1 className='font-semibold  text-[26px]'>Chào mừng trở lại!</h1>
                <p className='text-gray-500 text-center'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora, quasi suscipit.</p>
                <form action="" className='flex flex-col items-center gap-5 w-[50%] max-lg:w-[70%] max-sm:w-[80%]' onSubmit={handleSubmit(onSubmit)}>
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
                                <input type={isShowPass ? 'text' : 'password'} placeholder='Nhập vào mật khẩu của bạn' className='outline-none w-full' {...register("password")} />
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
                        <button type='submit' className='border px-[15px] py-[5px] font-bold rounded bg-black text-white hover:bg-red-500'>Đăng nhập</button>
                    </div>
                </form>
                <div>
                    <p className='text-gray-500'>Tôi chưa có tài khoản? <span className='cursor-pointer text-black hover:text-red-500' onClick={goRegisterPage}>Đăng ký</span></p>
                </div>
            </div>
        </div>
        <div className='flex-1 flex justify-center p-[20px] max-md:hidden'>
            <img src="https://i.pinimg.com/564x/fb/fd/58/fbfd584b2d3ec011ba2d678cca586639.jpg" alt="" className='object-cover w-full h-full rounded-[15px]' />
        </div>
    </div>
  )
}

export default LoginPage