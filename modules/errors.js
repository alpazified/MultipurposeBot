const {
    MessageEmbed
} = require('discord.js')

const colors = require('../lib/colors.json')
const stack = require('error-stack-parser')

module.exports = {
    embedError: function(err, lang, message) {
        const embed = new MessageEmbed()
            .setTitle(`❌ ${lang.ErrorOccurred}`)
            .setColor(colors.red)
            .addField("Error", `\`${err}\``, true)
            .setTimestamp()

        message.channel.send({
            embeds: [embed]
        }).catch()
    },
    embedInvalidSyntax: function(err, lang, message) {
        // Coming soon tm
        const embed = new MessageEmbed()
            .setTitle(`❌ ${lang.ErrorOccurred}`)
            .setColor(colors.red)
            .addField("Error2", `\`${err}\``, true)
            .setTimestamp()

        message.channel.send({
            embeds: [embed]
        }).catch()
    }
}