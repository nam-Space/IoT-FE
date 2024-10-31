import { notification } from "antd"
import { callLogout } from "config/api";
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { UserContext } from "utils/UserContext";

const useLogoutUser = () => {
    const { setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await callLogout();
            if (res?.data) {
                localStorage.removeItem("user-iot");
                setUser({});
                navigate("/login");
            }
            else {
                notification.error({
                    message: "Có lỗi xảy ra",
                    description:
                        res.message && Array.isArray(res.message)
                            ? res.message[0]
                            : res.message,
                    duration: 5,
                });
                return
            }

        } catch (error) {
            notification.error({
                message: "Có lỗi xảy ra",
                description: error.message,
                duration: 5,
            });
        } finally {
            setLoading(false)
        }
    }

    return { loading, handleLogout }
}

export default useLogoutUser