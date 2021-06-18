// Utilities for editing a machine config.
export default {
    addEventListener : (config, event = {}) => ({
        ...config,

        on : {
            ...config.on || {},
            ...event,
        },
    }),

    addContext : (config, context = {}) => ({
        ...config,

        context : {
            ...config.context || {},
            ...context,
        },
    }),

    addState : (config, state = {}) => ({
        ...config,

        state : {
            ...config.state || {},
            ...state,
        },
    }),
};
