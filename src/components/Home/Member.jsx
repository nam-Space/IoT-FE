import { Avatar } from "antd";
import useGetUsers from "hooks/useGetUsers";
import React from "react";

const Member = () => {
    const { users } = useGetUsers();

    return (
        <div className="bg-[#EDEDF5] rounded-[28px] p-[30px]">
            <h1 className="text-[22px] font-bold">Members</h1>
            <div className="mt-[15px] bg-white rounded-[28px] grid grid-cols-5">
                {users.length > 0 &&
                    users.map((user, index) => (
                        <div
                            key={index}
                            className="p-[10px] flex flex-col items-center justify-between"
                        >
                            <div>
                                <Avatar
                                    style={{ verticalAlign: "middle" }}
                                    size="large"
                                >
                                    {user.name.substr(0, 1)}
                                </Avatar>
                                <p className="font-semibold">{user.name}</p>
                            </div>
                            <p className="text-[#9897AD] text-[11px]">
                                {user.role}
                            </p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Member;
