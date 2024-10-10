import { DEVICE_TYPE } from "constants/device";
import { BiDoorOpen } from "react-icons/bi";
import { HiOutlineLightBulb } from "react-icons/hi";
import { PiFanLight } from "react-icons/pi";
import { FaRegQuestionCircle } from "react-icons/fa";

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
