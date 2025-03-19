import { createRouter, createWebHistory } from 'vue-router';
import LogIn from '../pages/admin/LogIn.vue';
import Dashboard from '../pages/admin/Dashboard.vue';
import Map from '../pages/admin/Map.vue';
import Teams from '../pages/admin/Teams.vue';
import Settings from '../pages/admin/Settings.vue';
import Users from '../pages/admin/Users.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LogIn,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }, // Protect this route with authentication
  },
  {
    path: '/map',
    name: 'Map',
    component: Map,
    meta: { requiresAuth: true }, // Protect this route with authentication
  },
  {
    path: '/teams',
    name: 'Teams',
    component: Teams,
    meta: { requiresAuth: true }, // Protect this route with authentication
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: { requiresAuth: true }, // Protect this route with authentication
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: { requiresAuth: true }, // Protect this route with authentication
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global navigation guard to ensure user is authenticated before accessing the dashboard
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('user'); // Check for user in localStorage (or use Vuex for state management)
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/'); // Redirect to Login page if not authenticated
  } else {
    next(); // Allow navigation to the next route
  }
});

export default router;
