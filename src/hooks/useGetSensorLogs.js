import { notification } from "antd"
import { callGetSensorLog } from "config/api"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "utils/UserContext";

const useGetSensorLogs = () => {
    const { user } = useContext(UserContext);
    const [sensorLogs, setSensorLogs] = useState([])
    const [loading, setLoading] = useState(true)

    const getAllSensorLog = async () => {
        try {
            const res = await callGetSensorLog({
                headers: {
                    Authorization: 'Bearer ' + user.token
                }
            })
            if (res?.data) {
                setSensorLogs(res.data)
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
        getAllSensorLog()
    }, [])

    return { loading, sensorLogs, getAllSensorLog }
}

export default useGetSensorLogs