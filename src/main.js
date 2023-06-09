import { createApp } from "vue";
import uiComponents from "./components/ui-components";
import "./style.css";

import App from "./components/app/App.vue";

const app = createApp(App);

uiComponents.map((component) => app.component(component.name, component));

app.mount("#app");
