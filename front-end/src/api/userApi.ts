import { message } from "antd"
import { BE_URL } from "../constants/url"
import axios from "axios"

export const fetchUserById = async(idUser:number) => {
    try {
        const data = await axios.get(`${BE_URL}users/${idUser}`) 
        return data
    } catch (error) {
        message.error("Có lỗi xảy ra vui lòng thử lại")
    }
}

export const updateUser = async(idUser:number, payload:object, token:string) => {
    try {
        const data  = await axios.put(`${BE_URL}users/${idUser}`, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        })
        message.success("Cập nhật thông tin thành công!")
        return data
    } catch (error) {
        message.error("Có lỗi xảy ra vui lòng thử lại")
        console.log(error);
    }
}