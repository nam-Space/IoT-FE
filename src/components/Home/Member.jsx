import { Avatar } from "antd";
import useGetUsers from "hooks/useGetUsers";
import React, { useContext } from "react";
import { UserContext } from "utils/UserContext";

const Member = () => {
    const { users } = useGetUsers();
    const { user } = useContext(UserContext);

    return (
        <div className="bg-[#EDEDF5] rounded-[28px] p-[30px]">
            <h1 className="text-[22px] font-bold">Members</h1>
            <div className="mt-[15px] bg-white rounded-[28px] grid grid-cols-5 overflow-hidden">
                {users.length > 0 &&
                    users.map((u, index) => (
                        <div
                            key={index}
                            className={`${
                                user._id === u._id ? "bg-yellow-200" : ""
                            } p-[10px] flex flex-col items-center justify-between`}
                        >
                            <div>
                                <Avatar
                                    style={{ verticalAlign: "middle" }}
                                    size="large"
                                >
                                    {u.name.substr(0, 1)}
                                </Avatar>
                                <p className="font-semibold">{u.name}</p>
                            </div>
                            <p className="text-[#9897AD] text-[11px]">
                                {u.role}
                            </p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Member;
