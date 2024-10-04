import { Avatar } from 'antd'
import React from 'react'

const Member = () => {
    return (
        <div className='bg-[#EDEDF5] rounded-[28px] p-[30px]'>
            <h1 className='text-[22px] font-bold'>Members</h1>
            <div className='mt-[15px] bg-white rounded-[28px] grid grid-cols-5'>
                <div className='p-[10px] flex flex-col items-center'>
                    <Avatar style={{ verticalAlign: 'middle' }} size="large" >
                        N
                    </Avatar>
                    <p className='font-semibold'>Nam</p>
                    <p className='text-[#9897AD] text-[11px]'>Admin</p>
                </div>
                <div className='p-[10px] flex flex-col items-center'>
                    <Avatar style={{ verticalAlign: 'middle' }} size="large" >
                        N
                    </Avatar>
                    <p className='font-semibold'>Nam</p>
                    <p className='text-[#9897AD] text-[11px]'>Admin</p>
                </div>
                <div className='p-[10px] flex flex-col items-center'>
                    <Avatar style={{ verticalAlign: 'middle' }} size="large" >
                        N
                    </Avatar>
                    <p className='font-semibold'>Nam</p>
                    <p className='text-[#9897AD] text-[11px]'>Admin</p>
                </div>
                <div className='p-[10px] flex flex-col items-center'>
                    <Avatar style={{ verticalAlign: 'middle' }} size="large" >
                        N
                    </Avatar>
                    <p className='font-semibold'>Nam</p>
                    <p className='text-[#9897AD] text-[11px]'>Admin</p>
                </div>
                <div className='p-[10px] flex flex-col items-center'>
                    <Avatar style={{ verticalAlign: 'middle' }} size="large" >
                        N
                    </Avatar>
                    <p className='font-semibold'>Nam</p>
                    <p className='text-[#9897AD] text-[11px]'>Admin</p>
                </div>
            </div>
        </div>
    )
}

export default Member