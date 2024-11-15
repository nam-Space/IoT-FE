import { notification } from "antd"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "utils/UserContext";
import useLogoutUser from "./useLogoutUser";
import { callGetCardReaderLogs } from "config/api";

const useGetCardReaderLogs = (query = null) => {
    const { user } = useContext(UserContext);
    const [cardReaderLogs, setCardReaderLogs] = useState([])
    const [loading, setLoading] = useState(true)
    const { handleLogout } = useLogoutUser()

    const getAllCardReaderLog = async (subQuery = null) => {
        try {
            const res = await callGetCardReaderLogs(subQuery || query, {
                headers: {
                    Authorization: 'Bearer ' + user.token
                }
            })
            if (res?.data) {
                setCardReaderLogs(res.data)
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
        getAllCardReaderLog()
    }, [])

    return { loading, cardReaderLogs, getAllCardReaderLog }
}

export default useGetCardReaderLogs