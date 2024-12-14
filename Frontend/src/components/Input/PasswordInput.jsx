import React, { useState } from 'react'
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa6'

export const PasswordInput = ({value, onChange, placeholder}) => {
    const [isShowPassword, setIsShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    }

    return (
        <div className='flex items-center justify-between w-full border bg-transparent border-gray-300 rounded-lg px-5 py-3 mb-3 outline-none'>
            <input 
                type={!isShowPassword? "password": "text"}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className='w-full text-sm mr-3 outline-none bg-transparent'                
            />

            {!isShowPassword?
                <FaRegEye
                        size={22}
                        className='text-primary cursor-pointer'
                        onClick={toggleShowPassword}
                /> : 
                <FaRegEyeSlash
                    size={22}
                    className='text-slate-400 cursor-pointer'
                    onClick={toggleShowPassword}
                />
            } 
        </div>
    )
}
