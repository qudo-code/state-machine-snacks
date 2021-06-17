export default {
    service : (_, service) => service.onTransition((state) => console.log("STATE", state)),
};
