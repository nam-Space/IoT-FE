import { notification } from 'antd'
import { callGetSensorById } from 'config/api';
import { callGetRoomById } from 'config/api'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from 'utils/UserContext';

const useFindOneSensor = (_id = null) => {
    const { user } = useContext(UserContext);
    const [sensor, setSensor] = useState({})
    const [loading, setLoading] = useState(true)

    const getSensor = async (subId = null) => {
        try {
            const res = await callGetSensorById(subId || _id, {
                headers: {
                    Authorization: 'Bearer ' + user.token
                }
            })
            if (res?.data) {
                setSensor(res.data)
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
        getSensor(_id)
    }, [])

    return { loading, sensor, getSensor }
}

export default useFindOneSensor