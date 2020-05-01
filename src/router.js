import Vue from 'vue';
import Router from 'vue-router';
import loader from 'nprogress';

import Timer from '@/pages/Timers.vue';
import SignIn from '@/pages/SignIn.vue';
import SignUp from '@/pages/SignUp.vue';
import NotFound from '@/pages/NotFound.vue';
import Home from '@/pages/Home.vue';
import EmailVerification from '@/pages/EmailVerification.vue';
import { getUser } from '@/services/user.service';

Vue.use(Router);

export const ROUTES = {
  home: {
    path: '/',
    name: 'home',
  },
  signIn: {
    path: '/sign-in',
    name: 'sign-in',
  },
  signUp: {
    path: '/sign-up',
    name: 'sign-up',
  },
  emailVerification: {
    path: '/email-verification',
    name: 'email-verification',
  },
  timer: {
    path: '/timer',
    name: 'timer',
  },
  404: {
    path: '/404',
    name: '404',
  },
};

const router = new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: [
    {
      path: ROUTES.home.path,
      name: ROUTES.home.name,
      component: Home,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: ROUTES.signIn.path,
      name: ROUTES.signIn.name,
      component: SignIn,
    },
    {
      path: ROUTES.signUp.path,
      name: ROUTES.signUp.name,
      component: SignUp,
    },
    {
      path: ROUTES.emailVerification.path,
      name: ROUTES.emailVerification.name,
      component: EmailVerification,
      props: true,
    },
    {
      path: ROUTES.timer.path,
      name: ROUTES.timer.name,
      component: Timer,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: ROUTES[404].path,
      name: ROUTES[404].name,
      component: NotFound,
      props: true,
    },
    {
      path: '*',
      redirect: { name: ROUTES[404].name, params: { resource: 'page' } },
    },
  ],
});

router.beforeEach((to, _from, next) => {
  loader.start();

  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
  const currentUser = getUser();

  if (requiresAuth && !currentUser) {
    next(ROUTES.signIn.name);
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

router.afterEach(() => {
  loader.done();
});

export default router;
