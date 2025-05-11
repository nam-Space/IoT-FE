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
  const { sensor, getSensor } = useFindOneSensor("67de6439f2a7b5e777bc9937");

  const isNight = () => {
    const currentHour = new Date().getHours();
    return currentHour >= 17 || currentHour < 5; // Kiểm tra thời gian buổi tối
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getSensor("67de6439f2a7b5e777bc9937");
    }, 2000);
    return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
  }, []);

  return (
    <div className="flex p-[25px] rounded-[28px] justify-between bg-[#FFECC8]">
      <div>
        <h1 className="font-bold text-[30px]">Hello, {user.name}</h1>
        <p>Welcome Home! Let's check the air quality around you.</p>

        <div className="mt-[20px] flex items-center gap-[15px]">
          <FaTemperatureQuarter className="text-[30px]" />
          <div>
            <p className="text-[20px] font-semibold">CO₂ Level</p>
            <p className="text-[30px]">{sensor.CO2} ppm</p>
          </div>
        </div>

        <div className="mt-[20px] flex items-center gap-[10px]">
          {isNight() ? (
            <MdOutlineNightsStay className="text-[30px]" />
          ) : (
            <MdOutlineWbSunny className="text-[30px]" />
          )}
          <p className="text-[20px]">
            {isNight() ? "Night Sky and stars" : "Sunny Weather and blue sky"}
          </p>
        </div>

        {sensor.humidity >= 85 && (
          <div className="mt-[20px] flex items-center gap-[10px]">
            <IoMdRainy className="text-[30px]" />
            <p className="text-[20px]">Rainy Weather</p>
          </div>
        )}
      </div>

      <img
        height={200}
        width={200}
        src={sensor.humidity >= 85 ? rainImg : isNight() ? nightImg : sunnyImg}
        alt="Weather Illustration"
      />
    </div>
  );
};

export default Banner;
