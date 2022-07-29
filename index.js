const log4js = require("log4js");

const {Client} = require('discord.js-selfbot-v13');
const Discord = require('discord.js-selfbot-v13');
const client = new Client({
    checkUpdate: false,
});

const keepAlive = require("./server");
keepAlive();

log4js.configure({
    appenders: {
        Bot: {
            type: "stdout"
        }
    },
    categories: {
        default: {
            appenders: ["Bot"], level: "trace"
        }
    },
});
const logger = log4js.getLogger("Bot");

client.on('ready', () => {
    logger.info(`Logged with ${client.user.username}.`);

    if (process.env.CUSTOMSTATUS === undefined) {
        logger.warn("The status is not changed because \"customstatus\" is not defined in the environment variable.");
        return;
    }
    let CustomStatus = new Discord.CustomStatus()
        .setState(process.env.CUSTOMSTATUS)
        .setEmoji(process.env.EMOJI)
    client.user.setActivity(CustomStatus.toJSON());
    logger.info('Custom Status has successfully Set.')
})

client.login(process.env.TOKEN)
    .catch(err => {
        logger.fatal(err)
    });