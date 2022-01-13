import { createRouter, createWebHistory } from "vue-router";
import dasboardRoutes from "./dasboardRoutes";
//import layoutLib from "@/components/layout/layoutLib.vue";

// Children routing via nested Route technique allow more complexe structure 
// & scalability in folder : `views`, among first routing components.
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
        component: () => import("@/views/connexion/ConnexionLogin.vue"),
      },
      {
        path: "signin",
        name: "Signin",
        component: () => import("@/views/connexion/ConnexionSignin.vue"),
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


export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});
