import service from "./state/index.js";

import App from "./app.svelte";

// Don't use rollup aliases when importing scss files.
// import "./shared/styles/main.scss";

const app = new App({
    target : document.body,
});

export default app;
