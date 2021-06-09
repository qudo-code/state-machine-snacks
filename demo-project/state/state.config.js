import { assign } from "xstate";

import testComponent from "../test.view.svelte";
import testComponent1 from "../test-1.view.svelte";
import testComponent2 from "../test-2.view.svelte";
import testComponent3 from "../test-3.view.svelte";
import testComponent4 from "../test-4.view.svelte";
import itWorkedComponent from "../itWorked.svelte";

// Just a helper that makes it easier to add meetadata for component states
const component = (imported, state = {}) => ({
    meta : {
        ...state.meta,

        component : imported,
    },

    ...state,
});

export default {
    type : "parallel",

    context : {
        components : [],
    },

    on : {
        GO_ONE         : ".one",
        GO_TWO         : ".two",
        GO_ANOTHER     : ".one.another",
        IT_WORKED      : ".two.anotherTwo.pOneOne",
        IT_WORKED_BACK : ".two.anotherTwo.pOneTwo",

        UPDATE_COMPONENT_TREE : {
            actions : assign({
                components : (_, { data : componentTree }) => componentTree,
            }),
        },
    },

    states : {
        two : component(testComponent2, {
            initial : "anotherTwo",

            states : {
                anotherTwo : component(testComponent1, {

                    states : {
                        pOneOne : component(testComponent4),
                        pOneTwo : component(testComponent3),
                    },
                }),
            },
        }),

        one : component(testComponent, {
            initial : "another",

            states : {
                another : {
                    initial : "nested",

                    states : {
                        nested : component(testComponent2, {}),
                    },
                },
            },
        }),
    },
};
