# State Machine Snacks 🍕
A framework built on [XState](https://xstate.js.org/docs/about/concepts.html) that provides bite sized snacks for developing with state machine machines. This project aims to increase state machine adoption in modern day web apps by providing a suite of tools and plugins to inspire development and new ways of thinking.

### What Is XState?
XState is a library that allows us to create and interpret state machines in JavaScript. It is recommended you understand the basics of XState before using State Machine UI. 

## Getting Started
For basic usage, State Machine Snacks requires only a XState state machine config as an option. SMS will utilize this config to create a machine and return an XState service.

| Options     | Description  |              |
| ----------- | -----------  | -----------  | 
| config  | XState state machine config. | Required
| createMachine | By default, the machine is created with `createMachine(config)`. You can overwrite this behavior with a function that will be passed the config and must return a XState machine instance. | Optional
| interpret | By default, the service is interpreted via `interpret(machine)`. You can overwrite this behavior with a function that will be passed both the config and machine instance from the `createMachine()` step. | Optional
| plugins | An array of plugins you want to add to the service. | Optional

##### Use w/Default Settings
```javascript
import stateUI from "state-ui";
import components from "state-ui/plugins/components";
import logger from "state-ui/plugins/logger";

const config = { /* ...machine config */ };

// Create our state machine with stateUI
const service = stateUI({
    config,
});

service.start();
```

#### Use w/Advanced Initialization
```javascript
import stateUI from "state-ui";
import components from "state-ui/plugins/components";
import logger from "state-ui/plugins/logger";

const config = { /* ...machine config */ };

// Create our state machine with stateUI
const service = stateUI({
    config,

    createMachine : (config) => createMachine(config, { ...actions, ...services }),

    interpret : (config, machine) => interpret(machine).onTransition((state) => {
         console.log(state.value);
    });
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


