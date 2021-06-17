[⬅ Back](https://github.com/qudo-lucas/state-machine-ui)
# Components Plugin
*Inspired by [XState Component Tree](https://github.com/tivac/xstate-component-tree)*

Integrate JavaScript components into a state machine config. This plugin analyzes a state machine in order to build a tree of components to be rendered for the active state. This component tree is stored in your state machine `context` under the `components` property.

## Add Plugin
```javascript
import sms from "state-machine-snacks";
import components from "state-machine-snacks/plugins/components";

const config = { /* ...your machine config */ };

// Apply desired stateUI plugins and settings.
stateUI({
    config,
    plugins : [
        components()
    ]
});

// Start service after
service.start();
```

| Options | Description
| ----------- | -----------   
| context     | Modify where the component tree is stored in context. Provide a string containing the new context property name.


## Usage
Define component states in the state machine config. When a component state is entered, the corresponding component(s) (multiple if parallel state) will be included in the component tree.

`component(component, state, props)`


In order to define which states are associated with which components, utilize the `component()` helper provided by the Components plugin.


| Arg      | Description | Type |
| ----------- | ----------- | ----------- |
| `component`    | Imported component to be rendered. See `MyComponent` below.       | `Any` |
| `state`   | XState state object. | `Object` |
| `props`   | Props to be passed to the component. If any of the object properties are functions, the functions will be handled similar to XState `assign`. Each function will be called with the latest context and last event. `(ctx, event) => propValue` | `Object` | 

## Examples 
Examples of state machine configs and their component tree outputs for each state.

### Single Component 
```javascript
import { component } from "state-ui/plugins/components;

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

**`hideAll`** ↴
```javascript
[
   /* empty */
]
```
**`componentStateOne`** ↴
```javascript
[
    {   
        component : ComponentOne,
        children : []
    }
]
```
**`someState.componentStateTwo`** ↴

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
import { component } from "state-ui/plugins/components;

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
import { component } from "state-ui/plugins/components";

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

## Reading The Component Tree
The component tree will be stored in the context of your state machine. You can access the value with a simple subscription.

### Svelte
**App.svelte**
```html
{#each components as { component, children }}
    <svelte:component this={component} components={children} />
{/each}

<script>
import service from "./service.js";

// XState services similar in shape to Svelte stores.
// This means we can subscribe to them with Svelte's `$`.
$: ({
    components
} = $service.context);
</script>
```

**example-child.svelte**
To render the additional children, utilize the props passed in by the parent and continue the pattern.

```html
{#each components as { component, children }}
    <svelte:component this={component} components={children} />
{/each}

<script>
export let components;
</script>
```

### Vue
*WIP*
### React
*WIP*
