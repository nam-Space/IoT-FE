import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import useGetAccessLogs from "hooks/useGetAccessLog";
import useGetSensorLogs from "hooks/useGetSensorLogs";
import { DEVICE_TYPE } from "constants/device";
import { SENSOR_TYPE } from "constants/sensor";

const PowerConsumer = () => {
    const [chartDataAccessLog, setChartDataAccessLog] = useState({});
    const [chartDataSensorLog, setChartDataSensorLog] = useState({});
    const [timeRange, setTimeRange] = useState("week"); // Trạng thái thời gian mặc định là tuần
    const { accessLogs, getAllAccessLog } = useGetAccessLogs(
        `type=${DEVICE_TYPE.FAN}`
    );
    const { sensorLogs, getAllSensorLog } = useGetSensorLogs(
        `type=${SENSOR_TYPE.TEMPERATURE_HUMIDITY}`
    );

    // Lọc dữ liệu theo thời gian (week, month, year)
    const filterLogsByTime = (logs, range) => {
        const now = new Date();
        let filteredLogs;

        if (range === "week") {
            const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));
            filteredLogs = logs.filter(
                (log) => new Date(log.timeLog) >= oneWeekAgo
            );
        } else if (range === "month") {
            const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
            filteredLogs = logs.filter(
                (log) => new Date(log.timeLog) >= oneMonthAgo
            );
        } else if (range === "year") {
            const oneYearAgo = new Date(now.setFullYear(now.getFullYear() - 1));
            filteredLogs = logs.filter(
                (log) => new Date(log.timeLog) >= oneYearAgo
            );
        }

        return filteredLogs;
    };

    // Tạo interval để cập nhật mỗi 2 giây
    useEffect(() => {
        const interval = setInterval(() => {
            getAllAccessLog(`type=${DEVICE_TYPE.FAN}`);
            getAllSensorLog(`type=${SENSOR_TYPE.TEMPERATURE_HUMIDITY}`);
        }, 2000);
        return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
    }, []);

    // Cập nhật biểu đồ accessLogs khi timeRange thay đổi
    useEffect(() => {
        const filteredAccessLogs = filterLogsByTime(accessLogs, timeRange);

        const labels = filteredAccessLogs.map((log) => new Date(log.timeLog)); // Lưu ý: bỏ `.toLocaleString()`
        const performanceValues = filteredAccessLogs.map(
            (log) => log.performance
        );

        setChartDataAccessLog({
            labels: labels,
            datasets: [
                {
                    label: "Performance",
                    data: performanceValues,
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    fill: false,
                    tension: 0.1,
                },
            ],
        });
    }, [accessLogs, timeRange]);

    // Cập nhật biểu đồ sensorLogs khi timeRange thay đổi
    useEffect(() => {
        const filteredSensorLogs = filterLogsByTime(sensorLogs, timeRange);

        const labels = filteredSensorLogs.map((log) => new Date(log.timeLog)); // Lưu ý: bỏ `.toLocaleString()`
        const temperatureValues = filteredSensorLogs.map(
            (log) => log.temperature
        );
        const humidityValues = filteredSensorLogs.map((log) => log.humidity);

        setChartDataSensorLog({
            labels: labels,
            datasets: [
                {
                    label: "Temperature (°C)",
                    data: temperatureValues,
                    borderColor: "rgba(255, 99, 132, 1)",
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    fill: false,
                    tension: 0.1,
                },
                {
                    label: "Humidity (%)",
                    data: humidityValues,
                    borderColor: "rgba(54, 162, 235, 1)",
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    fill: false,
                    tension: 0.1,
                },
            ],
        });
    }, [sensorLogs, timeRange]);

    const chartOptions = {
        scales: {
            x: {
                type: "time", // Sử dụng thang thời gian
                time: {
                    unit:
                        timeRange === "week"
                            ? "day"
                            : timeRange === "month"
                            ? "week"
                            : "month", // Thay đổi đơn vị thời gian dựa trên lựa chọn
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 6, // Giới hạn số lượng nhãn hiển thị
                },
            },
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                display: true,
            },
        },
    };

    return (
        <div className="bg-[#EDEDF5] rounded-[28px] p-[30px] mt-[37px]">
            <div className="flex justify-between">
                <h1 className="text-[22px] font-bold">Statistic</h1>
                <Select
                    defaultValue="week"
                    style={{ width: 100 }}
                    onChange={(val) => setTimeRange(val)} // Cập nhật timeRange khi người dùng chọn
                    options={[
                        { value: "week", label: "Week" },
                        { value: "month", label: "Month" },
                        { value: "year", label: "Year" },
                    ]}
                />
            </div>
            <div className="mt-[15px] font-semibold">
                <h2 className="text-[20px]">Biểu đồ hiệu suất chạy quạt</h2>
                <div className="mt-[10px] bg-white rounded-[28px]">
                    {accessLogs.length > 0 && (
                        <Line
                            data={chartDataAccessLog}
                            options={chartOptions}
                        />
                    )}
                </div>
            </div>
            <div className="mt-[15px] font-semibold">
                <h2 className="text-[20px]">Biểu đồ Nhiệt độ và Độ ẩm</h2>
                <div className="mt-[10px] bg-white rounded-[28px]">
                    {sensorLogs.length > 0 && (
                        <Line
                            data={chartDataSensorLog}
                            options={chartOptions}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default PowerConsumer;
