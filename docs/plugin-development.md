[⬅ Back to 🍕](https://github.com/qudo-lucas/state-machine-snacks)
# Plugin Development

[👨🏽‍💻 Plugin Developer Template](https://github.com/qudo-lucas/sms-template---plugin)

### Dev Helpers 
There are helper functions located available via 🍕 that you should utilize throughout plugin development. 
```javascript
import { util } from "state-machine-snacks";

const {
    configEditor,
    extractMetadata,
} = util;
```
| Helper | Description | Function |
| ------  | ------ | ---- |
| [Config Editor](#config-editor) | Useful during the `config` hook. |  `configEditor` |
| [Extract Metadata From State Chart](#extract-metadata) | Generates a map of states that have matadata. | `extractMetadata` |

## Config Editor
Append things like events, context, and states to a users config without affecting any original values. 

**Note:** These helpers can only be used in the `config` hook during the plugin lifecycle.

```javascript
import { assign } from "xstate";
import configEditor from "../_util/config-editor.js";

export default () => ({
    config : (config) => ({
        // Add context, a place where we can store values that the user can also read.
        ...configEditor.addContext(config, { someContext : "some value" })

        // Add an update event used to update context.
        ...configEditor.addEventListener(config, { plugin:myPluginName:UPDATE_STATE : {
            actions : assign({
                someContext : (ctx, event) => event.data,
            })
        }})

        // Add a new state.
        ...configEditor.addState(config, {
            coolState : {
                entry : () => console.log("cool state bro)
            },
        })

        // Add event that moves the app to the new state we created.
        ...configEditor.addEventListener(config, {
            plugin:myPluginName:MOVE_STATE : ".coolState",
        })
    }),
})
```

### Adding Events
 `configEditor.addEventListener(config, event)`
You can add events to the users config during the `config` hook with the `addEventListener` function. 

When adding event listeners, it is recommended that you prefix events with a pattern similar to the following example.

**Example:** ```{ plugin:yourPluginName:WHATEVER_YOU_WANT : ".stateTwo" }```
| Args     | Description  |              |
| ----------- | -----------  | -----------  | 
| config  | XState state machine config. | Required
| event  | XState event object.  | Required

### Adding Context
 `configEditor.addContext(config, context)`
You can add context to the users config during the `config` hook with the `addContext` function. 


**Example:** ```{ myPluginsContext : "some values for my plugin or the user" }```
| Args     | Description  |              |
| ----------- | -----------  | -----------  | 
| config  | XState state machine config. | Required
| context  | Object to be appended to machine context.   | Required

### Adding States
 `configEditor.addState(config, context)`
You can add states to the users config during the `config` hook with the `addState` function. 

**Example:** ```{ myPluginsState : { entry : () => console.log("made it")}}```
| Args     | Description  |              |
| ----------- | -----------  | -----------  | 
| config  | XState state machine config. | Required
| state  | Object to be appended to machine states.   | Required

<h2 id="extract-metadata">Extract Metadata</h2>

Extract metadata from a service. Often times plugins require user input provided via metadata in the state chart config. This function accepts a service, plus a list of  metadata keys you wish to extract.

This would build a map of all state machine states that have metatadata property "component".
```javascript
const componentsMap = extractMetadataFromState(service, [ "component" ]);

// Output:
// Map([
//      [
//          "exampleState.anotherState",
//          metadataValue
//     ],
//      [
//          "someStateWithMeta",
//          otherMetadataValue
//     ]
// ])
```
