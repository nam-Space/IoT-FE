import {
    ModalForm,
    ProForm,
    ProFormDigit,
    ProFormSelect,
    ProFormText,
} from "@ant-design/pro-components";
import { Col, Form, Row, message, notification } from "antd";
import { useContext, useEffect, useState } from "react";
import { DEVICE_TYPE } from "constants/device";
import { STATUS } from "constants/status";
import { DebounceSelect } from "utils/DebounceSelect";
import useGetRooms from "hooks/useGetRooms";
import { callUpdateDevice } from "config/api";
import { callCreateDevice } from "config/api";
import { UserContext } from "utils/UserContext";

const ModalDevice = (props) => {
    const { user } = useContext(UserContext);
    const { openModal, setOpenModal, reloadTable, dataInit, setDataInit } =
        props;

    const { getAllRoom, loading, rooms } = useGetRooms();

    const [room, setRoom] = useState({
        label: "",
        value: "",
        key: "",
    });

    const [form] = Form.useForm();

    useEffect(() => {
        if (dataInit?._id) {
            setRoom({
                label: dataInit.room.roomName,
                value: dataInit.room._id,
                key: dataInit.room._id,
            });
        } else {
            setRoom({
                label: "",
                value: "",
                key: "",
            });
        }
        return () => form.resetFields();
    }, [dataInit]);

    const submitForm = async (valuesForm) => {
        const { name, type, location, status, performance } = valuesForm;

        try {
            if (dataInit?._id) {
                //update
                const device = {
                    _id: dataInit._id,
                    name,
                    type,
                    location,
                    status,
                    performance,
                    roomId: room.value,
                };

                const res = await callUpdateDevice(device, {
                    headers: {
                        Authorization: "Bearer " + user.token,
                    },
                });
                message.success("Cập nhật device thành công");
                handleReset();
                reloadTable();
            } else {
                //create
                const device = {
                    name,
                    type,
                    location,
                    status,
                    performance,
                    roomId: room.value,
                };
                const res = await callCreateDevice(device, {
                    headers: {
                        Authorization: "Bearer " + user.token,
                    },
                });
                message.success("Thêm mới device thành công");
                handleReset();
                reloadTable();
            }
        } catch (error) {
            console.log("error", error);
            notification.error({
                message: "Có lỗi xảy ra",
                description: error?.response?.data?.error || error.message,
                duration: 5,
            });
        }
    };

    async function fetchRoomList(name) {
        return rooms.map((room) => {
            return {
                key: room._id,
                label: room.roomName,
                value: room._id,
            };
        });
    }

    const handleReset = () => {
        form.resetFields();
        setDataInit(null);
        setOpenModal(false);
    };

    return (
        <>
            <ModalForm
                title={<>{dataInit?._id ? "Cập nhật Room" : "Tạo mới Room"}</>}
                open={openModal}
                modalProps={{
                    onCancel: () => {
                        handleReset();
                    },
                    afterClose: () => handleReset(),
                    destroyOnClose: true,
                    width: 900,
                    keyboard: false,
                    maskClosable: false,
                    okText: <>{dataInit?._id ? "Cập nhật" : "Tạo mới"}</>,
                    cancelText: "Hủy",
                }}
                scrollToFirstError={true}
                preserve={false}
                form={form}
                onFinish={submitForm}
                initialValues={
                    dataInit?._id
                        ? {
                              ...dataInit,
                              roomId: dataInit.room._id,
                          }
                        : {}
                }
            >
                <Row gutter={16}>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText
                            label="Device Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng không bỏ trống",
                                },
                            ]}
                            placeholder="Nhập device name"
                        />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText
                            label="Location"
                            name="location"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng không bỏ trống",
                                },
                            ]}
                            placeholder="Nhập location"
                        />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormDigit
                            label="Performance"
                            name="performance"
                            placeholder="Nhập performance"
                        />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProForm.Item
                            name="roomId"
                            label="Room"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn room!",
                                },
                            ]}
                        >
                            <DebounceSelect
                                allowClear
                                showSearch
                                defaultValue={room}
                                value={room}
                                placeholder="Chọn room"
                                fetchOptions={fetchRoomList}
                                onChange={(newValue) => {
                                    setRoom({
                                        key: newValue?.key,
                                        label: newValue?.label,
                                        value: newValue?.value,
                                    });
                                }}
                                style={{ width: "100%" }}
                            />
                        </ProForm.Item>
                    </Col>
                    <Col lg={6} md={6} sm={24} xs={24}>
                        <ProFormSelect
                            name="type"
                            label="Loại thiết bị"
                            valueEnum={DEVICE_TYPE}
                            placeholder="Please select a device type"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn device type!",
                                },
                            ]}
                        />
                    </Col>
                    <Col lg={6} md={6} sm={24} xs={24}>
                        <ProFormSelect
                            name="status"
                            label="Status"
                            valueEnum={STATUS}
                            placeholder="Please select a status"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn status!",
                                },
                            ]}
                        />
                    </Col>
                </Row>
            </ModalForm>
        </>
    );
};

export default ModalDevice;
