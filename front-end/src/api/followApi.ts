import axios from "axios";
import { BE_URL } from "../constants/url";
import { message } from "antd";

export const fetchGetFollower = async (userId:number) => {
    try {
        const data = await axios.get(`${BE_URL}follow/follower/${userId}`)
        return data
    } catch (error) {
        console.log(error);
    }
}

export const fetchGetFollowing = async (userId:number) => {
    try {
        const data = await axios.get(`${BE_URL}follow/following/${userId}`)
        return data
    } catch (error) {
        console.log(error);
    }
}

export const fetchToggleFollow = async (payload: {userId:number, followerId: number}) => {
    try {
        const data = await axios.post(`${BE_URL}follow/toggle-follow`, payload)
        return data
    } catch (error) {
        console.log(error);
        message.error("Có lỗi xảy ra vui lòng thử lại")
    }
}