import { message } from "antd";
import axios from "axios";
import { BE_URL } from "../constants/url";

export const fetchCreatePost = async(payload:any) => {
    try {
        const data = await axios.post(`${BE_URL}post`, payload, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        message.success("Đăng bài thành công")
        return data
    } catch (error) {
        console.log(error);
        message.error("Có lỗi xảy ra vui lòng thử lại")
        
    }
}

export const fetchGetAllPost = async () => {
    try {
        const data = await axios(`${BE_URL}post`)
        return data
    } catch (error) {
        console.log(error);
    }
}

export const fetchGetPostByIdUser = async (userId:number) => {
    try {
        const data = await axios(`${BE_URL}post/user/${userId}`)
        return data
    } catch (error) {
        console.log(error);
        
    }
}
export const fetchGetPostByIdUserPrivate = async (userId:number) => {
    try {
        const data = await axios(`${BE_URL}post/user-private/${userId}`)
        return data
    } catch (error) {
        console.log(error);
        
    }
}

export const fetchGetPostByCategoryId = async (categoryId: number) => {
    try {
        const data = await axios(`${BE_URL}post/category/${categoryId}`)
        return data
    } catch (error) {
        console.log(error); 
    }
}

export const fetchGetPostFollowing = async (userId: number) => {
    try {
        const data = await axios(`${BE_URL}post/following/${userId}`)
        return data
    } catch (error) {
        console.log(error); 
    }
}