import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import useGetAccessLogs from "hooks/useGetAccessLog";
import useGetSensorLogs from "hooks/useGetSensorLogs";
import { DEVICE_TYPE } from "constants/device";

const PowerConsumer = ({ selectedRoom }) => {
  const [chartDataSensorLog, setChartDataSensorLog] = useState({});
  const [timeRange, setTimeRange] = useState("week");
  const { accessLogs, getAllAccessLog } = useGetAccessLogs(
    `type=${DEVICE_TYPE.VENTILATION_FAN}`
  );
  const { sensorLogs, getAllSensorLog } = useGetSensorLogs();

  const filterLogsByTime = (logs, range) => {
    const now = new Date();
    if (!logs || logs.length === 0) return [];

    if (range === "week") {
      const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));
      return logs.filter((log) => new Date(log.timeLog) >= oneWeekAgo);
    } else if (range === "month") {
      const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
      return logs.filter((log) => new Date(log.timeLog) >= oneMonthAgo);
    } else if (range === "year") {
      const oneYearAgo = new Date(now.setFullYear(now.getFullYear() - 1));
      return logs.filter((log) => new Date(log.timeLog) >= oneYearAgo);
    }
    return logs;
  };

  useEffect(() => {
    if (selectedRoom) {
      console.log("Selected room:", selectedRoom);
      getAllSensorLog(`type=${selectedRoom}`).then((data) =>
        console.log("Fetched sensor data:", data)
      );
    }

    const interval = setInterval(() => {
      getAllAccessLog(`type=${DEVICE_TYPE.VENTILATION_FAN}`);
      if (selectedRoom) {
        getAllSensorLog(`type=${selectedRoom}`);
      }
    }, 1800000); // 30 phút

    return () => clearInterval(interval);
  }, [selectedRoom]);

  useEffect(() => {
    const filteredSensorLogs = filterLogsByTime(sensorLogs, timeRange);
    console.log("Filtered sensor logs:", filteredSensorLogs);

    const labels = filteredSensorLogs.map((log) => new Date(log.timeLog));
    const co2Values = filteredSensorLogs.map((log) => log.CO2);

    setChartDataSensorLog({
      labels: labels,
      datasets: [
        {
          label: "CO2 (ppm)",
          data: co2Values,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: false,
          tension: 0.1,
        },
      ],
    });
  }, [sensorLogs, timeRange]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time",
        time: {
          unit:
            timeRange === "week"
              ? "day"
              : timeRange === "month"
              ? "week"
              : "month",
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 6,
        },
      },
      y: {
        beginAtZero: true,
        min: 0,
        max: 2000,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div className="w-full bg-white shadow-md rounded-2xl p-6 mt-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Thống kê CO2</h1>
        <Select
          defaultValue="week"
          style={{ width: 120 }}
          onChange={(val) => setTimeRange(val)}
          options={[
            { value: "week", label: "Theo tuần" },
            { value: "month", label: "Theo tháng" },
            { value: "year", label: "Theo năm" },
          ]}
        />
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-700 mb-2">
          Biểu đồ nồng độ khí CO2 (ppm)
        </h2>
        <div className="relative w-full min-h-[350px] bg-[#f9fafb] rounded-xl shadow-inner p-4">
          {sensorLogs.length > 0 ? (
            <Line data={chartDataSensorLog} options={chartOptions} />
          ) : (
            <p className="text-center text-gray-500 py-10">
              Không có dữ liệu phù hợp.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PowerConsumer;
