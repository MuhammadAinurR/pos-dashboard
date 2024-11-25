import { defineStore } from 'pinia';
import router from '@/router';
import AuthService from '../services/auth.service';

interface User {
  name: string;
  email: string;
  username: string;
}

interface AuthState {
  token: string | null;
  user: User | null | undefined;
  loading: boolean;
  error: string | null;
}

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

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state: AuthState): boolean => !!state.token,
  },

  actions: {
    async login(credentials: LoginCredentials): Promise<void> {
      this.loading = true;
      this.error = null;
      try {
        const response: LoginResponse = await AuthService.login(credentials);
        this.token = response.payload.data.access_token;
        this.user = response.payload.data;

        localStorage.setItem('token', this.token);
        localStorage.setItem('user', JSON.stringify(this.user));

        router.push({ name: 'dashboard' });
      } catch (error: any) {
        this.error = error.message || 'Login failed';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    logout(): void {
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      this.token = null;
      this.user = null;
      router.push({ name: 'login' });
    },
  },
});
