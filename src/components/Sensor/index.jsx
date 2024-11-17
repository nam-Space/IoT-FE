import { Button, message, notification, Popconfirm, Space } from "antd";
import React, { useContext, useRef, useState } from "react";
import DataTable from "utils/DataTable";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import useGetDevices from "hooks/useGetDevices";
import { callDeleteDevice } from "config/api";
import ModalSensor from "./ModalSensor";
import useGetSensors from "hooks/useGetSensors";
import { callDeleteSensor } from "config/api";
import { UserContext } from "utils/UserContext";
import { STATUS } from "constants/status";
import { SENSOR_TYPE } from "constants/sensor";

const Sensor = () => {
    const tableRef = useRef();
    const { user } = useContext(UserContext);
    const [openModal, setOpenModal] = useState(false);
    const [dataInit, setDataInit] = useState(null);

    const { loading, sensors, getAllSensor } = useGetSensors();

    const handleDeleteSensor = async (_id) => {
        if (_id) {
            try {
                const res = await callDeleteSensor(_id, {
                    headers: {
                        Authorization: "Bearer " + user.token,
                    },
                });
                message.success("Xóa sensor thành công");
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
            title: "Sensor Name",
            dataIndex: "name",
            hideInSearch: true,
        },

        {
            title: "Type",
            dataIndex: "type",
            hideInSearch: true,
        },

        {
            title: "Temperature",
            dataIndex: "temperature",
            render: (text, record, index, action) => {
                return (
                    <span>
                        {record.temperature ? `${record.temperature}°C` : ""}
                    </span>
                );
            },
            hideInSearch: true,
        },
        {
            title: "Humidity",
            dataIndex: "humidity",
            render: (text, record, index, action) => {
                return (
                    <span>{record.humidity ? `${record.humidity}%` : ""}</span>
                );
            },
            hideInSearch: true,
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (text, record, index, action) => {
                return <span>{record.status}</span>;
            },
            hideInSearch: true,
        },
        {
            title: "Location",
            dataIndex: "location",
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
            title: "Device",
            dataIndex: "device",
            render: (text, record, index, action) => {
                return <span>{record.device.name}</span>;
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
                        title={"Xác nhận xóa sensor"}
                        description={"Bạn có chắc chắn muốn xóa sensor này ?"}
                        onConfirm={() => handleDeleteSensor(entity._id)}
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
                headerTitle="Danh sách Sensor"
                rowKey="_id"
                loading={loading}
                columns={columns}
                dataSource={sensors}
                request={async (params, sort, filter) => {
                    await getAllSensor();
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
            <ModalSensor
                openModal={openModal}
                setOpenModal={setOpenModal}
                reloadTable={reloadTable}
                dataInit={dataInit}
                setDataInit={setDataInit}
            />
        </div>
    );
};

export default Sensor;
