import { assign } from "xstate";

import extractMetadataFromState from "../_util/extract-metadata.js";
import configEditor from "../_util/config-editor.js";

const event = "plugin:components:UPDATE_COMPONENTS";

const generateTree = async (state, componentMap) => {
    const tree = [];

    // ["one", "one.something, "two"]
    const activeStates = state.toStrings().sort();

    const addNode = (treePosition, currentState = false, fullState) => {
        // stateSegment is part of a state path.
        // Example state path: one.two.anotherState.three
        const [ stateSegment, ...rest ] = currentState.split(".");

        // Everything except the current stateSegment
        const nextPath = rest.join(".");

        // At the current tree level, see if there's already an object here that matches the stateSegment
        const existingStateIndex = treePosition.findIndex((child) => (child.state === stateSegment));

        if(existingStateIndex > -1) {
            // If there is already a node here that matches this state, keep going deeper.
            const childPosition = treePosition[existingStateIndex].children;

            addNode(childPosition, nextPath, fullState);
        } else if(componentMap.has(fullState)) {
            // Add a new node only if there is a component for the state.
            treePosition[treePosition.length] = {
                children  : [],
                state     : stateSegment,
                component : componentMap.get(fullState).meta.component,
                props     : componentMap.get(fullState).meta.props,
            };
        } else if(nextPath) {
            // State doesn't exist, state doesn't have a component,
            // stay in the same treePosition but skip to the next state.
            addNode(treePosition, nextPath, fullState);
        }
    };

    activeStates.forEach((statePath) => addNode(tree, statePath, statePath));

    return tree;
};

export default ({
    context = "components",
}) => ({
    config : (config) => ({
        // Append update event to config
        ...configEditor.addEventListener(config, {
            [event] : {
                actions : assign({
                    [context] : (_, { data : components }) => components,
                }),
            },
        }),

        // Append context to config
        ...configEditor.addContext(config, { [context] : [] }),
    }),

    // Attach a subscription to the service that builds new component trees upon state changes.
    service : (_, service) => {
        // Get a map of any states containing meta data with keys "component" or "props".
        const componentsMap = extractMetadataFromState(service, [ "component", "props" ]);

        let cache = false;

        service.subscribe(async (state = {}) => {
            try {
                // Build the component tree and assign it to context whenever state changes.
                const tree = await generateTree(state, componentsMap);
    
                // Stringified version of the most recent tree.
                let newTree = "";
    
                try {
                    // Stringify the new tree so we can compare it to existing cache.
                    newTree = JSON.stringify(tree);
                } catch(error) {
                    newTree = false;
                    
                    console.log("ERROR", error);
                }
    
                if(newTree && newTree !== cache) {
                    cache = newTree;
    
                    service.send({
                        type : event,
                        data : tree,
                    });
                }
            } catch(error) {
                console.log(error);
            }
        });
    },
});
