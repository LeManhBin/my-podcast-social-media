import { message } from "antd"
import axios from "axios";
import { BE_URL } from "../constants/url";

export const fetchGetAllCategory = async() => {
    try {
        const data = await axios.get(`${BE_URL}category`)
        return data
    } catch (error) {
        console.log(error);
    }
}

export const fetchGetCategoryId = async(id:number) => {
    try {
        const data = await axios.get(`${BE_URL}category/${id}`)
        return data
    } catch (error) {
        console.log(error);
    }
}

export const fetchCreateCategory = async(name:string) => {
    try {
        const data = axios.post(`${BE_URL}/category`, name)
        return data
    } catch (error) {
        message.error("Có lỗ xảy ra vui lòng thử lại!")
    }
}

export const fetchDeleteCategory = async (id:number) => {
    try {
        const data = axios.delete(`${BE_URL}/category/${id}`)
        return data
    } catch (error) {
        message.error("Có lỗ xảy ra vui lòng thử lại!")
    }
}

export const fetchUpdateCategory = async (id:number, name: string) => {
    try {
        const data = axios.put(`${BE_URL}/category/${id}`, name)
        return data
    } catch (error) {
        message.error("Có lỗ xảy ra vui lòng thử lại!")
    }
}