import { notification } from "antd"
import { callGetDevices } from "config/api"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "utils/UserContext";

const useGetDevices = () => {
    const { user } = useContext(UserContext);
    const [devices, setDevices] = useState([])
    const [loading, setLoading] = useState(true)

    const getAllDevice = async () => {
        try {
            const res = await callGetDevices({
                headers: {
                    Authorization: 'Bearer ' + user.token
                }
            })
            if (res?.data) {
                setDevices(res.data)
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
        getAllDevice()
    }, [])

    return { loading, devices, getAllDevice }
}

export default useGetDevices