// import { writable } from "svelte/store";
import { createMachine, interpret } from "xstate";

import config from "./state.config.js";

// Plugins modify the service.
import pluginLogger from "../../src/plugins/logger.js";
import pluginComponents from "../../src/plugins/components.js";

const machine = createMachine(config);
const service = interpret(machine);

// Plugins
pluginLogger(service);
pluginComponents(service);

service.start();

service.send("GO_ANOTHER");
service.send("GO_TWO");
service.send("GO_ONE");

export default service;
