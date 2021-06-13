# State Machine UI
A framework agnostic toolkit and concept built on [XState](https://xstate.js.org/docs/about/concepts.html) that aims to increase state machine adoption in UI development.

#### What Is XState?
XState is a library that allows us to create and interpret state machines in JavaScript. It is recommended you understand the basics of XState before using State Machine UI. 

# Plugins
Plugins add additional functionality to an XState service.

| Plugin Name      | Description | |
| ----------- | ----------- | ----------- |
| Components| Render components depending on the active state. | [Link](#components)
| Router    | Bind browser URLs to specified states. | [Link](/docs/chapters/plugins/router.md) |
| Logger    | Provide useful logging when developing with XState. | [Link](/docs/chapters/plugins/logger.md) |


# Components
Integrate JavaScript components into a state machine config. This plugin analyzes a state machine in order to build a tree of components to be rendered for the active state.


## Setup
#### Add Plugin
```javascript
import { plugins } from "state-machine-ui";
import { createMachine, interpret } from "xstate";

// Pull off desired plugin(s)
const { pluginComponentTree } = plugins;

// XState things
const machine = createMachine({/* ...machine config ... */});
const service = interpret(machine);

// Pass service through plugin(s)
pluginComponentTree(service);

// Start it
service.start();
```

#### Context
*Add the following context to your state machine.*

This is where the plugin will store the generated component tree.
```javascript
export default {
    context : {
        components : [],
    },
};

```
#### Events
*Add the following event(s) and actions to your state machine.*

This event is used to update the `components` context upon state changes.
```javascript
import { assign } from "xstate";

export default {
    context : {
        components : [],
    },

    on : {
        UPDATE_COMPONENTS : {
            actions : assign({
                components : (_, { data : components }) => components,
            }),
        },
    },
};
```

## Usage
Define component states in the state machine config. When a component state is entered, the corresponding component(s) (multiple if parallel state) will be included in the component tree.

### Component Helper
`component(component, state, props)`


In order to define which states are associated with which components, we can utilize the `component()` helper provided by State Machine UI.


| Arg      | Description | Type |
| ----------- | ----------- | ----------- |
| `component`    | Imported component to be rendered. See `MyComponent` below.       | `Any` |
| `state`   | XState state object. | `Object` |
| `props`   | Props to be passed to the component. If any of the object properties are functions, the functions will be handled similar to XState `assign`. Each function will be called with the latest context and last event. `(ctx, event) => propValue` | `Object` | 

## Examples 
Examples of state machine configs and their component tree outputs for each state.

### Single Component 
```javascript
import { component } from "state-machine-ui";

import ComponentOne from "./component-one.svelte";
import ComponentTwo from "./component-two.svelte";

export default {

    on : {
        HIDE_ALL           : ".hideAll"
        SHOW_COMPONENT_ONE : ".componentStateOne",
        SHOW_COMPONENT_TWO : ".someState.componentStateTwo",
    }

    states : {
        hideAll : {},

        componentStateOne : component(ComponentOne, {
            on : {
                EXIT_COMPONENT : "showNothing",
            }
        }),

        someState : {
            states : {
                componentStateTwo : component(ComponentTwo)
            }
        }
    }
};
```

**`hideAll`**
```javascript
[
   /* empty */
]
```
**`componentStateOne`**
```javascript
[
    {   
        component : ComponentOne,
        children : []
    }
]
```
**`someState.componentStateTwo`**

\* *Non-component states are skipped.*

```javascript
[
    {   
        component : ComponentTwo,
        children : []
    }
]
```

### Nesting Components 
This is how you could make something like a multi-tab view or nav bar.
```javascript
import { component } from "state-machine-ui";

import TabView from "./tab-view.svelte";

import TabOne from "./tab-component-1.svelte";
import TabTwo from "./tab-component-2.svelte";

export default {
    initial : "hideTabView",

    on :  {
        HIDE_TAB_VIEW : ".hideTabView",
        SHOW_TAB_VIEW : ".showTabView",
    }

    states : {
        hideTabView : {},
        showTabView : component(TabView, {
            on : {
                SHOW_TAB_ONE : ".tabOne",
                SHOW_TAB_TWO : ".tabTwo",
            },

            states : {
                tabOne : component(TabOne),
                tabTwo : component(TabTwo),
            }
        })
    }
};
```

**`hideTabView`**
```javascript
[
   /* empty */
]
```

**`showTabView`**
```javascript
[
    {   
        component : TabView,
        children  : []
    }
]
```
**`showTabView.tabOne`**
```javascript
[
    {   
        component : TabView,
        children  : [
            {
                component : TabOne,
                children  : []
            }
        ]
    }
]
```
**`showTabView.tabTwo`**
```javascript
[
    {   
        component : TabView,
        children  : [
            {
                component : TabTwo,
                children  : []
            }
        ]
    }
]
```
### Parallel Components
Often times we need to render more than one component at once. To accommodate this, the component tree plugin plays very nicely with XState's concept of [parallel states](https://xstate.js.org/docs/guides/parallel.html#parallel-state-nodes).
```javascript
import { component } from "state-machine-ui";

import MainView from "./main-view.svelte";
import Modal from "./modal.svelte";

import SubViewOne from "./sub-view-1.svelte";
import SubViewTwo from "./sub-view-2.svelte";

export default {
    // Important
    type : "parallel",

    states : {
        // An always-on parent view with two child states
        main : component(MainView, {
            on : {
                SUB_VIEW_ONE : ".subViewOne",
                SUB_VIEW_TWO : ".subViewTwo",
            },

            states : {
                subViewOne : component(SubViewOne),
                subViewTwo : component(SubViewTwo),
            }
        }),

        // Rendered at same level as "MainView" but only when in `modal.show`
        modal : {
            initial : "hide",

            on : {
                MODAL_SHOW : ".show"
                MODAL_HIDE : ".hide"
            }

            states : {
                hide : {},
                show : component(Modal)
            }
        }
    }
};
```

**`main, modal.hide`**
```javascript
[
   {
       component : MainView,
       children  : [],
   }
]
```

**`main.subViewOne, modal.hide`**
```javascript
[
   {
       component : MainView,
       children  : [
           {
               component : SubViewOne,
               children  : [],
           }
       ],
   }
]
```

**`main, modal.show`**
```javascript
[
    {
        component : MainView,
        children  : [],
    },
    {
        component : Modal,
        children  : [],
    }
]
```

**`main.subViewTwo, modal.show`**
```javascript
[
    {
        component : MainView,
        children  : [
            {
                component : SubViewTwo,
                children  : [],
            }
        ],
    },
    {
        component : Modal,
        children  : [],
    }
]
```
