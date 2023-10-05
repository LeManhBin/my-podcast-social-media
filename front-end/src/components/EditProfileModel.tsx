import React, { useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import {GrFormAdd} from "react-icons/gr"
import { message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { actUpdateUser } from '../redux/features/userSlice'
import { AVATAR_URL } from '../constants/url'
interface EditProfileModelProps {
    isOpen: Boolean,
    setIsOpen: any
}

const EditProfileModel:React.FC<EditProfileModelProps> = ({isOpen, setIsOpen}) => {
    const [imageUrl, setImageUrl] = useState<string>();
    const [fileImage, setFileImage] = useState(null)
    const {user, accessToken} = useSelector((state:any) => state.users)
    const dispatch:any = useDispatch()
    const [profileState, setProfileState] = useState({
        nickName: "",
        name: "",
        summary: "",
    }) 
    
    useEffect(() => {
        setProfileState({
            nickName: user.nickName,
            name: user.name,
            summary: user.summary,  
        })
    },[user])
    
    
    // Onchane file image
    const handleChangeFile = (e:any) => {
        const file = e.target.files[0]
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          return message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          return message.error('Image must smaller than 2MB!');
        }
        setImageUrl(URL.createObjectURL(file))
        setFileImage(file)
    };

    // OnChange input
    const handleOnChangeInput = (e: any) => {
        const {name, value} = e.target;
        setProfileState({
            ...profileState,
            [name]: value
        })
    }

    const handleSubmit = (e:any) => {
        e.preventDefault()
        const formData = new FormData()
        if (fileImage) {
            formData.append('avatar', fileImage);
        }
        const payload = {
            ...profileState,
            avatar: fileImage,
        }
        if(profileState?.summary?.length > 80) {
            message.warning("Mô tả tối đa chỉ 80 ký tự")
        }else if(profileState?.name?.length > 30) {
            message.warning("Tên người dùng chỉ được tối đa 30 ký tự")
        }else if(profileState?.nickName?.length > 30) {
            message.warning("Biệt danh chỉ được tối đa 30 ký tự")
        }else {
            dispatch(actUpdateUser(user.id, payload, accessToken))
            closeModal()
        }
    }

    function closeModal() {
        setIsOpen(false)
    }

    function closeModalv2(e:any) {
        e.preventDefault()
        setIsOpen(false)
    }

  return (
    <div>
        <Transition appear show={!!isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-30" onClose={closeModal}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black bg-opacity-25"/>
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                        as="h3"
                        className="text-[26px] border-b pb-2 font-semibold leading-6 text-gray-900"
                    >
                        Sửa hồ sơ
                    </Dialog.Title>
                    <div className="mt-4">
                        <form action="">
                            <div className='flex flex-col gap-2 mb-5'>
                                <label htmlFor="" className='font-medium text-[16px]'>Ảnh hồ sơ</label>
                                <div className='mx-auto'>
                                    <input type="file" id='inputAvatar' onChange={handleChangeFile} className='hidden'/>
                                    <div className='flex items-center justify-center w-[150px] h-[150px] border-[2px] rounded-full border-dotted'>
                                        <label htmlFor="inputAvatar" className='w-full h-full flex items-center justify-center cursor-pointer rounded-full'>
                                            {
                                                imageUrl ?
                                                    <img src={imageUrl} alt="" className='w-full h-full rounded-full object-cover'/>
                                                :
                                                <div className=''>
                                                    {
                                                        user.avatar ?
                                                            <img src={`${AVATAR_URL}${user?.avatar}`} alt="" className='w-[150px] h-[150px] rounded-full object-cover'/>
                                                        :
                                                            <div className='w-full h-full flex flex-col items-center text-gray-500'>
                                                                <GrFormAdd size={20}/>
                                                                <p >Chọn ảnh</p>
                                                            </div>
                                                    }
                                                </div>
                                            }
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-2 mb-5'>
                                <label htmlFor="" className='font-medium text-[16px]'>Biệt danh</label>
                                <input type="text" name='nickName' value={profileState.nickName} onChange={handleOnChangeInput} placeholder='Nhập vào biệt danh của bạn' className='px-[10px] py-[5px] outline-none rounded border'/>
                            </div>
                            <div className='flex flex-col gap-2 mb-5'>
                                <label htmlFor="" className='font-medium text-[16px]'>Tên</label>
                                <input type="text" name='name' value={profileState.name} onChange={handleOnChangeInput}  placeholder='Nhập vào tên của bạn' className='px-[10px] py-[5px] outline-none rounded border'/>
                            </div>
                            <div className='flex flex-col gap-2 mb-5'>
                                <label htmlFor="" className='font-medium text-[16px]'>Tiểu sử</label>
                                <textarea name="summary" id="" value={profileState.summary} onChange={handleOnChangeInput} placeholder='Nhập vào tiểu sử của bạn' cols={30} rows={3} className='px-[10px] py-[5px] outline-none rounded border'></textarea>
                                <span className={`text-gray-500 text-[11px] ${profileState?.summary?.length > 80 && 'text-red-500'} `}>{profileState?.summary?.length}/80</span>
                            </div>
                            <div className='flex gap-3 justify-end'>
                                <button className='px-[25px] py-[5px] rounded font-medium border hover:bg-gray-100' onClick={closeModalv2}>Huỷ</button>
                                <button className='px-[25px] py-[5px] rounded font-medium border hover:bg-red-500 hover:text-white' onClick={handleSubmit}>Lưu</button>
                            </div>
                        </form>
                    </div>

                    </Dialog.Panel>
                </Transition.Child>
                </div>
            </div>
            </Dialog>
        </Transition>
    </div>
  )
}

export default EditProfileModel