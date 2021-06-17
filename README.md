# State Machine Snacks (🍕)
A framework built on [XState](https://xstate.js.org/docs/about/concepts.html) that provides bite sized snacks for developing with state machine machines. 🍕 aims to increase state machine adoption in modern day web apps by providing a suite of tools and plugins to inspire development and new ways of thinking.

### What Is XState?
XState is a library that allows us to create and interpret state machines in JavaScript. It is recommended you understand the basics of XState before using State Machine UI. 

## 🚀 Getting Started 
For basic usage, 🍕 requires only a XState state machine config as an option. SMS will utilize this config to create a machine and return an XState service.

| Options     | Description  |              |
| ----------- | -----------  | -----------  | 
| `config`  | XState state machine config. | Required
| `createMachine` | By default, the machine is created with `createMachine(config)`. You can overwrite this behavior with a function that will be passed the config and must return a XState machine instance. | Optional
| `interpret` | By default, the service is interpreted via `interpret(machine)`. You can overwrite this behavior with a function that will be passed both the config and machine instance from the `createMachine()` step. | Optional
| `plugins` | An array of plugins you want to add to the service. | Optional

##### 🍕 w/Default Settings
```javascript
import sms from "state-machine-snacks";

const config = { /* ...machine config */ };

// Create our service with 🍕.
const service = sms({
    config,
});

service.start();
```

#### 🍕 w/Advanced Initialization
```javascript
import sms from "state-machine-snacks";

const config = { /* ...machine config */ };

// Create our service with 🍕 + additional settings.
const service = sms({
    config,

    createMachine : (config) => createMachine(config, { ...actions, ...services }),

    interpret : (config, machine) => interpret(machine).onTransition((state) => {
         console.log(state.value);
    });
});

service.start();
```

## 🔌 Plugins
Plugins add additional functionality to an XState config and service. Plugins can also export helper functions to be used during plugin usage and state machine composition.
- Plugins exist under `state-machine-snacks/plugins/[plugin name]`.
- Plugins can be passed an object containing options for the plugin. 

```javascript
import sms from "state-machine-snacks";
import components from "state-machine-snacks/plugins/components";
import logger from "state-machine-snacks/plugins/logger";

const config = { /* ...machine config */ };

// Create our state machine with stateUI
const service = sms({
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

### 📦 [Plugin Components](/docs/plugins/components.md)

`state-machine-snacks/plugins/components.js`

Conditionally render components as you enter/exit states.


### 📦 [Plugin Router](/docs/plugins/components.md)

`state-machine-snacks/plugins/router.js`

Bind browser URLs to specified states.

### 📦 [Plugin Logger](/docs/plugins/logger.md)

`state-machine-snacks/plugins/logger.js`

Provide useful logging when developing with XState. 

### 📦 Plugin Ethereum *[WIP]*

`state-machine-snacks/plugins/ethereum.js`

Interact with the Ethereum blockchain.

### 📦 Plugin Solana *[WIP]*

`state-machine-snacks/plugins/solana.js`

Interact with the Solana blockchain.  

## 🛠 Contribute 
[Plugin Development](/docs/plugin-development.md)

## ✉️ Contact
[@qudolucas](https://twitter.com/qudolucas)
