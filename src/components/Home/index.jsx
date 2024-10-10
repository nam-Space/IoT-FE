import React from "react";
import Banner from "./Banner";
import DeviceController from "./DeviceController";
import Member from "./Member";
import PowerConsumer from "./PowerConsumer";

const Home = () => {
    return (
        <div className="grid grid-cols-5 gap-[40px]">
            <div className="col-start-1 col-end-4">
                <Banner />
                <DeviceController />
            </div>
            <div className="col-start-4 col-end-6">
                <Member />
                <PowerConsumer />
            </div>
        </div>
    );
};

export default Home;
