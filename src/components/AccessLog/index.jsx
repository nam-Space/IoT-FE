import React, { useRef } from "react";
import DataTable from "utils/DataTable";
import useGetAccessLogs from "hooks/useGetAccessLog";
import dayjs from "dayjs";

const AccessLog = () => {
  const tableRef = useRef();

  const { loading, accessLogs, getAllAccessLog } = useGetAccessLogs();

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      width: 250,
      render: (text, record, index, action) => {
        return <span>{record?._id}</span>;
      },
      hideInSearch: true,
    },
    {
      title: "Performance",
      dataIndex: "performance",
      render: (text, record, index, action) => {
        return <span>{record?.performance}%</span>;
      },
      hideInSearch: true,
    },

    {
      title: "Status",
      dataIndex: "status",
      render: (text, record, index, action) => {
        return <span>{record?.status}</span>;
      },
      hideInSearch: true,
    },
    {
      title: "User",
      dataIndex: "user",
      render: (text, record, index, action) => {
        return <span>{record?.user?.name}</span>;
      },
      hideInSearch: true,
    },
    {
      title: "Device Name",
      dataIndex: "device",
      render: (text, record, index, action) => {
        return <span>{record?.device?.name}</span>;
      },
      hideInSearch: true,
    },
    {
      title: "Device Type",
      dataIndex: "type",
      render: (text, record, index, action) => {
        return <span>{record?.device?.type}</span>;
      },
      hideInSearch: true,
    },
    {
      title: "Location",
      dataIndex: "location",
      render: (text, record, index, action) => {
        return <span>{record?.device?.location}</span>;
      },
      hideInSearch: true,
    },
    {
      title: "Room",
      dataIndex: "room",
      render: (text, record, index, action) => {
        return <span>{record?.device?.room?.roomName}</span>;
      },
      hideInSearch: true,
    },
    {
      title: "Time",
      dataIndex: "time",
      render: (text, record, index, action) => {
        return (
          <span>{dayjs(record?.timeLog).format("DD-MM-YYYY HH:mm:ss")}</span>
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
        headerTitle="Danh sách Access Log"
        rowKey="_id"
        loading={loading}
        columns={columns}
        dataSource={accessLogs}
        request={async (params, sort, filter) => {
          await getAllAccessLog();
        }}
        scroll={{ x: true }}
        rowSelection={false}
      />
    </div>
  );
};

export default AccessLog;
