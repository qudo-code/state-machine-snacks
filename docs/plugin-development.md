[⬅ Back](https://github.com/qudo-lucas/state-machine-ui)
# Plugin Development
if you're going to use context tell the to scope it to their plugin name 

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
