import React from "react";
import Banner from "./Banner";
import DeviceController from "./DeviceController";
import Member from "./Member";
import PowerConsumer from "./PowerConsumer";

const Home = () => {
  return (
    <div className="w-full">
      <Banner />
      <DeviceController />
    </div>
  );
};

export default Home;
