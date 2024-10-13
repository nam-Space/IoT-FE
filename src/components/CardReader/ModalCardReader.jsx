import {
    ModalForm,
    ProFormSelect,
    ProFormText,
} from "@ant-design/pro-components";
import { Col, Form, Row, message, notification } from "antd";
import { useContext, useEffect } from "react";
import { STATUS } from "constants/status";
import { UserContext } from "utils/UserContext";
import { callUpdateCardReader, callCreateCardReader } from "config/api";

const ModalDevice = (props) => {
    const { user } = useContext(UserContext);
    const { openModal, setOpenModal, reloadTable, dataInit, setDataInit } =
        props;

    const [form] = Form.useForm();

    useEffect(() => {
        return () => form.resetFields();
    }, [dataInit]);

    const submitForm = async (valuesForm) => {
        const { cardId, location, status } = valuesForm;

        try {
            if (dataInit?._id) {
                //update
                const cardReader = {
                    _id: dataInit._id,
                    cardId,
                    location,
                    status,
                };

                const res = await callUpdateCardReader(cardReader, {
                    headers: {
                        Authorization: "Bearer " + user.token,
                    },
                });
                message.success("Cập nhật cardReader thành công");
                handleReset();
                reloadTable();
            } else {
                //create
                const cardReader = {
                    cardId,
                    location,
                    status,
                };
                const res = await callCreateCardReader(cardReader, {
                    headers: {
                        Authorization: "Bearer " + user.token,
                    },
                });
                message.success("Thêm mới cardReader thành công");
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

    const handleReset = () => {
        form.resetFields();
        setDataInit(null);
        setOpenModal(false);
    };

    return (
        <>
            <ModalForm
                title={
                    <>
                        {dataInit?._id
                            ? "Cập nhật CardReader"
                            : "Tạo mới CardReader"}
                    </>
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
                          }
                        : {}
                }
            >
                <Row gutter={16}>
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
                            placeholder="Nhập card Id"
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
