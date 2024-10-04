import { Avatar, Button, Layout, Popover } from 'antd'
import React, { useContext, useState } from 'react'
import { BellOutlined, MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined } from '@ant-design/icons';
import { theme } from 'antd';
import { UserContext } from 'utils/UserContext';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const HeaderClient = ({ collapsed, setCollapsed }) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext)
    const [openPopoverNotification, setOpenPopoverNotification] = useState(false)
    const [openPopoverUser, setOpenPopoverUser] = useState(false)

    const handleLogout = () => {
        localStorage.removeItem('user-iot')
        setUser({})
        navigate('/login')
    }

    return (
        // <div>
        <Header style={{ padding: 0, background: colorBgContainer }}>
            <div className='flex justify-between'>
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        fontSize: '16px',
                        width: 64,
                        height: 64,
                    }}
                />
                <div className='flex items-center gap-[10px] p-[10px] mr-[20px]'>
                    <Popover
                        placement="bottomRight"
                        content={<div style={{ width: '330px' }}>
                            <div style={{ fontWeight: 'bold' }}>Notifications</div>
                            <div style={{ color: 'gray', marginTop: '20px', textAlign: 'center' }}>There are no announcements yet</div>
                        </div>}
                        trigger="click"
                        open={openPopoverNotification}
                        onOpenChange={(val) => setOpenPopoverNotification(val)}
                    >
                        <Button type='text' icon={<BellOutlined className={'text-[20px]'} />} ></Button>
                    </Popover>
                    <Popover
                        placement="bottomRight"
                        content={<div style={{ width: '90px' }}>
                            <div style={{ fontWeight: 'bold' }}>
                                <Button onClick={handleLogout} className={'w-full text-left'} type='text' icon={<LogoutOutlined className={'text-[18px]'} />} >
                                    <span>Logout</span>
                                </Button>
                            </div>
                        </div>}
                        trigger="click"
                        open={openPopoverUser}
                        onOpenChange={(val) => setOpenPopoverUser(val)}
                    >
                        <div className={'flex items-center'}>
                            <Avatar>N</Avatar>
                            <div className={'ml-[8px]'}>
                                <p className={'font-bold leading-normal'}>{user.name}</p>
                                <p className='leading-normal'>{user.accessLevel}</p>
                            </div>
                        </div>
                    </Popover>
                </div>
            </div>
        </Header>

        // </div>
    )
}

export default HeaderClient