import { createRouter, createWebHistory } from 'vue-router';
    import Home from '../views/Home.vue';
    import Dashboard from '../views/Dashboard.vue';
    import SignUp from '../views/SignUp.vue';
    import Login from '../views/Login.vue';
    import { supabase } from '../supabase';

    const routes = [
      { path: '/', name: 'Home', component: Home },
      { 
        path: '/dashboard', 
        name: 'Dashboard', 
        component: Dashboard,
        meta: { requiresAuth: true }
      },
      { path: '/signup', name: 'SignUp', component: SignUp },
      { path: '/login', name: 'Login', component: Login }
    ];

    const router = createRouter({
      history: createWebHistory(),
      routes
    });

    // Navigation guard to protect routes
    router.beforeEach(async (to, from, next) => {
      const environment = import.meta.env.VITE_ENVIRONMENT;
      if (environment === 'development') {
        next(); // Allow access in development
      } else {
        const { data: { user } } = await supabase.auth.getUser();
        if (to.matched.some(record => record.meta.requiresAuth)) {
          if (!user) {
            next({ name: 'Login' });
          } else {
            next();
          }
        } else {
          next();
        }
      }
    });

    export default router;
