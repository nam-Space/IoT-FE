import React, { useContext } from "react";
import sunnyImg from "../../images/sunny.jfif";
import { FaTemperatureQuarter } from "react-icons/fa6";
import { MdOutlineWbSunny } from "react-icons/md";
import { UserContext } from "utils/UserContext";

const Banner = () => {
    const { user } = useContext(UserContext);

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
                        <p className="text-[30px]">30°C</p>
                        <p className="text-[20px]">Outdoor temperature</p>
                    </div>
                </div>
                <div className="mt-[20px] flex items-center gap-[10px]">
                    <MdOutlineWbSunny className="text-[30px]" />
                    <div className="flex items-center gap-[10px]">
                        <p className="text-[20px]">
                            Sunny Weather and blue sky
                        </p>
                    </div>
                </div>
            </div>
            <img height={200} width={200} src={sunnyImg} />
        </div>
    );
};

export default Banner;
