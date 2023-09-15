import axios from "axios";
import {errorCatch, getContentType} from "@/app/api/api.helper";
import {getAccessToken, removeFromStorage} from "@/app/service/auth/auth.helper";
import {AuthService} from "@/app/service/auth/auth.service";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    headers: getContentType()
})

instance.interceptors.request.use(async config => {
    const accessToken = getAccessToken();

    if(config && config.headers && accessToken)
        config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
})

// instance.interceptors.response.use( config => config,
//     async error => {
//         const originalRequest = error.config;
//
//         if(error.response.status === 401
//             || errorCatch(error) === 'jwt expired'
//             || errorCatch(error) === 'jwt must be provided'
//             && error.config && !error.config._isRetry
//         ){
//             originalRequest._isRetry = true;
//             try {
//                 await AuthService.getNewTokens()
//                 return instance.request(originalRequest)
//             } catch (e) {
//                 if(errorCatch(e) === 'jwt expired')
//                     removeFromStorage()
//             }
//         }
// })

export default instance;