import { defineStore } from 'pinia';
import router from '@/router';
import AuthService from '../services/auth.service';

interface User {
  id?: number;
  username?: string;
  // Add other user properties as needed
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

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: AuthService.getToken(),
    user: null,
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
        const response = await AuthService.login(credentials);
        this.token = response.access_token;
        this.user = response.user;
        router.push({ name: 'dashboard' });
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Login failed';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    logout(): void {
      AuthService.logout();
      this.token = null;
      this.user = null;
      router.push({ name: 'login' });
    },
  },
});
