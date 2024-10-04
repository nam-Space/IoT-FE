import { Select, Switch } from 'antd'
import React from 'react'
import { CgSmartHomeRefrigerator } from 'react-icons/cg';
import { FaGlassWaterDroplet, FaTemperatureQuarter } from 'react-icons/fa6';
import { IoWaterOutline, IoWaterSharp } from 'react-icons/io5';
import Thermostat from '../../utils/Thermostat';
import { PiFanLight } from 'react-icons/pi';
import { BiDoorOpen } from 'react-icons/bi';
import { HiOutlineLightBulb } from 'react-icons/hi';

const DeviceController = () => {
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    return (
        <div className='mt-[37px]'>
            <div className='flex justify-between'>
                <h1 className='text-[22px] font-bold'>Nam's Home</h1>
                <div className='flex gap-[24px]'>
                    <div className='flex items-center text-blue-500'><IoWaterSharp /> 35% </div>
                    <div className='flex items-center text-red-400'><FaTemperatureQuarter /> 15°C </div>
                    <div>
                        <Select
                            defaultValue="living-room"
                            style={{ width: 200 }}
                            onChange={handleChange}
                            options={[
                                { value: 'living-room', label: 'Living Room' },
                                { value: 'kitchen', label: 'Kitchen' },
                                { value: 'bedroom', label: 'Bedroom' },
                            ]}
                        />
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-4 gap-[30px] mt-[20px]'>
                <div className='flex flex-col items-start bg-white p-[20px] rounded-[25px]'>
                    <div className='w-full flex justify-between font-semibold'>
                        AUTO
                        <Switch defaultChecked onChange={(val) => console.log(val)} />
                    </div>
                    <FaGlassWaterDroplet className='text-[34px] mt-[10px] text-[#7A40F2]' />
                    <div className='text-[#7A40F2] mt-[10px] font-semibold'>Water</div>
                </div>
                <div className='flex flex-col items-start bg-white p-[20px] rounded-[25px]'>
                    <div className='w-full flex justify-between font-semibold'>
                        ON
                        <Switch defaultChecked onChange={(val) => console.log(val)} />
                    </div>
                    <PiFanLight className='text-[34px] mt-[10px] text-[#7A40F2]' />
                    <div className='text-[#7A40F2] mt-[10px] font-semibold'>Fan</div>
                </div>
                <div className='flex flex-col items-start bg-white p-[20px] rounded-[25px]'>
                    <div className='w-full flex justify-between font-semibold'>
                        OPEN
                        <Switch defaultChecked onChange={(val) => console.log(val)} />
                    </div>
                    <BiDoorOpen className='text-[34px] mt-[10px] text-[#7A40F2]' />
                    <div className='text-[#7A40F2] mt-[10px] font-semibold'>Door</div>
                </div>
                <div className='flex flex-col items-start bg-white p-[20px] rounded-[25px]'>
                    <div className='w-full flex justify-between font-semibold'>
                        ON
                        <Switch defaultChecked onChange={(val) => console.log(val)} />
                    </div>
                    <HiOutlineLightBulb className='text-[34px] mt-[10px] text-[#7A40F2]' />
                    <div className='text-[#7A40F2] mt-[10px] font-semibold'>Light</div>
                </div>
            </div>
            <div className='p-[30px] bg-white rounded-[28px] mt-[25px]'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-[12px] text-[#7A40F2] font-semibold'>
                        <div className='relative'>
                            <div className='h-[36px] w-[36px] bg-[#7A40F2] rounded-[50%] opacity-20'></div>
                            <FaTemperatureQuarter className='text-[20px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]' />
                        </div>
                        Living Room Temperature
                    </div>
                    <div className='flex gap-[16px] font-semibold'>
                        ON
                        <Switch defaultChecked onChange={(val) => console.log(val)} />
                    </div>
                </div>
                <div className='mt-[30px] flex justify-center'>
                    <Thermostat
                        height={400}
                        width={400}
                        ambientTemperature={0}
                        targetTemperature={27}
                        hvacMode="heating"
                        unit='°C'
                        minValue={0}
                    />
                </div>
            </div>
        </div>
    )
}

export default DeviceController