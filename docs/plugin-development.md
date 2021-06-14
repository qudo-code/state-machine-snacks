[⬅ Back](https://github.com/qudo-lucas/state-machine-ui)
# Plugin Development
* tell them if theyr'e going ot use context, they need to scope it. Any way to enforce that or do it automagically? 
* same thing for events
could provide helper function sfor plugin development like "addContext" or "addEvent" but that sounds dumb.
Possible plugin schema:
```javascript
const helper = () => {}

export default ({
    config,
}) => ({

    // Modify config
    config : (config) => {
        
    },

    // Modify service
    service : (service) => {
       
    }

});

// Export any utility functions as named exports.
export {
    helper,
}
```

Logic:
1. read config
2. pass config through the config step of each plugin.
3. create the machine. Possibly with custom option.
4. Interpret the machine. Possibly with custom option. 
5. Pass service through the service step of each plugins

think about plugin runner in the pkg
