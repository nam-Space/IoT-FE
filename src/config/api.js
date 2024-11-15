import axios from "axios";

const baseUrl = process.env.REACT_APP_BE_URL


// user
export const callLogin = ({ cardId, username, password }) => {
    return axios.post(`${baseUrl}/api/users/login`, {
        cardId,
        username,
        password,
    });
};

export const callLogout = () => {
    return axios.post(`${baseUrl}/api/users/logout`);
};

export const callGetUsers = (config) => {
    return axios.get(`${baseUrl}/api/users`, config)
}

export const callUpdateUser = (data, config) => {
    return axios.post(`${baseUrl}/api/users/update`, { ...data }, config)
}

export const callCreateUser = (data, config) => {
    return axios.post(`${baseUrl}/api/users/create`, { ...data }, config)
}

export const callDeleteUser = (_id, config) => {
    return axios.delete(`${baseUrl}/api/users/delete/${_id}`, config)
}

// device
export const callGetDevices = (query, config) => {
    return axios.get(`${baseUrl}/api/devices${query ? `?${query}` : ''}`, config)
}

export const callCreateDevice = (data, config) => {
    return axios.post(`${baseUrl}/api/devices/create`, { ...data }, config)
}

export const callUpdateDevice = (data, config) => {
    return axios.post(`${baseUrl}/api/devices/update`, { ...data }, config)
}

export const callDeleteDevice = (_id, config) => {
    return axios.delete(`${baseUrl}/api/devices/delete/${_id}`, config)
}

// access log
export const callGetAccessLogs = (query, config) => {
    return axios.get(`${baseUrl}/api/accessLogs${query ? `?${query}` : ''}`, config)
}

// sensor
export const callGetSensor = (query, config) => {
    return axios.get(`${baseUrl}/api/sensors${query ? `?${query}` : ''}`, config)
}

export const callGetSensorById = (id, config) => {
    return axios.get(`${baseUrl}/api/sensors/${id}`, config)
}

export const callCreateSensor = (data, config) => {
    return axios.post(`${baseUrl}/api/sensors/create`, { ...data }, config)
}

export const callUpdateSensor = (data, config) => {
    return axios.post(`${baseUrl}/api/sensors/update`, { ...data }, config)
}

export const callDeleteSensor = (_id, config) => {
    return axios.delete(`${baseUrl}/api/sensors/delete/${_id}`, config)
}

// sensor log
export const callGetSensorLog = (query, config) => {
    return axios.get(`${baseUrl}/api/sensorLogs${query ? `?${query}` : ''}`, config)
}

// room
export const callGetRooms = (config) => {
    return axios.get(`${baseUrl}/api/rooms`, config)
}

export const callGetRoomById = (_id, config) => {
    return axios.get(`${baseUrl}/api/rooms/${_id}`, config)
}

export const callCreateRoom = (data, config) => {
    return axios.post(`${baseUrl}/api/rooms/create`, { ...data }, config)
}

export const callUpdateRoom = (data, config) => {
    return axios.post(`${baseUrl}/api/rooms/update`, { ...data }, config)
}

export const callDeleteRoom = (_id, config) => {
    return axios.delete(`${baseUrl}/api/rooms/delete/${_id}`, config)
}

// cardReaders
export const callGetCardReader = (config) => {
    return axios.get(`${baseUrl}/api/cardReaders`, config)
}

export const callCreateCardReader = (data, config) => {
    return axios.post(`${baseUrl}/api/cardReaders/create`, { ...data }, config)
}

export const callUpdateCardReader = (data, config) => {
    return axios.post(`${baseUrl}/api/cardReaders/update`, { ...data }, config)
}

export const callDeleteCardReader = (_id, config) => {
    return axios.delete(`${baseUrl}/api/cardReaders/delete/${_id}`, config)
}

// cardReaderLogs
export const callGetCardReaderLogs = (query, config) => {
    return axios.get(`${baseUrl}/api/cardReaderLogs${query ? `?${query}` : ''}`, config)
}