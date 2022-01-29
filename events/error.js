const Discord = require("discord.js");
module.exports = async (client, error) => {
    if (JSON.stringify(error).toLowerCase().includes("discordapierror")) return;
    client.logger.log(error.message, "error"); // Log error
    client.channels.cache.get("913606797103861780").send(error.message);
};