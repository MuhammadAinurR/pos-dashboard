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
      meta: { requiresAuth: true },
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue'),
        },
        {
          path: '/setup/product/product-categories',
          name: 'product-categories',
          component: () => import('@/views/ProductCategories.vue'),
        },
        {
          path: '/setup/product/manage-products',
          name: 'manage-products',
          component: () => import('@/views/ManageProducts.vue'),
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
