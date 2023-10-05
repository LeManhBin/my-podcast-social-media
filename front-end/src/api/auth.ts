import axios from "axios"
import { BE_URL } from "../constants/url";
import { message} from 'antd';

// Fetch Register
export const fetchRegister = async(user: {name:string, email:string, password: string}) => {
    try {
        const data = await axios.post(`${BE_URL}auth/register`, user)         
        return data
    } catch (error:any) {
        if(error.response.status === 401) {
            message.warning('Email đã tồn tại')
        }else {
            message.error('Có lỗi xảy ra vui lòng thử lại sau')
        }
    }
}

// Verify OTP
export const fetchVerifyOTP = async(payload: {email:string, name:string, password:string, otp:string}) => {
    try {
        const data = await axios.post(`${BE_URL}auth/verify-otp`, payload)
        if(data) {
            message.success('Đăng ký thành công') 
        }
        return data
    } catch (error:any) {
        if(error.response.status === 404 || error.response.status === 400) {
            message.warning('OTP không chính xác vui lòng nhập lại')
        }else {
            message.error('Có lỗi xảy ra vui lòng thử lại sau')
        }
    }
}

// Fetch Login
export const fetchLogin = async(user: {email: string, password: string}) => {
    try {
        const data = await axios.post(`${BE_URL}auth/login`, user)
        if(data) {
            message.success("Đăng nhập thành công")
        }
        return data
    } catch (error:any) {
        if(error.response.status === 404 || error.response.status === 401) {
            message.warning('Tài khoản hoặc mật khẩu không chính xác')
        }else {
            message.error('Có lỗi xảy ra vui lòng thử lại sau')
        }
    }
}


// Fetch my infor
export const fetchMyInfo = async (idUser: number) => {
    try {
        const data = await axios.get(`${BE_URL}users/${idUser}`) 
        return data
    } catch (error:any) {
        message.error('Có lỗi xảy ra vui lòng thử lại sau')
    }
}