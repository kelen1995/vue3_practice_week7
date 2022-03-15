import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'products',
        name: 'Products',
        component: () => import('../views/ProductsView.vue'),
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('../views/CartView.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/admin',
    name: 'Backend',
    component: () => import('../views/BackendView.vue'),
    children: [
      {
        path: 'products',
        name: 'BackendProducts',
        component: () => import('../views/BackendProducts.vue'),
      },
    ],
  },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
