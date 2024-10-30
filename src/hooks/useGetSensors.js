import { notification } from "antd"
import { callGetSensor } from "config/api"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "utils/UserContext";

const useGetSensors = (query = null) => {
    const { user } = useContext(UserContext);
    const [sensors, setSensors] = useState([])
    const [loading, setLoading] = useState(true)

    const getAllSensor = async (subQuery = null) => {
        try {
            const res = await callGetSensor(subQuery || query, {
                headers: {
                    Authorization: 'Bearer ' + user.token
                }
            })
            if (res?.data) {
                setSensors(res.data)
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
        getAllSensor()
    }, [])

    return { loading, sensors, getAllSensor }
}

export default useGetSensors