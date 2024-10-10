import { notification } from "antd"
import { callGetRooms } from "config/api"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "utils/UserContext";

const useGetRooms = () => {
    const { user } = useContext(UserContext);
    const [rooms, setRooms] = useState([])
    const [loading, setLoading] = useState(true)

    const getAllRoom = async () => {
        try {
            const res = await callGetRooms({
                headers: {
                    Authorization: 'Bearer ' + user.token
                }
            })
            if (res?.data) {
                setRooms(res.data)
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
        getAllRoom()
    }, [])

    return { loading, rooms, getAllRoom }
}

export default useGetRooms