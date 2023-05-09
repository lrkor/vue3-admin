import {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
export interface HttpConfig extends AxiosRequestConfig {
    requestHandle?: (config: AxiosRequestConfig) => AxiosRequestConfig;
    responseHandle?: (response: AxiosResponse, error?: unknown) => AxiosResponse;
}
export interface Param {
    routerParam?: Record<string, string | number | boolean | undefined | null>;
    queryParam?: Record<string, string | number | boolean | undefined | null>;
}
export interface Response<T> extends AxiosResponse<T> {
    state: boolean;
}
export declare class Http {
    http: AxiosInstance;

    constructor(options: Record<string, unknown>);
    parseUrl(url: string, param: Param): string;
    static parseResponse<T>(response: AxiosResponse<T>, error?: any): Response<T>;
    get<T>(url: string, param?: Param, config?: AxiosRequestConfig): Promise<Response<T>>;
    post<T>(url: string, data?: unknown, param?: Param, config?: AxiosRequestConfig): Promise<Response<T>>;
    put<T>(url: string, data?: unknown, param?: Param, config?: AxiosRequestConfig): Promise<Response<T>>;
    patch<T>(url: string, data?: unknown, param?: Param, config?: AxiosRequestConfig): Promise<Response<T>>;
    delete<T>(url: string, param?: Param, config?: AxiosRequestConfig): Promise<Response<T>>;
    source(): import('axios').CancelTokenSource;
}
