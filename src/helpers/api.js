import axios from "axios";

export default function requestApi(endpoint, method, body, responseType = 'json' ){
    const header = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }

    const instance = axios.create({header});

    return instance.request({
        method: method,
        url: `${process.env.REACT_APP_API_URL}${endpoint}`,
        data: body,
        responseType: responseType
    })
}