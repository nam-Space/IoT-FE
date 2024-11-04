import {
    ModalForm,
    ProFormDigit,
    ProFormSelect,
    ProFormText,
} from "@ant-design/pro-components";
import { Col, Form, Row, message, notification } from "antd";
import { useState, useEffect, useContext } from "react";
import { callUpdateUser, callCreateUser } from "config/api";
import { ROLE } from "constants/role";
import { GENDER } from "config/gender";
import { UserContext } from "utils/UserContext";

const ModalUser = (props) => {
    const { user } = useContext(UserContext);
    const { openModal, setOpenModal, reloadTable, dataInit, setDataInit } =
        props;

    const [form] = Form.useForm();

    useEffect(() => {
        return () => form.resetFields();
    }, [dataInit]);

    const submitUser = async (valuesForm) => {
        const { name, username, password, gender, address, cardId, role } =
            valuesForm;

        try {
            if (dataInit?._id) {
                //update
                const userForm = {
                    _id: dataInit._id,
                    name,
                    password,
                    gender,
                    address,
                    cardId,
                    role,
                };

                const res = await callUpdateUser(userForm, {
                    headers: {
                        Authorization: "Bearer " + user.token,
                    },
                });
                message.success("Cập nhật user thành công");
                handleReset();
                reloadTable();
            } else {
                //create
                const userForm = {
                    name,
                    username,
                    password,
                    gender,
                    address,
                    cardId,
                    role,
                };
                const res = await callCreateUser(userForm, {
                    headers: {
                        Authorization: "Bearer " + user.token,
                    },
                });
                message.success("Thêm mới user thành công");
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

    const handleReset = async () => {
        form.resetFields();
        setDataInit(null);
        setOpenModal(false);
    };

    return (
        <>
            <ModalForm
                title={<>{dataInit?._id ? "Cập nhật User" : "Tạo mới User"}</>}
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
                onFinish={submitUser}
                initialValues={
                    dataInit?._id
                        ? {
                              ...dataInit,
                              cardId: dataInit?.cardReader?.cardId,
                          }
                        : {}
                }
            >
                <Row gutter={16}>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText
                            disabled={dataInit?._id ? true : false}
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng không bỏ trống",
                                },
                            ]}
                            placeholder="Nhập username"
                        />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText.Password
                            disabled={dataInit?._id ? true : false}
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: dataInit?._id ? false : true,
                                    message: "Vui lòng không bỏ trống",
                                },
                            ]}
                            placeholder="Nhập password"
                        />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText
                            label="Tên hiển thị"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng không bỏ trống",
                                },
                            ]}
                            placeholder="Nhập tên hiển thị"
                        />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText
                            label="Địa chỉ"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng không bỏ trống",
                                },
                            ]}
                            placeholder="Nhập địa chỉ"
                        />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText
                            label="Card Id"
                            name="cardId"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng không bỏ trống",
                                },
                            ]}
                            placeholder="Nhập Card Id"
                        />
                    </Col>
                    <Col lg={6} md={6} sm={24} xs={24}>
                        <ProFormSelect
                            name="gender"
                            label="Giới Tính"
                            valueEnum={GENDER}
                            placeholder="Please select a gender"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn giới tính!",
                                },
                            ]}
                        />
                    </Col>
                    <Col lg={6} md={6} sm={24} xs={24}>
                        <ProFormSelect
                            name="role"
                            label="Vai trò"
                            valueEnum={ROLE}
                            placeholder="Please select a role"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn vai trò!",
                                },
                            ]}
                        />
                    </Col>
                </Row>
            </ModalForm>
        </>
    );
};

export default ModalUser;
