import { createApp, h } from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import { loadPlugins, registerBaseComponents } from "@/helpers";
import { apiSetup as apolloSetup } from "@/api/api";
import "./assets/css/tailwind.css";

export const app = createApp({
  setup() {
    apolloSetup();
  },

  render: () => h(App),
});

// Automatically import Plugins -> need same title as plugin file name | need export default function
loadPlugins(["setGlobalValidator"]);

// Automatically register Base Component across all the app
registerBaseComponents(app);

app.use(store).use(router).mount("#app");
