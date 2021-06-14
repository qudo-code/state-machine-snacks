[⬅ Back](/)
### Usage

```javascript
import stateUI, { plugins } from "state-ui";
import { createMachine, interpret } from "xstate";

// XState things
const config = { /* ...your machine config */ };
const machine = createMachine(config);
const service = interpret(machine);

// Pull off desired plugin(s)
const {
    logger,
    components,
    router
} = plugins;

// Apply desired stateUI plugins and settings.
stateUI({
    config,
    service,
    plugins : [
        router({
            "/#/home" : "main.home",
            "/#/about" : "main.about",
        }),
    ]
});

// Start service after
service.start();
```