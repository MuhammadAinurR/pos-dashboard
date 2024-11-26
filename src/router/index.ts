import { createRouter, createWebHistory } from 'vue-router';
import AuthService from '@/services/auth.service';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Auth/LoginView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/dashboard',
      component: () => import('@/layouts/DashboardLayout.vue'),
      meta: { requiresAuth: true, breadcrumb: 'Dashboard' },
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue'),
          meta: {
            breadcrumb: 'Dashboard',
          },
        },
        {
          path: '/setup/product/product-categories',
          name: 'product-categories',
          component: () => import('@/views/ProductCategories.vue'),
          meta: {
            breadcrumb: 'Product Categories',
            parent: 'Setup / Product', // Optional: for custom parent paths
          },
        },
        {
          path: '/setup/product/manage-products',
          name: 'manage-products',
          component: () => import('@/views/ManageProducts.vue'),
          meta: {
            breadcrumb: 'Manage Products',
            parent: 'Setup / Product', // Optional: for custom parent paths
          },
        },
      ],
    },
  ],
});

// Navigation guard
router.beforeEach((to, _, next) => {
  const token = AuthService.getToken();

  if (to.meta.requiresAuth && !token) {
    next({ name: 'login' });
  } else if (to.name === 'login' && token) {
    next({ name: 'dashboard' });
  } else {
    next();
  }
});

export default router;
