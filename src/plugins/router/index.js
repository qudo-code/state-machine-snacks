export default {
    service : (_, service) => service.onTransition((state) => console.log("Router", state)),
};
