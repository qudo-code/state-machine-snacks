/* eslint-disable max-statements */
import { createMachine, interpret } from "xstate";

import util from "./util/index.js";

const {
    name : packageName,
} = require("./package.json");

const error = () => console.error(`${packageName}: ${error}`);

export default ({
    config : existingConfig = false,
    createMachine : customCreateMachine = false,
    interpret : customInterpret = false,
    plugins = [],
}) => {
    try {
        if(!existingConfig) {
            error("No machine config provided.");
        }

        // Pull off and sort plugin hooks
        const configModifiers = [];
        const serviceModifiers = [];

        plugins.forEach(({
            config : configMod = false,
            service : serviceMod = false,
        }) => {
            if(configMod) {
                configModifiers.push(configMod);
            }

            if(serviceMod) {
                serviceModifiers.push(serviceMod);
            }
        });

        let config = existingConfig;
        let machine = false;
        let service = false;

        // Modify config via "config" plugin hooks
        configModifiers.forEach((configMod) => config = configMod(config));

        // Use custom machine creation if provided.
        if(customCreateMachine) {
            machine = customCreateMachine(config);
        } else {
            // Fallback to simple machine creation.
            machine = createMachine(config);
        }

        // Use custom machine interpreter if provided.
        if(customInterpret) {
            service = customInterpret(machine);
        } else {
            // Fallback to simple interpret.
            service = interpret(machine);
        }

        serviceModifiers.forEach((serviceMod) => serviceMod(config, service));
        
        return service;
    } catch(err) {
        error(err);
    }
};

export {
    util,
};
