import { createRouter, createWebHashHistory } from "vue-router";
import store from "@/store";
import authToken from "@/middleware/index.js";
import SignUpView from "../views/auth/SignUpView.vue";

const routes = [
  // Auth
  {
    path: "/auth/registration",
    name: "signup",
    component: SignUpView,
  },
  {
    path: "/auth/login",
    name: "signin",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "signin" */ "../views/auth/SignInView.vue"),
  },
  {
    path: "/auth/forgotpassword",
    name: "forgotpassword",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "forgotpassword" */ "../views/auth/ForgotPasswordView.vue"
      ),
  },
  {
    path: "/auth/confirmation/:token",
    name: "accountconfirmation",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "accountconfirmation" */ "../views/auth/AccountConfirmationView.vue"
      ),
  },
  {
    path: "/initialize/recovery/:token",
    name: "resetpassword",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "resetpassword" */ "../views/auth/ResetPasswordView.vue"
      ),
  },

  // Abmin
  {
    path: "/properties",
    name: "properties",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "properties" */ "../views/admin/PropertiesView.vue"
      ),
    meta: { protectedPath: true },
  },

  // public
  {
    path: "/",
    name: "dashboard",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/public/DashboardView.vue"),
  },
  {
    path: "/property/:id",
    name: "property",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "property" */ "../views/public/PropertyView.vue"),
  },

  // pagina 404
  {
    path: "/:notfound(.*)*",
    name: "notfound",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "notfound" */ "../views/NotFoundView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach(async (to, from, next) => {
  const routeProtection = to.matched.some((item) => item.meta.protectedPath);
  const middleware = await authToken(store.state.token);
  if (routeProtection && middleware && store.state.token === null) {
    next("/auth/login");
  } else {
    next();
  }
});

export default router;
