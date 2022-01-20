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

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
      return savedPosition || { top: 0 };
    },
});

// router.beforeEach((to, from, next) => {
//     // If there are no permissions to check then proceed


//     if (!to.meta.permission) return next()
  
//     const { roles = [], config = {} } = to.meta.permission
  
//     // if (!roles.length) return next()
  
//     // const hasAccess = checkPermission(roles, config)
//     // console.log('has access???', hasAccess)
//     // if (hasAccess) {
//     //   return next()
//     // }
//     // // No access!
//     // next(to.meta.permission?.noAccessRedirect || '/forbidden')
//   })


export default router;
