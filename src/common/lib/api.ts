import axios, {AxiosRequestConfig} from "axios";

type IRequest<D> = {
    endpoint: string;
    method: AxiosRequestConfig["method"];
    data?: D;
    responseType: "json" | "blob" | "text" | "arraybuffer" | "document" | "stream"
};
// @ts-ignore
export const baseUrl = import.meta.env.VITE_BASE_URL
export function apiRequest<T, D>({
                                     data,
                                     method,
                                     endpoint,
                                     responseType
                                 }: IRequest<D>): Promise<T> {
    const token = localStorage.getItem("user")
    const config: AxiosRequestConfig = {
        method,
        url: `${baseUrl}${endpoint}`,
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
        },
        responseType,
        data
    };

    if (token) {
        config.headers!.Authorization = `Bearer ${token}`;
    }

    if (data) {
        config.data = JSON.stringify(data);
    }

    // eslint-disable-next-line no-async-promise-executor
    return new Promise<T>(async (resolve, reject) => {
        try {
            const response = await axios(config);
            resolve(response.data);
        } catch (error) {
            reject(error);
        }
    });
}


export function getList<T>(endpoint: string, params: any,responseType: 'json' | 'blob' = 'json') {
    const urlSearchParams = new URLSearchParams();
    if (params) {
        Object.entries(params).map((item) => {
            if (item[1] !== undefined) urlSearchParams.append(item[0], item[1] as string);
        });
    }

    return apiRequest<T, "">({
        // token: user?.token,
        method: "GET",
        endpoint: `${endpoint}?${urlSearchParams.toString()}`,
        responseType
    });
}

export function getDetail<T>(endpoint: string) {
    return apiRequest<T, "">({
        method: "GET",
        endpoint: `${endpoint}`,
        responseType: 'json'
    });
}

export function create<T,D>(endpoint: string, data: D,responseType: 'json' | 'blob' = 'json') {
    return apiRequest<T, D>({
        method: "POST",
        endpoint: `${endpoint}`,
        responseType,
        data
    });
}

export function update<T,D>(endpoint: string, data: D) {
    return apiRequest<T, D>({
        method: "PUT",
        endpoint: `${endpoint}`,
        responseType: 'json',
        data
    });
}

export function destroy(id:string,endpoint: string) {
    return apiRequest({
        method: "DELETE",
        endpoint: `${endpoint}/${id}`,
        responseType: 'json',
    });
}
