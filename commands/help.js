const colors = require('../lib/colors.json')
const {
    MessageEmbed
} = require('discord.js')


exports.run = (client, message, args, level) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    const prefix = message.guild === null ? ';;' : client.getSettings(message.guild.id).prefix

    try {
        if (!args[0]) {
            const embed = new MessageEmbed()
                .setTitle(lang.Help)
                .setColor(colors.default)
                .setThumbnail(client.user.avatarURL)
                .addField(lang.Commands, `${lang.CommandsFound} \`${prefix}commands\`.`)
                .setImage("https://cdn.discordapp.com/avatars/900822716892987393/ad0fc62f038ec0aed373da83738cefe4.png?size=4096")
                .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                .setTimestamp()

            message.channel.send({
                embeds: [embed]
            })
        } else {
            // Show individual command/alias/category's help
            let command = args[0]
            if (client.commands.has(command) || client.aliases.has(command)) {
                command = client.commands.get(command) || client.aliases.get(command)

                embed = new MessageEmbed()
                    .setTitle(`${lang.Help} - ${prefix}${command.help.name}`)
                    .setColor(colors.default)
                    .setThumbnail(client.user.avatarURL)
                    .setDescription(`${command.help.description}\n\n**${lang.Usage}:** ${command.help.usage}\n**${lang.Aliases}:** ${command.conf.aliases.join(' | ') || lang.None}`)
                    .addField(lang.PermissionLevel, `${client.levelCache[command.conf.permLevel]} - ${command.conf.permLevel}`, true)
                    .addField(lang.Category, command.help.category, true)
                    .addField(lang.GuildOnly, command.conf.guildOnly ? lang.Yes : lang.No, true)
                    .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                    .setTimestamp()

                message.channel.send({
                    embeds: [embed]
                })
            } else {
                const currentCategory = ''
                let output = ''
                const userCommands = client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level)

                const sorted = userCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 : p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1)
                sorted.forEach(c => {
                    const cat = c.help.category.toLowerCase()
                    if (cat == args[0].toLowerCase()) {
                        if (level < client.levelCache[c.conf.permLevel]) return
                        output += '`' + c.help.name + '` '
                    }
                })

                if (!output) return message.reply(lang.InvalidCommand)
            }
        }
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
    }
}

exports.conf = {
    enabled: true,
    aliases: ['h'],
    guildOnly: false,
    permLevel: 'User'
}

exports.help = {
    name: 'help',
    category: 'Utility',
    description: 'Shows useful information.\nIf <command> is specified, will show description and usage of that command.',
    usage: 'help <command>'
}