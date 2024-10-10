import { Button, message, notification, Popconfirm, Space } from "antd";
import React, { useContext, useRef, useState } from "react";
import DataTable from "utils/DataTable";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import ModalRoom from "./ModalRoom";
import useGetRooms from "hooks/useGetRooms";
import { callDeleteRoom } from "config/api";
import { UserContext } from "utils/UserContext";

const Room = () => {
    const tableRef = useRef();
    const { user } = useContext(UserContext);
    const [openModal, setOpenModal] = useState(false);
    const [dataInit, setDataInit] = useState(null);

    const { getAllRoom, loading, rooms } = useGetRooms();

    const handleDeleteRoom = async (_id) => {
        if (_id) {
            try {
                const res = await callDeleteRoom(_id, {
                    headers: {
                        Authorization: "Bearer " + user.token,
                    },
                });
                message.success("Xóa Room thành công");
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
            title: "Room Name",
            dataIndex: "roomName",
            hideInSearch: true,
        },
        {
            title: "Description",
            dataIndex: "description",
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
                        title={"Xác nhận xóa room"}
                        description={"Bạn có chắc chắn muốn xóa room này ?"}
                        onConfirm={() => handleDeleteRoom(entity._id)}
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
                headerTitle="Danh sách Room"
                rowKey="_id"
                loading={loading}
                columns={columns}
                dataSource={rooms}
                request={async (params, sort, filter) => {
                    await getAllRoom();
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
            <ModalRoom
                openModal={openModal}
                setOpenModal={setOpenModal}
                reloadTable={reloadTable}
                dataInit={dataInit}
                setDataInit={setDataInit}
            />
        </div>
    );
};

export default Room;
