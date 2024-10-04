import React from 'react'
import Banner from './Banner'
import DeviceController from './DeviceController'
import Member from './Member'
import PowerConsumer from './PowerConsumer'

const Home = () => {

    return (
        <div className='grid grid-cols-3 gap-[40px]'>
            <div className='col-start-1 col-span-2'>
                <Banner />
                <DeviceController />
            </div>
            <div className='col-start-3 col-end-4'>
                <Member />
                <PowerConsumer />
            </div>
        </div>
    )
}

export default Home