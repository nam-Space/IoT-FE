import { Button, message, notification, Popconfirm, Space } from "antd";
import React, { useContext, useRef, useState } from "react";
import DataTable from "utils/DataTable";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import useGetDevices from "hooks/useGetDevices";
import { callDeleteDevice } from "config/api";
import ModalDevice from "./ModalDevice";
import { UserContext } from "utils/UserContext";

const Device = () => {
    const tableRef = useRef();
    const { user } = useContext(UserContext);
    const [openModal, setOpenModal] = useState(false);
    const [dataInit, setDataInit] = useState(null);

    const { loading, devices, getAllDevice } = useGetDevices();

    const handleDeleteDevice = async (_id) => {
        if (_id) {
            try {
                const res = await callDeleteDevice(_id, {
                    headers: {
                        Authorization: "Bearer " + user.token,
                    },
                });
                message.success("Xóa device thành công");
                reloadTable();
            } catch (error) {
                console.log("error", error);
                notification.error({
                    message: "Có lỗi xảy ra",
                    description: error?.response?.data?.error || error.message,
                    duration: 5,
                });
            }
        }
    };

    const columns = [
        {
            title: "Id",
            dataIndex: "_id",
            width: 250,
            render: (text, record, index, action) => {
                return <span>{record._id}</span>;
            },
            hideInSearch: true,
        },
        {
            title: "Device Name",
            dataIndex: "name",
            hideInSearch: true,
        },

        {
            title: "Type",
            dataIndex: "type",
            hideInSearch: true,
        },
        {
            title: "Location",
            dataIndex: "location",
            hideInSearch: true,
        },
        {
            title: "Status",
            dataIndex: "status",
            hideInSearch: true,
        },
        {
            title: "Performance",
            dataIndex: "performance",
            hideInSearch: true,
        },
        {
            title: "Room",
            dataIndex: "room",
            render: (text, record, index, action) => {
                return <span>{record.room.roomName}</span>;
            },
            hideInSearch: true,
        },
        {
            title: "Actions",
            hideInSearch: true,
            width: 50,
            render: (_value, entity, _index, _action) => (
                <Space>
                    <EditOutlined
                        style={{
                            fontSize: 20,
                            color: "#ffa500",
                        }}
                        type=""
                        onClick={() => {
                            setOpenModal(true);
                            setDataInit(entity);
                        }}
                    />
                    <Popconfirm
                        placement="leftTop"
                        title={"Xác nhận xóa device"}
                        description={"Bạn có chắc chắn muốn xóa device này ?"}
                        onConfirm={() => handleDeleteDevice(entity._id)}
                        okText="Xác nhận"
                        cancelText="Hủy"
                    >
                        <span style={{ cursor: "pointer", margin: "0 10px" }}>
                            <DeleteOutlined
                                style={{
                                    fontSize: 20,
                                    color: "#ff4d4f",
                                }}
                            />
                        </span>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const reloadTable = () => {
        tableRef?.current?.reload();
    };

    return (
        <div>
            <DataTable
                search={false}
                actionRef={tableRef}
                headerTitle="Danh sách Device"
                rowKey="_id"
                loading={loading}
                columns={columns}
                dataSource={devices}
                request={async (params, sort, filter) => {
                    await getAllDevice();
                }}
                scroll={{ x: true }}
                rowSelection={false}
                toolBarRender={(_action, _rows) => {
                    return (
                        <Button
                            icon={<PlusOutlined />}
                            type="primary"
                            onClick={() => setOpenModal(true)}
                        >
                            Thêm mới
                        </Button>
                    );
                }}
            />
            <ModalDevice
                openModal={openModal}
                setOpenModal={setOpenModal}
                reloadTable={reloadTable}
                dataInit={dataInit}
                setDataInit={setDataInit}
            />
        </div>
    );
};

export default Device;
