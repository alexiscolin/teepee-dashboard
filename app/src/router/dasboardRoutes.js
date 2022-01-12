export default {
  children: [
    {
      path: "",
      name: "Dashboard",
      component: () => import("@/views/dashboard/ViewDashboard.vue"),
    },
    {
      path: "edit",
      name: "Edit",
      component: () => import("@/views/dashboard/EditDashboard.vue"),
    },
  ],
  meta: {
    layout: "settings",
  },
};
