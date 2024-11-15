import React, { useRef } from "react";
import DataTable from "utils/DataTable";
import dayjs from "dayjs";
import useGetCardReaderLogs from "hooks/useGetCardReaderLog";

const CardReaderLog = () => {
    const tableRef = useRef();

    const { loading, cardReaderLogs, getAllCardReaderLog } =
        useGetCardReaderLogs();

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
            title: "Card Id",
            dataIndex: "cardId",
            render: (text, record, index, action) => {
                return <span>{record.cardId}</span>;
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
            title: "Door State",
            dataIndex: "doorState",
            render: (text, record, index, action) => {
                return <span>{record.doorState}</span>;
            },
            hideInSearch: true,
        },
        {
            title: "Time",
            dataIndex: "timeLog",
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
                headerTitle="Danh sách CardReader Log"
                rowKey="_id"
                loading={loading}
                columns={columns}
                dataSource={cardReaderLogs}
                request={async (params, sort, filter) => {
                    await getAllCardReaderLog();
                }}
                scroll={{ x: true }}
                rowSelection={false}
            />
        </div>
    );
};

export default CardReaderLog;
