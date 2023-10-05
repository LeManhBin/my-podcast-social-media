import { Modal, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { AiOutlineFileImage, AiOutlineUpload } from 'react-icons/ai'
import {GiSoundWaves} from "react-icons/gi"
import { GrEmoji } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { actGetAllCategory } from '../redux/features/categorySlice';
import { actCreatePost } from '../redux/features/postSlice';
import { AVATAR_URL } from '../constants/url';
import EmojiPicker, {EmojiStyle,EmojiClickData,} from "emoji-picker-react";

const initialPostState = {
    userId: "",
    categoryId: 1,
    status: 0,
    description: "",
}
const PostModal = ({openUpload, setOpenUpload}:any) => {
    const [isOpenEmoji, setIsOpenEmoji] = useState(false)
    const [postState, setPostState] = useState(initialPostState)
    const [fileImage, setFileImage] = useState<any>(null)
    const [fileAudio, setFileAudio] = useState<any>(null)
    const [audioSound, setAudioSound] = useState("")
    const {categories} = useSelector((state:any) => state.categories)
    const {myUser} = useSelector((state:any) => state.users)
    const dispatch:any = useDispatch()

    const handleCloseModel = () => {
        setOpenUpload(false)
        setIsOpenEmoji(false)
        setPostState({
            ...postState,
            description: ""
        })
    }
    // ---------
    function onChangeEmoji(emojiData: EmojiClickData, event: MouseEvent) {
        setPostState((prevState) => ({
          ...prevState,
          description:
            prevState.description + (emojiData.isCustom ? emojiData.unified : emojiData.emoji),
        }));
      }
    // -------
    useEffect(() => {
        dispatch(actGetAllCategory())
    },[])
    
    const handleToggleEmoji = () => {
        setIsOpenEmoji(!isOpenEmoji)
    }

    // change post state
    const handleOnChange = (e:any) => {
       const {name, value} = e.target
       setPostState({
        ...postState,
        [name]: value
       })
    }

    // Onchane file image
    const handleChangeFileImage = (e:any) => {
        const file = e.target.files[0]
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            return message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            return message.error('Image must smaller than 2MB!');
        }
        setFileImage(file)
    };

    // Onchange file Audio
    const handleChangeFileAudio = (e:any) => {
        const file = e.target.files[0];        
        const audioFormats = ['audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/ogg', 'audio/aac']; // Thêm các định dạng âm thanh bạn muốn hỗ trợ ở đây
      
        if (!audioFormats.includes(file.type)) {
          return message.error('Bạn chỉ có thể tải lên các tệp âm thanh có định dạng hợp lệ!');
        }
      
        // const isLt2M = file.size / 1024 / 1024 < 2;
        // if (!isLt2M) {
        //   return message.error('Âm thanh phải nhỏ hơn 2MB!');
        // }
        // Đọc dữ liệu của tệp âm thanh và tạo URL tạm thời
        const reader = new FileReader();
        reader.onload = (e:any) => {
        const audioDataURL = e.target.result;
            setAudioSound(audioDataURL);
        };
        reader.readAsDataURL(file);
        setFileAudio(file);
    };

    // đăng bài
    const handlePostOk = () => {
        const formData = new FormData()
        formData.append("image", fileImage)
        formData.append("sound", fileAudio)
        const payload = {
            ...postState,
            userId: myUser.id,
            image: formData.get("image"),
            sound: formData.get("sound"), 
        }

        dispatch(actCreatePost(payload))
        setFileImage(null)
        setFileAudio(null)
        setPostState(initialPostState)
        setOpenUpload(false)
    }
  return (
    <Modal
        title="Tạo bài viết"
        centered
        open={openUpload}
        onOk={() => handlePostOk()}
        onCancel={() => handleCloseModel()}
        width={500}
    >
        <div>
        <div className="flex items-center space-x-4">
            <img className="w-10 h-10 object-cover rounded-full" src={`${AVATAR_URL}${myUser?.avatar}`} alt="avatar"/>
            <div className="font-medium dark:text-white">
                <div className='font-bold'>{myUser?.name}</div>
                <select name="status" value={postState.status} id=""  onChange={handleOnChange}>
                    <option value="0">Công khai</option>
                    <option value="1">Riêng tư</option>
                </select>
            </div>
        </div>
        <select name="categoryId" id="" className='mt-2' onChange={handleOnChange}>
            {
                categories?.map((category:{id:number, name:string}) => {
                    return(
                        <option value={category.id} key={category.id}>{category.name}</option>
                    )
                })
            }
        </select>
        <div className='flex px-2 flex-col items-end border rounded mt-2'>
            <textarea name="description" id="" placeholder='Nhập nôi dung bài viết' value={postState.description} cols={30} rows={5} style={{ resize: "none" }} className="w-full outline-none rounded mt-2" onChange={handleOnChange}></textarea>
            <div className='relative z-20 pb-1'>
                <GrEmoji size={24} className="cursor-pointer" onClick={handleToggleEmoji}/>
                {
                    isOpenEmoji &&
                    <div className='absolute right-0'>
                       <EmojiPicker
                        onEmojiClick={onChangeEmoji}
                        autoFocusSearch={false}
                        emojiStyle={EmojiStyle.NATIVE}/>
                    </div>
                }
            </div>
        </div>
        <div className='w-full mt-2'>
            <input type="file" id='uploadImage' className='hidden' onChange={handleChangeFileImage}/>
            <label htmlFor="uploadImage" className='flex justify-between items-center border w-full text-[16px] px-[10px] py-[5px] rounded '>
                <div className='flex items-center gap-1 w-[90%]'>
                    <AiOutlineFileImage size={20}/>
                    <span className='overflow-hidden whitespace-nowrap'>
                        {
                            fileImage ? fileImage?.name : 'Chọn hình ảnh'
                        }
                    </span>
                </div> 
                <AiOutlineUpload size={24} />
            </label>
        </div>
        <div className='w-full mt-2'>
            <input type="file" id='uploadAudio' className='hidden' onChange={handleChangeFileAudio}/>
            <label htmlFor="uploadAudio" className='flex justify-between items-center border w-full text-[16px] px-[10px] py-[5px] rounded '>
                <div className='flex items-center gap-1 w-[90%]'>
                    <GiSoundWaves size={20}/>
                    <span className='overflow-hidden whitespace-nowrap'>
                        {
                            fileAudio ? fileAudio?.name : 'Chọn file âm thanh'
                        }
                    </span>
                </div> 
                <AiOutlineUpload size={24} />
            </label>
            {
                audioSound &&
                    <audio src={audioSound} controls className='w-full mt-2'></audio>
            }
            
        </div>
        </div>
    </Modal>
  )
}

export default PostModal