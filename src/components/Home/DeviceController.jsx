import { message, notification, Select, Switch } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FaTemperatureQuarter } from "react-icons/fa6";
import { IoWaterSharp } from "react-icons/io5";
import { PiFanLight } from "react-icons/pi";
import { Slider } from "antd";
import useGetRooms from "hooks/useGetRooms";
import { handleGetIconDevice } from "utils/icon";
import { callUpdateDevice } from "config/api";
import _, { set } from "lodash";
import { STATUS } from "constants/status";
import { DEVICE_TYPE } from "constants/device";
import { UserContext } from "utils/UserContext";
import axios from "axios";
import { io } from "socket.io-client";
import PowerConsumer from "./PowerConsumer";

const DeviceController = () => {
  const { user } = useContext(UserContext);
  const { rooms, getAllRoom } = useGetRooms();
  const [status, setStatus] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [room, setRoom] = useState({
    label: "",
    value: "",
  });
  const [selectedDevice, setSelectedDevice] = useState({});
  const [socket, setSocket] = useState(null);
  const [statusDevice, setStatusDevice] = useState({
    statusFan: "OFF",
    idFan: "id",
    statusBuzzer: "OFF",
    idBuzzer: "id",
    statusServo: "OFF",
    idServo: "id",
  });

  useEffect(() => {
    const socket = io(process.env.REACT_APP_BE_URL);

    setSocket(socket);

    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    socket?.on("device-status", (payload) => {
      setStatusDevice({ ...payload });
    });
  }, [socket]);
  console.log(statusDevice);
  useEffect(() => {
    if (rooms.length > 0) {
      const roomIdx = rooms.findIndex((r) =>
        r.devices.some((d) => d._id === selectedDevice._id)
      );
      setRoom({
        label: _.isEmpty(selectedDevice)
          ? rooms[0].roomName
          : rooms[roomIdx].roomName,
        value: _.isEmpty(selectedDevice) ? rooms[0]._id : rooms[roomIdx]._id,
        ...(_.isEmpty(selectedDevice) ? rooms[0] : rooms[roomIdx]),
      });
      setSelectedDevice({
        ...(_.isEmpty(selectedDevice)
          ? {
              ...rooms[0].devices[0],
            }
          : rooms[roomIdx].devices.find((d) => d._id === selectedDevice._id)),
      });
    }
  }, [rooms]);

  const marks = {
    0: "0%",
    25: "25%",
    50: "50%",
    75: "75%",
    100: {
      style: {
        color: "#f50",
      },
      label: <strong>100%</strong>,
    },
  };

  const handleChangeRoom = (value) => {
    const roomData = rooms.find((r) => r._id === value);
    setRoom({
      label: roomData.roomName,
      value: roomData._id,
      ...roomData,
    });
    if (roomData.roomName === "Kitchen Room") {
      setSelectedRoom("RAIN");
    } else if (roomData.roomName === "Living Room") {
      setSelectedRoom("AIR");
    }
    console.log(selectedRoom);
    setSelectedDevice({
      ...roomData.devices[0],
    });
  };
  console.log(room);
  const handleUpdateStatusDevice = async (value, device) => {
    try {
      let statusState = value ? "on" : "off";
      let typeDevice = "";
      if (device?.type == "VENTILATION_FAN") {
        typeDevice = "fan";
      } else if (device?.type == "SMOKE_ALARM") {
        typeDevice = "buzzer";
      } else typeDevice = "servo";
      await axios.post(
        `http://localhost:8080/device/${typeDevice}/${statusState}/${room.label}`
      );
      const res = await callUpdateDevice(
        {
          ...device,
          status: value ? STATUS.ON : STATUS.OFF,
        },
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      await getAllRoom();
      message.success("Cập nhật device thành công!");
    } catch (error) {
      console.log("error", error);
      notification.error({
        message: "Có lỗi xảy ra",
        description: error?.response?.data?.error || error.message,
        duration: 5,
      });
    }
  };

  const handleUpdateAutoOrManual = async (roomName) => {
    setStatus(!status);
    let statusApi = "";
    if (!status) {
      statusApi = "AUTO";
    } else {
      statusApi = "MANUAL";
    }
    const res = await axios.post(
      `http://localhost:8080/device/mode/${statusApi}/${roomName}`
    );
    if (res.status === 200) {
      message.success("Cập nhật chế độ thành công!");
    } else {
      message.error("Cập nhật chế độ thất bại!");
    }
  };
  const handleUpdateAutoDevice = async (value, device) => {
    try {
      const res = await callUpdateDevice(
        {
          ...device,
          status: value ? STATUS.AUTO : STATUS.ON,
        },
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      await getAllRoom();
      message.success("Cập nhật device thành công!");
    } catch (error) {
      console.log("error", error);
      notification.error({
        message: "Có lỗi xảy ra",
        description: error?.response?.data?.error || error.message,
        duration: 5,
      });
    }
  };

  const handleUpdateFanPerformance = async (value, device) => {
    try {
      const res = await callUpdateDevice(
        {
          ...device,
          performance: value,
        },
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      await getAllRoom();
      message.success("Cập nhật device thành công!");
    } catch (error) {
      console.log("error", error);
      notification.error({
        message: "Có lỗi xảy ra",
        description: error?.response?.data?.error || error.message,
        duration: 5,
      });
    }
  };

  return (
    <div className="flex gap-[30px] mt-[37px]">
      <div className="flex-1">
        <div className="flex justify-between">
          <h1 className="text-[22px] font-bold">{user.name}'s Home</h1>
          <div className="flex gap-[24px]">
            <div className="flex items-center text-blue-500">
              <IoWaterSharp /> 35%{" "}
            </div>
            <div className="flex items-center text-red-400">
              <FaTemperatureQuarter /> 15°C{" "}
            </div>
            <div>
              <Select
                value={room.value}
                style={{ width: 200 }}
                onChange={handleChangeRoom}
                options={
                  rooms.length > 0
                    ? rooms.map((room) => {
                        return {
                          value: room._id,
                          label: room.roomName,
                        };
                      })
                    : []
                }
              />
            </div>
          </div>
        </div>
        <div className="w-[220px] h-[120px] bg-[#7a40f2] rounded-2xl flex flex-col items-center justify-center p-3 text-white shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
          <p className="text-sm font-medium text-center">CHẾ ĐỘ HOẠT ĐỘNG</p>

          <div className="w-full flex justify-between items-center font-semibold mt-3 text-sm">
            <span>AUTO</span>
            <Switch
              value={status}
              onClick={() => handleUpdateAutoOrManual(room.label)}
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-[30px] mt-[20px]">
          {room?.devices?.length > 0 &&
            Array.from(room.devices).map((device, index) => (
              <div
                key={index}
                onClick={() => setSelectedDevice(device)}
                className={`flex flex-col items-start ${
                  selectedDevice._id === device._id
                    ? "bg-[#7A40F2]"
                    : "bg-white"
                } p-[20px] rounded-[25px] cursor-pointer`}
              >
                <div
                  className={`${
                    selectedDevice._id === device._id
                      ? "text-white"
                      : "text-[#7A40F2]"
                  } w-full flex justify-between font-semibold`}
                >
                  ON
                  <Switch
                    disabled={status === true}
                    value={
                      device.status === STATUS.ON ||
                      device.status === STATUS.AUTO ||
                      (statusDevice.statusFan === "ON" &&
                        device._id === statusDevice.idFan) ||
                      (statusDevice.statusBuzzer === "ON" &&
                        device._id === statusDevice.idBuzzer) ||
                      (statusDevice.statusServo === "ON" &&
                        device._id === statusDevice.idServo)
                    }
                    onChange={async (val) =>
                      await handleUpdateStatusDevice(val, device)
                    }
                  />
                </div>
                {/* <div
                className={`${
                  selectedDevice._id === device._id
                    ? "text-white"
                    : "text-[#7A40F2]"
                } w-full flex justify-between font-semibold mt-[10px]`}
              >
                AUTO
                <Switch
                  disabled={device.status === STATUS.OFF}
                  value={device.status === STATUS.AUTO}
                  onChange={async (val) =>
                    await handleUpdateAutoDevice(val, device)
                  }
                />
              </div> */}
                {handleGetIconDevice(
                  device.type,
                  selectedDevice._id === device._id
                )}
                <div
                  className={`${
                    selectedDevice._id === device._id
                      ? "text-white"
                      : "text-[#7A40F2]"
                  } mt-[10px] font-semibold`}
                >
                  {device.name}
                </div>
              </div>
            ))}
        </div>

        {selectedDevice.type === DEVICE_TYPE.FAN && (
          <div className="p-[30px] bg-white rounded-[28px] mt-[25px]">
            <div className="flex justify-between">
              <div className="flex items-center gap-[12px] text-[#7A40F2] font-semibold">
                <div className="relative">
                  <div className="h-[36px] w-[36px] bg-[#7A40F2] rounded-[50%] opacity-20"></div>
                  <PiFanLight className="text-[20px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
                </div>
                {selectedDevice.name} speed
              </div>
              <div className="flex gap-[16px] font-semibold">
                ON
                <Switch
                  checked={
                    selectedDevice.status === STATUS.ON ||
                    selectedDevice.status === STATUS.AUTO
                  }
                  onChange={async (val) =>
                    await handleUpdateStatusDevice(val, selectedDevice)
                  }
                />
              </div>
            </div>
            <div>
              <Slider
                defaultValue={selectedDevice.performance}
                marks={marks}
                onChangeComplete={async (val) =>
                  await handleUpdateFanPerformance(val, selectedDevice)
                }
              />
            </div>
          </div>
        )}

        {/* <div className="mt-[30px] flex justify-center">
                    <Thermostat
                        height={400}
                        width={400}
                        ambientTemperature={0}
                        targetTemperature={27}
                        hvacMode="heating"
                        unit="°C"
                        minValue={0}
                    />
                </div> */}
      </div>
      <div className="flex-1">
        <PowerConsumer selectedRoom={selectedRoom} />
      </div>
    </div>
  );
};

export default DeviceController;
