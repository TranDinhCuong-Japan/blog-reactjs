import axios from "axios";

export default function requestApi(endpoint, method, body, responseType = 'json') {
    const header = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }

    const instance = axios.create({ header });

    instance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        async(error) => {
            const originalConfig = error.config;
            console.log("Token expired")
            if (error.response && error.response.status === 419) {
                try {
                    console.log("Call refesh token api");
                    const result = await instance.post(`${process.env.REACT_APP_API_URL}/auth/refreshtoken`, {
                        refresh_token: localStorage.getItem('refreshToken')
                    })
                    const { accessToken, refreshToken } = result.data;
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);
                    originalConfig.headers['Authorization'] = `Bearer ${accessToken}`;
                    return instance(originalConfig);
                } catch (err) {
                    if (err.response && err.response.status === 400) {
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('refreshToken');
                        window.location.href('/login');
                    }
                    return Promise.reject(err);
                }

            }
            return Promise.reject(error);
        }
    );

    return instance.request({
        method: method,
        url: `${process.env.REACT_APP_API_URL}${endpoint}`,
        data: body,
        responseType: responseType
    })
}