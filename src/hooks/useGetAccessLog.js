import { notification } from "antd"
import { callGetAccessLogs } from "config/api";
import { useContext, useEffect, useState } from "react"
import { UserContext } from "utils/UserContext";

const useGetAccessLogs = (query = null) => {
    const { user } = useContext(UserContext);
    const [accessLogs, setAccessLogs] = useState([])
    const [loading, setLoading] = useState(true)

    const getAllAccessLog = async (subQuery = null) => {
        try {
            const res = await callGetAccessLogs(subQuery || query, {
                headers: {
                    Authorization: 'Bearer ' + user.token
                }
            })
            if (res?.data) {
                setAccessLogs(res.data)
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

    useEffect(() => {
        getAllAccessLog()
    }, [])

    return { loading, accessLogs, getAllAccessLog }
}

export default useGetAccessLogs