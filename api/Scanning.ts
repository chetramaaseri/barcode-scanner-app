import axios, { AxiosError } from 'axios';
const API_URL = process.env.EXPO_PUBLIC_API_URL; 

interface ApiResponse {
    status: string;
    error?: {
        code: number;
        message: string;
    };
    data?: any;
}

export const updateScannedCode = async (user_id: number, barcode : number | string): Promise<ApiResponse> => {
    try {
        const response = await axios.post<ApiResponse>(`${API_URL}/scanning/update_scanned_barcode.php`,{ user_id, barcode });
        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError && error.response?.data?.error?.message) {
            throw new Error(error.response.data.error.message);
        }
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error('An unknown error occurred');
    }
};

type DateRange = [string, string];

export const getTodayDateRange = (): [string, string] => {
    const now = new Date();
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = now;
    const startDate = startOfDay.toISOString();
    const endDate = endOfDay.toISOString();
    return [startDate, endDate];
};

export const getTotalScannedRange = async (user_id: number, date_range : DateRange): Promise<ApiResponse> => {
    try {
        const response = await axios.post<ApiResponse>(`${API_URL}/scanning/get_total_scanned_items.php`,{ user_id, date_range });
        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError && error.response?.data?.error?.message) {
            throw new Error(error.response.data.error.message);
        }
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error('An unknown error occurred');
    }
};