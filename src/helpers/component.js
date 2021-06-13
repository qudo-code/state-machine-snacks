export default (imported, state = {}) => ({
    meta : {
        ...state.meta,

        component : imported,
    },

    ...state,
});
