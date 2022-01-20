export default {
  children: [
    {
      path: "",
      name: "Dashboard",
      component: () => import("@/views/dashboard/ViewDashboard.vue"),
      meta: {
        layout: "settings",
        permission: {
          roles: ["admin", "user"],
          noAccessRedirect: "/security/permission/forbidden",
        },
      },
    },
    {
      path: "edit",
      name: "Edit",
      component: () => import("@/views/dashboard/EditDashboard.vue"),
      meta: {
        layout: "settings",
        permission: {
          roles: ["admin"],
          noAccessRedirect: "/security/permission/forbidden",
        },
      },
    },
  ],
};
