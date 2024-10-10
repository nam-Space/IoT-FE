import { ModalForm, ProFormText } from "@ant-design/pro-components";
import { Col, Form, Row, message, notification } from "antd";
import { useContext, useEffect } from "react";
import { callCreateRoom, callUpdateRoom } from "config/api";
import { UserContext } from "utils/UserContext";

const ModalRoom = (props) => {
    const { user } = useContext(UserContext);
    const { openModal, setOpenModal, reloadTable, dataInit, setDataInit } =
        props;

    const [form] = Form.useForm();

    useEffect(() => {
        return () => form.resetFields();
    }, [dataInit]);

    const submitRoom = async (valuesForm) => {
        const { roomName, description } = valuesForm;

        try {
            if (dataInit?._id) {
                //update
                const room = {
                    _id: dataInit._id,
                    roomName,
                    description,
                };

                const res = await callUpdateRoom(room, {
                    headers: {
                        Authorization: "Bearer " + user.token,
                    },
                });
                message.success("Cập nhật room thành công");
                handleReset();
                reloadTable();
            } else {
                //create
                const room = {
                    roomName,
                    description,
                };
                const res = await callCreateRoom(room, {
                    headers: {
                        Authorization: "Bearer " + user.token,
                    },
                });
                message.success("Thêm mới room thành công");
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
                onFinish={submitRoom}
                initialValues={dataInit?._id ? dataInit : {}}
            >
                <Row gutter={16}>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText
                            label="Name"
                            name="roomName"
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
                        <ProFormText
                            label="Description"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng không bỏ trống",
                                },
                            ]}
                            placeholder="Nhập description"
                        />
                    </Col>
                </Row>
            </ModalForm>
        </>
    );
};

export default ModalRoom;
