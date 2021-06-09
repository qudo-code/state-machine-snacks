export default (service) => service.onTransition((state) => console.log("STATE LOG", state));
