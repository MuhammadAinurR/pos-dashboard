import { defineStore } from 'pinia';
import axiosInstance from '../services/axios.config';

export const useMenuStore = defineStore('menu', {
  state: () => ({
    items: [],
    loading: false,
    error: null as unknown | null,
  }),

  actions: {
    async fetchMenuItems() {
      this.loading = true;
      try {
        const response = await axiosInstance.get('/api/web/management/menus');
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
