import { notification } from "antd"
import { callGetCardReader } from "config/api";
import { useContext, useEffect, useState } from "react"
import { UserContext } from "utils/UserContext";
import useLogoutUser from "./useLogoutUser";

const useGetCardReaders = () => {
    const { user } = useContext(UserContext);
    const [cardReaders, setCardReaders] = useState([])
    const [loading, setLoading] = useState(true)
    const { handleLogout } = useLogoutUser()

    const getAllCardReader = async () => {
        try {
            const res = await callGetCardReader({
                headers: {
                    Authorization: 'Bearer ' + user.token
                }
            })
            if (res?.data) {
                setCardReaders(res.data)
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
        getAllCardReader()
    }, [])

    return { loading, cardReaders, getAllCardReader }
}

export default useGetCardReaders