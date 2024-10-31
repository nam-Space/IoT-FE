import { notification } from 'antd'
import { callGetRoomById } from 'config/api'
import { useContext, useState } from 'react'
import { UserContext } from 'utils/UserContext';
import useLogoutUser from './useLogoutUser';

const useFindOneRoom = () => {
    const { user } = useContext(UserContext);
    const [room, setRoom] = useState({})
    const [loading, setLoading] = useState(true)
    const { handleLogout } = useLogoutUser()

    const getRoom = async (_id) => {
        try {
            const res = await callGetRoomById(_id, {
                headers: {
                    Authorization: 'Bearer ' + user.token
                }
            })
            if (res?.data) {
                setRoom(res.data)
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

    return { loading, room, getRoom }
}

export default useFindOneRoom