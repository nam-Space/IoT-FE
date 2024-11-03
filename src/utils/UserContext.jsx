import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user-iot")) || {}
    );

    useEffect(() => {
        const socket = io(process.env.REACT_APP_BE_URL, {
            query: {
                userId: user?._id,
            },
        });

        setSocket(socket);

        socket.on("getOnlineUsers", (users) => {
            console.log("getOnlineUsers", users);
        });

        return () => socket && socket.close();
    }, [user?._id]);

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                socket,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
