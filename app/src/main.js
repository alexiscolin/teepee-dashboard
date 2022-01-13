import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import { loadPlugins, registerBaseComponents } from "@/helpers";
import "./assets/tailwind.css";

const app = createApp(App);

// Automatically import Plugins -> need same title as plugin file name | need export default function
loadPlugins(["test"]);

// Automatically register Base Component across all the app
registerBaseComponents(app);

app.use(router).mount("#app");
