import { DEVICE_TYPE } from "constants/device";
import { BiDoorOpen } from "react-icons/bi";
import { HiOutlineLightBulb } from "react-icons/hi";
import { PiFanLight } from "react-icons/pi";
import { FaRegQuestionCircle } from "react-icons/fa";
import { BsFan } from "react-icons/bs";
import { RiAlarmWarningFill } from "react-icons/ri";
import { MdOutlineWindow } from "react-icons/md";
import { FaIdCard } from "react-icons/fa6";

export const handleGetIconDevice = (deviceName, active) => {
    switch (deviceName) {
        case DEVICE_TYPE.FAN:
            return (
                <PiFanLight
                    className={`text-[34px] mt-[10px] ${
                        active ? "text-white" : "text-[#7A40F2]"
                    } `}
                />
            );
        case DEVICE_TYPE.LED:
            return (
                <HiOutlineLightBulb
                    className={`text-[34px] mt-[10px] ${
                        active ? "text-white" : "text-[#7A40F2]"
                    } `}
                />
            );
        case DEVICE_TYPE.DOOR:
            return (
                <BiDoorOpen
                    className={`text-[34px] mt-[10px] ${
                        active ? "text-white" : "text-[#7A40F2]"
                    } `}
                />
            );
        case DEVICE_TYPE.VENTILATION_FAN:
            return (
                <BsFan
                    className={`text-[34px] mt-[10px] ${
                        active ? "text-white" : "text-[#7A40F2]"
                    } `}
                />
            );
        case DEVICE_TYPE.SMOKE_ALARM:
            return (
                <RiAlarmWarningFill
                    className={`text-[34px] mt-[10px] ${
                        active ? "text-white" : "text-[#7A40F2]"
                    } `}
                />
            );
        case DEVICE_TYPE.WINDOW:
            return (
                <MdOutlineWindow
                    className={`text-[34px] mt-[10px] ${
                        active ? "text-white" : "text-[#7A40F2]"
                    } `}
                />
            );
        case DEVICE_TYPE.RFID:
            return (
                <FaIdCard
                    className={`text-[34px] mt-[10px] ${
                        active ? "text-white" : "text-[#7A40F2]"
                    } `}
                />
            );
        default:
            return (
                <FaRegQuestionCircle
                    className={`text-[34px] mt-[10px] ${
                        active ? "text-white" : "text-[#7A40F2]"
                    } `}
                />
            );
    }
};
