import { defineStore } from 'pinia';
import axios from 'axios';
import AuthService from '../services/auth.service';

export const useMenuStore = defineStore('menu', {
  state: () => ({
    items: [],
    loading: false,
    error: null as unknown | null,
  }),

  actions: {
    async fetchMenuItems() {
      this.loading = true;
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;
      try {
        const token = AuthService.getToken();
        const response = await axios.get(
          `${BASE_URL}/api/web/management/menus`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.rc === 'SUCCESS') {
          const appChildren = response.data.payload.data[0]?.children || [];
          this.items = appChildren;
        }
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  },
});
