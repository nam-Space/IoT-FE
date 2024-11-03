import { Button, message, notification, Popconfirm, Space } from "antd";
import React, { useContext, useRef, useState } from "react";
import DataTable from "utils/DataTable";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import useGetUsers from "hooks/useGetUsers";
import ModalUser from "./ModalUser";
import { callDeleteUser } from "config/api";
import { UserContext } from "utils/UserContext";

const User = () => {
    const tableRef = useRef();
    const { user } = useContext(UserContext);
    const [openModal, setOpenModal] = useState(false);
    const [dataInit, setDataInit] = useState(null);

    const { getUser, loading, users } = useGetUsers();

    const handleDeleteUser = async (_id) => {
        if (_id) {
            try {
                const res = await callDeleteUser(_id, {
                    headers: {
                        Authorization: "Bearer " + user.token,
                    },
                });
                message.success("Xóa User thành công");
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
            title: "Name",
            dataIndex: "name",
            hideInSearch: true,
        },
        {
            title: "Username",
            dataIndex: "username",
            hideInSearch: true,
        },
        {
            title: "Card ID",
            dataIndex: "cardId",
            render: (text, record, index, action) => {
                return (
                    <span>
                        {record?.cardReader?.cardId || "Chưa được cấp thẻ"}
                    </span>
                );
            },
            hideInSearch: true,
        },
        {
            title: "Role",
            dataIndex: "role",
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
                        title={"Xác nhận xóa user"}
                        description={"Bạn có chắc chắn muốn xóa user này ?"}
                        onConfirm={() => handleDeleteUser(entity._id)}
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
                headerTitle="Danh sách Users"
                rowKey="_id"
                loading={loading}
                columns={columns}
                dataSource={users}
                request={async (params, sort, filter) => {
                    await getUser();
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
            <ModalUser
                openModal={openModal}
                setOpenModal={setOpenModal}
                reloadTable={reloadTable}
                dataInit={dataInit}
                setDataInit={setDataInit}
            />
        </div>
    );
};

export default User;
