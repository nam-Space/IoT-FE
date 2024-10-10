import { Button, Divider, Form, Input, message, notification } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import styles from "styles/auth.module.scss";
import { callLogin } from "config/api";
import { UserContext } from "utils/UserContext";
import _ from "lodash";

const Login = (props) => {
    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false);
    const { user, setUser } = useContext(UserContext);

    let location = useLocation();
    let params = new URLSearchParams(location.search);
    const callback = params?.get("callback");

    useEffect(() => {
        if (!_.isEmpty(user)) {
            navigate("/");
        }
    }, [user]);

    const onFinish = async (values) => {
        const { username, password } = values;
        setIsSubmit(true);
        try {
            const res = await callLogin(username, password);
            setIsSubmit(false);
            localStorage.setItem("user-iot", JSON.stringify(res.data));
            setUser(res.data);
            message.success("Đăng nhập tài khoản thành công!");
            window.location.href = callback ? callback : "/";
        } catch (error) {
            console.log("error", error);
            setIsSubmit(false);
            notification.error({
                message: "Có lỗi xảy ra",
                description: error?.response?.data?.error || error.message,
                duration: 5,
            });
        }
    };

    return (
        <div className={styles["login-page"]}>
            <main className={styles.main}>
                <div className={styles.container}>
                    <section className={styles.wrapper}>
                        <div className={styles.heading}>
                            <h2
                                className={`${styles.text} ${styles["text-large"]}`}
                            >
                                Đăng Nhập
                            </h2>
                            <Divider />
                        </div>
                        <Form
                            name="basic"
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Username"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Username không được để trống!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                labelCol={{ span: 24 }} //whole column
                                label="Mật khẩu"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Mật khẩu không được để trống!",
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                            // wrapperCol={{ offset: 6, span: 16 }}
                            >
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={isSubmit}
                                >
                                    Đăng nhập
                                </Button>
                            </Form.Item>
                        </Form>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Login;
