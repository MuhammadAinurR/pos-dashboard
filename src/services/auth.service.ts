import axios, { AxiosResponse, AxiosError } from 'axios';
import axiosInstance from './axios.config';

// Interfaces for type safety
interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  rc: string;
  message: string;
  timestamp: string;
  payload: {
    data: {
      name: string;
      email: string;
      username: string;
      access_token: string;
    };
  };
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response: AxiosResponse<LoginResponse> = await axiosInstance.post(
        '/api/auth',
        credentials
      );

      if (response.data.payload.data.access_token) {
        localStorage.setItem('token', response.data.payload.data.access_token);
      }

      return response.data;
    } catch (error) {
      // Type guard to handle axios errors
      console.log(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        const errorMessage =
          (axiosError.response?.data as { message?: string })?.message ||
          'Login failed';
        throw new Error(errorMessage);
      }
      throw error;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}

export default new AuthService();
