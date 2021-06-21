# State Machine Snacks (🍕)
A framework built on [XState](https://xstate.js.org/docs/about/concepts.html) that provides bite sized snacks for developing with state machine machines. 🍕 aims to increase state machine adoption in modern day web apps by providing a suite of tools and plugins to inspire development and new ways of thinking.

🐤 [@me](https://twitter.com/qudolucas) on Twitter.

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

#### 🍕 w/Default Settings
```javascript
import sms from "state-machine-snacks";

const config = { /* ...machine config */ };

// Create your service with 🍕.
const service = sms({
    config,
});

service.start();
```

#### 🍕 w/Advanced Initialization
```javascript
import sms from "state-machine-snacks";

const config = { /* ...machine config */ };

// Create your service with 🍕 + additional settings.
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
Plugins add additional functionality to an XState config and service. 🍕 provides a plugin runner and you can add plugins to your state machine by simply adding them to the `plugins : []` option when initializing your service.

- Plugins can export helper functions to be used during plugin usage and state machine composition.
- Plugins are located in their own repositories prefixed with `sms-plugin---`. You can find a list of currently available plugins below.
- Plugins can be passed an object containing options for the plugin. 

```javascript
import sms from "state-machine-snacks";
import components from "sms-plugin---components";
import logger from "sms-plugin---logger";

const config = { /* ...machine config */ };

// Create our state machine with stateUI
const service = sms({
    // Required
    config,

    // Example plugin usage:
    plugins : [
       components(),
       logger(),
    ]
});

service.start();
```

### 📦 [Plugin Components](https://github.com/qudo-lucas/sms-plugin---components)

Conditionally render components as you enter/exit states.

<!-- ### 📦 [Plugin Router](https://github.com/qudo-lucas/sms-plugin---router)

Bind browser URLs to specified states. -->

### 📦 [Plugin Logger](https://github.com/qudo-lucas/sms-plugin---logger)

Provide useful logging when developing with XState. 

### [WIP] Plugin Router
Map browser URLs to specific states.

### [WIP] Ethereum Blockchain
Plugin for interacting with the Ethereum blockchain.

### [WIP] Solana Blockchain
Plugin for interacting with the Ethereum blockchain.

### [WIP] Video Call
Plugin for initiating peer to peer video calls via WebRTC + Firebase. 

### [WIP] WSIO P2P Chat
Plugin for initiating peer to peer text chats. Firebase? 

## 💻 Examples
### ✨ [Simple UI](https://github.com/qudo-lucas/sms-template---simple-ui)
Example of a simple UI utilizing [State Machine Snacks](https://github.com/qudo-lucas/state-machine-snacks) and [Plugin Components](https://github.com/qudo-lucas/sms-plugin---components). See how you can use a state machine to render components. 

## 🛠 Contribute 
#### Resources
- [Plugin Development](/docs/plugin-development.md)
- [Todo (Project Board)](https://github.com/qudo-lucas/state-machine-snacks/projects/1)

#### Links to Everything
- [https://github.com/qudo-lucas/state-machine-snacks](https://github.com/qudo-lucas/state-machine-snacks)
- [https://github.com/qudo-lucas/sms-plugin---logger](https://github.com/qudo-lucas/sms-plugin---logger)
- [https://github.com/qudo-lucas/sms-plugin---components](https://github.com/qudo-lucas/sms-plugin---components)
- [https://github.com/qudo-lucas/sms-template---simple-ui](https://github.com/qudo-lucas/sms-template---simple-ui)
- [https://github.com/qudo-lucas/sms-template---plugin](https://github.com/qudo-lucas/sms-template---plugin)
