import React, { useState } from 'react';
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    HomeOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import HeaderClient from '../components/HeaderClient';
import { IoAppsSharp } from 'react-icons/io5';
import { TiDeviceTablet } from 'react-icons/ti';
import { RiSensorLine } from 'react-icons/ri';
import { FaAddressCard } from 'react-icons/fa6';

const { Sider, Content } = Layout;

const LayoutAdmin = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout>
            <Sider className='bg-[#7A40F2]' trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <div className='flex justify-center my-[40px]'>
                    <HomeOutlined className='text-[35px] text-white' />
                </div>
                <Menu
                    className='bg-[#7A40F2]'
                    // theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <IoAppsSharp />,
                            label: 'Overview',
                        },
                        {
                            key: '2',
                            icon: <UserOutlined />,
                            label: 'User',
                        },
                        {
                            key: '3',
                            icon: <TiDeviceTablet />,
                            label: 'Device',
                        },
                        {
                            key: '4',
                            icon: <RiSensorLine />,
                            label: 'Sensor',
                        },
                        {
                            key: '5',
                            icon: <FaAddressCard />,
                            label: 'Card Reader',
                        },
                    ]}
                />
            </Sider>
            <Layout className='min-h-screen'>
                <HeaderClient collapsed={collapsed} setCollapsed={setCollapsed} />
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        // background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {children}
                </Content>

            </Layout>
        </Layout>
    );
}

export default LayoutAdmin