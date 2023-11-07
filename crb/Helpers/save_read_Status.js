import axios from "axios"


export const SaveCollateralStatus = async (endpoint, data) => {
    try {
        const response = await axios.post(`http://localhost:2000/api/${endpoint}/savestatus`, data)
        return response.data.message
    } catch (error) {
        return error.data.message
    }
}

export const readCollateralStatus = async (endpoint, collateralid) => {
    try {
        const response = await axios.get(`http://localhost:2000/api/${endpoint}/readstatus/${collateralid}`)
        console.log(response);
        return response
    } catch (error) {
        return error
    }
}

export const SaveStatus = async (endpoint, data) => {
    try {
        const response = await axios.post(`http://localhost:2000/api/${endpoint}/savestatus`, data)
        return response.data.message
    } catch (error) {
        return error.data.message
    }
}

export const readStatus = async (endpoint, collateralid) => {
    try {
        const response = await axios.get(`http://localhost:2000/api/${endpoint}/readstatus/${accountnumber}`)
        console.log(response);
        return response
    } catch (error) {
        return error
    }
}


