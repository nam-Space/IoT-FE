import {
    ModalForm,
    ProForm,
    ProFormDigit,
    ProFormSelect,
    ProFormText,
} from "@ant-design/pro-components";
import { Col, Form, Row, message, notification } from "antd";
import { useContext, useEffect, useState } from "react";
import { DebounceSelect } from "utils/DebounceSelect";
import useGetRooms from "hooks/useGetRooms";
import useGetDevices from "hooks/useGetDevices";
import { SENSOR_TYPE } from "constants/sensor";
import { callUpdateSensor } from "config/api";
import { callCreateSensor } from "config/api";
import { UserContext } from "utils/UserContext";
import { STATUS } from "constants/status";

const ModalSensor = (props) => {
    const { user } = useContext(UserContext);
    const { openModal, setOpenModal, reloadTable, dataInit, setDataInit } =
        props;

    const { rooms } = useGetRooms();
    const { devices } = useGetDevices();

    const [room, setRoom] = useState({
        label: "",
        value: "",
        key: "",
    });

    const [device, setDevice] = useState({
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
            setDevice({
                label: dataInit.device.name,
                value: dataInit.device._id,
                key: dataInit.device._id,
            });
        } else {
            setRoom({
                label: "",
                value: "",
                key: "",
            });
            setDevice({
                label: "",
                value: "",
                key: "",
            });
        }
        return () => form.resetFields();
    }, [dataInit]);

    const submitForm = async (valuesForm) => {
        const { name, type, tempature, humidity, location, status } =
            valuesForm;

        try {
            if (dataInit?._id) {
                //update
                const sensor = {
                    _id: dataInit._id,
                    name,
                    type,
                    tempature,
                    humidity,
                    location,
                    roomId: room.value,
                    deviceId: device.value,
                    status,
                };

                const res = await callUpdateSensor(sensor, {
                    headers: {
                        Authorization: "Bearer " + user.token,
                    },
                });
                message.success("Cập nhật sensor thành công");
                handleReset();
                reloadTable();
            } else {
                //create
                const sensor = {
                    name,
                    type,
                    tempature,
                    humidity,
                    location,
                    roomId: room.value,
                    deviceId: device.value,
                    status,
                };
                const res = await callCreateSensor(sensor, {
                    headers: {
                        Authorization: "Bearer " + user.token,
                    },
                });
                message.success("Thêm mới sensor thành công");
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

    async function fetchDeviceList(name) {
        return devices.map((room) => {
            return {
                key: room._id,
                label: room.name,
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
                title={
                    <>{dataInit?._id ? "Cập nhật Sensor" : "Tạo mới Sensor"}</>
                }
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
                              roomId: dataInit.room,
                              deviceId: dataInit.device,
                          }
                        : {}
                }
            >
                <Row gutter={16}>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText
                            label="Sensor Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng không bỏ trống",
                                },
                            ]}
                            placeholder="Nhập sensor name"
                        />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormSelect
                            name="type"
                            label="Loại cảm biến"
                            valueEnum={SENSOR_TYPE}
                            placeholder="Please select a sensor type"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn sensor type!",
                                },
                            ]}
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
                    <Col lg={6} md={6} sm={24} xs={24}>
                        <ProFormDigit
                            label="Temperature"
                            name="temperature"
                            placeholder="Nhập temperature"
                        />
                    </Col>
                    <Col lg={6} md={6} sm={24} xs={24}>
                        <ProFormDigit
                            label="Humidity"
                            name="humidity"
                            placeholder="Nhập humidity"
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
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProForm.Item
                            name="deviceId"
                            label="Device"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn device!",
                                },
                            ]}
                        >
                            <DebounceSelect
                                allowClear
                                showSearch
                                defaultValue={device}
                                value={device}
                                placeholder="Chọn device"
                                fetchOptions={fetchDeviceList}
                                onChange={(newValue) => {
                                    setDevice({
                                        key: newValue?.key,
                                        label: newValue?.label,
                                        value: newValue?.value,
                                    });
                                }}
                                style={{ width: "100%" }}
                            />
                        </ProForm.Item>
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        {/* <ProFormSelect
                            name="status"
                            label="Status"
                            valueEnum={STATUS}
                            placeholder="Please select a status"
                        /> */}
                        <ProFormText
                            label="Status"
                            name="status"
                            placeholder="Nhập status"
                        />
                    </Col>
                </Row>
            </ModalForm>
        </>
    );
};

export default ModalSensor;
