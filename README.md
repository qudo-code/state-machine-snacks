# State UI [WIP]
A framework built on [XState](https://xstate.js.org/docs/about/concepts.html) that provides useful state machine plugins and patterns geared toward UI development.

### What Is XState?
XState is a library that allows us to create and interpret state machines in JavaScript. It is recommended you understand the basics of XState before using State Machine UI. 

## Getting Started
State UI requires only a config as an option.
#### Options
| Options     | Description  |              |
| ----------- | -----------  | -----------  | 
| config  | XState state machine config. | Required
| createMachine | By default, the machine is created with `createMachine(config)`. You can overwrite this behavior with a function that will be passed the config and must return a XState machine instance. | Optional
| interpret | By default, the service is interpreted via `interpret(machine)`. You can overwrite this behavior with a function that will be passed both the config and machine instance from the `createMachine()` step. | Optional
| plugins | An array of plugins you want to add to the service. | Optional

```javascript
import stateUI from "state-ui";
import components from "state-ui/plugins/components";
import logger from "state-ui/plugins/logger";

const config = { /* ...machine config */ };

// Create our state machine with stateUI
const service = stateUI({
    // Required
    config,

    // Examples:
    // createMachine : (config) => createMachine(config, { ...actions, ...services }),

    // interpret : (config, machine) => interpret(machine).onTransition((state) => {
    //     console.log(state.value);
    // });

    // plugins : [
    //    components(),
    //    logger(),
    // ]
});

service.start();
```

## Plugins
Plugins add additional functionality to an XState config and service. Plugins also usually export helper functions to assist when composing the state machine. All plugins exist under `state-ui/plugins/[plugin name]`.
```javascript
import stateUI from "state-ui";
import components from "state-ui/plugins/components";
import logger from "state-ui/plugins/logger";

const config = { /* ...machine config */ };

// Create our state machine with stateUI
const service = stateUI({
    // Required
    config,

    // Example:
    plugins : [
       components(),
       logger(),
    ]
});

service.start();
```

#### Available Plugins
| Name        | Description                                                  |                       |
| ----------- | -----------                                                  | -----------           |
| components  | Conditionally render components as you enter/exit states.    | [Link](/docs/plugins/components.md)   |
| router      | Bind browser URLs to specified states.                       | [Link](/docs/plugins/router.md)       |
| logger      | Provide useful logging when developing with XState.          | [Link](/docs/plugins/logger.md)       |



### Contribute
[🛠 Plugin Development](/docs/plugin-development.md)


