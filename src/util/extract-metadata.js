// Extract Metadata From Service
// Provide a service and an array of keys as strings.
// This function will loop over every state in your config and look for states that contain meta data that matches the keys provided.

// Example Usage:
// const componentsMap = extractMetadataFromState(service, [ "component", "props" ]);

// The above example would return a map of states that have meta data containing keys "component" or "props".
export default (service, metaKeys) => {
    const { idMap : ids } = service.machine;

    const map = Object.entries(ids).reduce((acc, [ id, val ]) => {
        // See if state has metadata
        if(val.meta) {
            // Loop over provided keys to extract and add them to the map if they exist.
            metaKeys.forEach((key) => {
                if(val.meta[key]) {
                    acc.set(id.replace("(machine).", ""), val);
                }
            });
        }
    
        return acc;
    }, new Map());

    return map;
};
