import React, { useContext, useEffect } from "react";
import sunnyImg from "../../images/sunny.jfif";
import nightImg from "../../images/night.jfif";
import rainImg from "../../images/rain.jfif";
import { FaTemperatureQuarter } from "react-icons/fa6";
import { MdOutlineNightsStay, MdOutlineWbSunny } from "react-icons/md";
import { UserContext } from "utils/UserContext";
import useFindOneSensor from "hooks/useFindOneSensor";
import { IoMdRainy } from "react-icons/io";

const Banner = () => {
    const { user } = useContext(UserContext);
    const { sensor, getSensor } = useFindOneSensor("6814f35d1a364b7ea79aad89");

    const isNight = () => {
        const currentHour = new Date().getHours();
        return currentHour >= 17 || currentHour < 5; // Kiểm tra thời gian buổi tối
    };

    useEffect(() => {
        const interval = setInterval(() => {
            getSensor("6814f35d1a364b7ea79aad89");
        }, 2000);
        return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
    }, []);

    return (
        <div className="flex p-[25px] rounded-[28px] justify-between bg-[#FFECC8]">
            <div>
                <h1 className="font-bold text-[30px] ">Hello, {user.name}</h1>
                <p>
                    Welcome Home! The air quality is good & fresh you can go out
                    today
                </p>
                <div className="mt-[20px] flex items-center">
                    <FaTemperatureQuarter className="text-[30px]" />
                    <div className="flex items-center gap-[10px]">
                        <p className="text-[30px]">{sensor.temperature}°C</p>
                        <p className="text-[20px]">Outdoor temperature</p>
                    </div>
                </div>
                <div className="mt-[20px] flex items-center gap-[10px]">
                    {isNight() ? (
                        <MdOutlineNightsStay className="text-[30px]" />
                    ) : (
                        <MdOutlineWbSunny className="text-[30px]" />
                    )}
                    <div className="flex items-center gap-[10px]">
                        <p className="text-[20px]">
                            {isNight()
                                ? "Night Sky and stars"
                                : "Sunny Weather and blue sky"}
                        </p>
                    </div>
                </div>
                {sensor.humidity >= 85 && (
                    <div className="mt-[20px] flex items-center gap-[10px]">
                        <IoMdRainy className="text-[30px]" />
                        <div className="flex items-center gap-[10px]">
                            <p className="text-[20px]">Rainy Weather</p>
                        </div>
                    </div>
                )}
            </div>
            <img
                height={200}
                width={200}
                src={
                    sensor.humidity >= 85
                        ? rainImg
                        : isNight()
                        ? nightImg
                        : sunnyImg
                }
            />
        </div>
    );
};

export default Banner;
