import { notification } from "antd"
import { callGetUsers } from "config/api"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "utils/UserContext";
import useLogoutUser from "./useLogoutUser";

const useGetUsers = () => {
    const { user } = useContext(UserContext);
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const { handleLogout } = useLogoutUser()

    const getUser = async () => {
        try {
            const res = await callGetUsers({
                headers: {
                    Authorization: 'Bearer ' + user.token
                }
            })
            if (res?.data) {
                setUsers(res.data)
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
            // token expired
            if (error.status === 403) {
                handleLogout()
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    return { loading, users, getUser }
}

export default useGetUsers