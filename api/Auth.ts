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

export const login = async (mobile: string, password: string): Promise<ApiResponse> => {
    try {
        const response = await axios.post<ApiResponse>(`${API_URL}/auth/login.php`,{ mobile, password });
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

export const verifyToken = async (token : string): Promise<ApiResponse> => {
    try {
        const response = await axios.post<ApiResponse>(`${API_URL}/auth/verify_token.php`,{ token });
        return response.data;
    } catch (error: unknown) {
        console.log("error obj",error);
        
        if (error instanceof AxiosError && error.response?.data?.error?.message) {
            console.log('me is axios error');
            
            throw new Error(error.response.data.error.message);
        }
        if (error instanceof Error) {
            console.log('me is normal error');
            throw new Error(error.message);
        }
        throw new Error('An unknown error occurred');
    }
};