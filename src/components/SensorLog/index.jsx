import React, { useRef } from "react";
import DataTable from "utils/DataTable";
import useGetSensorLogs from "hooks/useGetSensorLogs";
import dayjs from "dayjs";
import { STATUS } from "constants/status";
import { SENSOR_TYPE } from "constants/sensor";

const SensorLog = () => {
    const tableRef = useRef();

    const { loading, sensorLogs, getAllSensorLog } = useGetSensorLogs();

    const columns = [
        {
            title: "Id",
            dataIndex: "_id",
            width: 250,
            render: (text, record, index, action) => {
                return <span>{record._id}</span>;
            },
            hideInSearch: true,
        },
        {
            title: "Sensor Name",
            dataIndex: "name",
            render: (text, record, index, action) => {
                return <span>{record.sensor.name}</span>;
            },
            hideInSearch: true,
        },

        {
            title: "Type",
            dataIndex: "type",
            render: (text, record, index, action) => {
                return <span>{record.sensor.type}</span>;
            },
            hideInSearch: true,
        },
        {
            title: "Temperature",
            dataIndex: "temperature",
            render: (text, record, index, action) => {
                return (
                    <span>
                        {record.temperature ? `${record.temperature}°C` : ""}
                    </span>
                );
            },
            hideInSearch: true,
        },
        {
            title: "Humidity",
            dataIndex: "humidity",
            render: (text, record, index, action) => {
                return (
                    <span>{record.humidity ? `${record.humidity}%` : ""}</span>
                );
            },
            hideInSearch: true,
        },
        {
            title: "Location",
            dataIndex: "location",
            render: (text, record, index, action) => {
                return <span>{record.sensor.location}</span>;
            },
            hideInSearch: true,
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (text, record, index, action) => {
                return <span>{record.status}</span>;
            },
            hideInSearch: true,
        },
        {
            title: "Room",
            dataIndex: "room",
            render: (text, record, index, action) => {
                return <span>{record.sensor.room.roomName}</span>;
            },
            hideInSearch: true,
        },
        {
            title: "Device",
            dataIndex: "device",
            render: (text, record, index, action) => {
                return <span>{record.sensor.device.name}</span>;
            },
            hideInSearch: true,
        },
        {
            title: "Time",
            dataIndex: "time",
            render: (text, record, index, action) => {
                return (
                    <span>
                        {dayjs(record.timeLog).format("DD-MM-YYYY HH:mm:ss")}
                    </span>
                );
            },
            hideInSearch: true,
        },
    ];

    return (
        <div>
            <DataTable
                search={false}
                actionRef={tableRef}
                headerTitle="Danh sách Sensor Log"
                rowKey="_id"
                loading={loading}
                columns={columns}
                dataSource={sensorLogs}
                request={async (params, sort, filter) => {
                    await getAllSensorLog();
                }}
                scroll={{ x: true }}
                rowSelection={false}
            />
        </div>
    );
};

export default SensorLog;
