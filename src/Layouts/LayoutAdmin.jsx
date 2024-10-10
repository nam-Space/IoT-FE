import React, { useEffect, useState } from "react";
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    HomeOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import HeaderClient from "../components/HeaderClient";
import { IoAppsSharp, IoNewspaperOutline } from "react-icons/io5";
import { TiDeviceTablet } from "react-icons/ti";
import { RiSensorLine } from "react-icons/ri";
import { FaAddressCard } from "react-icons/fa6";
import { IoBedOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { PiNewspaperClipping } from "react-icons/pi";

const { Sider, Content } = Layout;

const LayoutAdmin = ({ children }) => {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [menuItems, setMenuItems] = useState([]);
    const [activeMenu, setActiveMenu] = useState("/");

    useEffect(() => {
        const full = [
            {
                label: <Link to="/">Dashboard</Link>,
                key: "/",
                icon: <IoAppsSharp />,
            },
            {
                label: <Link to="/user">User</Link>,
                key: "/user",
                icon: <UserOutlined />,
            },
            {
                label: <Link to="/room">Room</Link>,
                key: "/room",
                icon: <IoBedOutline />,
            },
            {
                label: <Link to="/device">Device</Link>,
                key: "/device",
                icon: <TiDeviceTablet />,
            },
            {
                icon: <RiSensorLine />,
                key: "/sensor",
                label: <Link to="/sensor">Sensor</Link>,
            },
            {
                key: "/card-reader",
                icon: <FaAddressCard />,
                label: <Link to="/card-reader">Card Reader</Link>,
            },
            {
                key: "/access-log",
                icon: <IoNewspaperOutline />,
                label: <Link to="/access-log">Access Log</Link>,
            },
            {
                key: "/sensor-log",
                icon: <PiNewspaperClipping />,
                label: <Link to="/sensor-log">Sensor Log</Link>,
            },
        ];
        setMenuItems(full);
    }, []);

    useEffect(() => {
        setActiveMenu(location.pathname);
    }, [location]);

    return (
        <Layout>
            <Sider
                className="bg-[#7A40F2]"
                trigger={null}
                collapsible
                collapsed={collapsed}
            >
                <div className="demo-logo-vertical" />
                <div className="flex justify-center my-[40px]">
                    <HomeOutlined className="text-[35px] text-white" />
                </div>
                <Menu
                    className="bg-[#7A40F2]"
                    // theme="dark"
                    mode="inline"
                    selectedKeys={[activeMenu]}
                    items={menuItems}
                />
            </Sider>
            <Layout className="min-h-screen">
                <HeaderClient
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                />
                <Content
                    style={{
                        margin: "24px 16px",
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
};

export default LayoutAdmin;
