// utils.js
let discordClient; // This will store the client object

function setupUtils(client) {
    discordClient = client;
}

// Create and export other utility functions that need to use the client object

module.exports = {
    setupUtils,
    getClient: () => discordClient, // Export a function to retrieve the client object
};