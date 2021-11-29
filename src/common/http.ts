import {Http, Response} from './http.model';
import {AxiosRequestConfig, AxiosResponse} from 'axios';

enum HttpMethod {
    get = 'get',
    post = 'post',
    put = 'put',
    patch = 'patch',
    delete = 'delete',
}

class Service {
    httpOption: Record<string, unknown>;
    httpInstance: Http | null;
    callbackQueue: ((...args: any[]) => void)[];

    constructor(option = {}) {
        this.httpOption = option;
        this.httpInstance = null;
        this.callbackQueue = [];
    }

    get http() {
        if (!this.httpInstance) {
            this.createInstance();
        }
        return this.httpInstance;
    }

    on(callback: (...args: any[]) => void) {
        this.callbackQueue.push(callback);
    }

    createInstance() {
        const settingRequestHandle = this.httpOption.requestHandle;
        const settingResponseHandle = this.httpOption.responseHandle;
        this.httpOption.requestHandle = (config: AxiosRequestConfig) => {
            config.headers['X-Requested-With'] = 'XMLHttpRequest';
            config.headers.Accept = 'application/json; text/html';
            config.headers['Content-Type'] = 'application/json; charset=UTF-8';

            if (settingRequestHandle instanceof Function) {
                config = settingRequestHandle(config);
            }
            return config;
        };

        this.httpOption.responseHandle = (response: AxiosResponse, error: Error) => {
            if (!response && error) {
                if (error.message.startsWith('timeout')) {
                    console.log(11);
                } else if (error.message.startsWith('Network')) {
                    console.log(11);
                } else {
                    console.log(11);
                }
                return {};
            }

            switch (response.status) {
                case 200:
                case 201:
                    break;
                case 401:
                    break;
                case 403:
                    break;
                case 404:
                    break;
                case 500:
                    break;
                default:
            }

            if (settingResponseHandle instanceof Function) {
                response = settingResponseHandle(response);
            }
            return response;
        };
        this.httpInstance = new Http(this.httpOption);
    }

    createRequestPromise<T>(method: HttpMethod, url: string, ...args: any[]): Promise<Response<T>> {
        return new Promise(resolve => {
            this.on(() => {
                resolve(this.http![method](url, ...args));
            });
        });
    }

    async request<T>(method: HttpMethod, url: string, ...args: any[]): Promise<Response<T>> {
        return this.createRequestPromise(method, url, ...args);
    }

    get<T>(url: string, ...args: any[]) {
        return this.request<T>(HttpMethod.get, url, ...args);
    }

    post<T>(url: string, ...args: any[]) {
        return this.request<T>(HttpMethod.post, url, ...args);
    }

    put<T>(url: string, ...args: any[]) {
        return this.request<T>(HttpMethod.put, url, ...args);
    }

    patch<T>(url: string, ...args: any[]) {
        return this.request<T>(HttpMethod.patch, url, ...args);
    }

    delete<T>(url: string, ...args: any[]) {
        return this.request<T>(HttpMethod.delete, url, ...args);
    }

    source() {
        return this.http?.source();
    }
}

export default new Service({
    baseURL: '',
    authURL: '',
    timeout: 60000,
});
