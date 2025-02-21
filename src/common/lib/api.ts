import axios, { AxiosRequestConfig } from 'axios';
import { getItem } from '../../utils/khukhaDBTemp';

type IRequest<D> = {
  endpoint: string;
  method: AxiosRequestConfig['method'];
  data?: D;
  responseType:
    | 'json'
    | 'blob'
    | 'text'
    | 'arraybuffer'
    | 'document'
    | 'stream';
};

// @ts-ignore
export const baseUrl = import.meta.env.VITE_BASE_URL;

export async function apiRequest<T, D>({
  data,
  method,
  endpoint,
  responseType,
}: IRequest<D>): Promise<T> {
  try {
   
    const token = await getItem('auth_token')// Ensure token exists

    const config: AxiosRequestConfig = {
      method,
      url: `${baseUrl}${endpoint}`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      responseType,
      data,
    };

    if (token) {
      config.headers!.Authorization = `Bearer ${token}`;
    }

    if (data) {
      config.data = JSON.stringify(data);
    }

    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export function getList<T>(
  endpoint: string,
  params: any,
  responseType: 'json' | 'blob' = 'json'
) {
  const urlSearchParams = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        urlSearchParams.append(key, value as string);
      }
    });
  }

  return apiRequest<T, ''>({
    method: 'GET',
    endpoint: `${endpoint}?${urlSearchParams.toString()}`,
    responseType,
  });
}

export function getDetail<T>(endpoint: string) {
  return apiRequest<T, ''>({
    method: 'GET',
    endpoint,
    responseType: 'json',
  });
}

export function create<T, D>(
  endpoint: string,
  data: D,
  responseType: 'json' | 'blob' = 'json'
) {
  return apiRequest<T, D>({
    method: 'POST',
    endpoint,
    responseType,
    data,
  });
}

export function update<T, D>(endpoint: string, data: D) {
  return apiRequest<T, D>({
    method: 'PUT',
    endpoint,
    responseType: 'json',
    data,
  });
}

export function destroy(id: string, endpoint: string) {
  return apiRequest({
    method: 'DELETE',
    endpoint: `${endpoint}/${id}`,
    responseType: 'json',
  });
}
