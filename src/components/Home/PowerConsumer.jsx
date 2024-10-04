import { Select } from 'antd'
import React from 'react'
import { Column } from '@ant-design/plots';

const PowerConsumer = () => {
    const config = {
        data: {
            type: 'fetch',
            value: 'https://gw.alipayobjects.com/os/antfincdn/iPY8JFnxdb/dodge-padding.json',
        },
        xField: '月份',
        yField: '月均降雨量',
        colorField: 'name',
        group: true,
        style: {
            inset: 5,
        },
        onReady: ({ chart }) => {
            try {
                chart.on('afterrender', () => {
                    chart.emit('legend:filter', {
                        data: { channel: 'color', values: ['London'] },
                    });
                });
            } catch (e) {
                console.error(e);
            }
        },
    };

    return (
        <div className='bg-[#EDEDF5] rounded-[28px] p-[30px] mt-[37px]'>
            <div className='flex justify-between'>
                <h1 className='text-[22px] font-bold'>Power Consumed</h1>
                <Select
                    defaultValue="week"
                    style={{ width: 100 }}
                    onChange={(val) => console.log(val)}
                    options={[
                        { value: 'week', label: 'Week' },
                        { value: 'month', label: 'Month' },
                        { value: 'year', label: 'Year' },
                    ]}
                />
            </div>
            <div className='mt-[15px] bg-white rounded-[28px]'>
                <Column {...config} />
            </div>
        </div>
    )
}

export default PowerConsumer