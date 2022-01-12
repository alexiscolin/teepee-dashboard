import { createRouter, createWebHistory } from "vue-router";
import dasboardRoutes from "./dasboardRoutes";
//import layoutLib from "@/components/layout/layoutLib.vue";

const routes = [
  {
    path: "/",
    component: {
      render: () => <RouterView />,
    },
    children: [
      {
        path: "",
        name: "Login",
        component: () => import("@/views/connexion/Loggin.vue"),
      },
      {
        path: "signin",
        name: "Signin",
        component: () => import("@/views/connexion/Signin.vue"),
      },
    ],
    meta: {
      layout: "default",
    },
  },
  {
    path: "/dashboard",
    component: {
      render: () => <RouterView />,
    },
    ...dasboardRoutes, // Extracted to facilitate routes scaling
  },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
export default createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});
