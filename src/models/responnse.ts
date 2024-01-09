export interface ApiResponseType<T> {
    status: boolean;
    data: T;
    message: string;
    apiurl: string;
}

export type ApiResponseTypeExtended<T> = | {
    status: true;
    data: T;
    apiurl: string;
} | {
    status: false;
    apiurl: string;
    message: string;
};

// 13 july ankit
// 5 jan aman