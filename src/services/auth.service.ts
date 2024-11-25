import axios, { AxiosResponse, AxiosError } from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
      const response: AxiosResponse<LoginResponse> = await axios.post(
        `${BASE_URL}/api/auth`,
        credentials
      );

      const { access_token } = response.data.payload.data;

      if (access_token) {
        localStorage.setItem('token', access_token);
        localStorage.setItem(
          'user',
          JSON.stringify(response.data.payload.data)
        );
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
