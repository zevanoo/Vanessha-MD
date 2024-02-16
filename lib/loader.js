const glob = require('glob')
const path = require('path')

function sortCommands(obj) {
  const sortedCategories = Object.keys(obj).sort();
  const sortedCommands = {};

  sortedCategories.forEach(category => {
    sortedCommands[category] = obj[category].sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  });

  return sortedCommands;
}

const Commands = new Map()
exports.loadCommands = (dir) => {
    let rawType = new Set();
    let listType = [];
    let listCommand = {};

    try {
        let files = glob.sync(`${dir}/**/*.js`);
        global.logs("Starting to load all commands...", "info");
        let cmdCount = 0;

        files.forEach((file) => {
            const commandArray = require(file);

            if (Array.isArray(commandArray)) {
                commandArray.forEach((command) => {
                	const defaultTag = "uncategorized";
                    command.tags = command.tags || defaultTag;
                    let groups = command.tags;
                    groups = groups === '' ? "uncategorized" : groups;
                    listCommand[groups] = listCommand[groups] || [];

                    let options = {
                        name: command.name ? command.name : "",
                        aliases: command.aliases ? command.aliases : [],
                        details: {
                            desc: command?.details?.desc ? command?.details?.desc : "none",
                            usage: command?.details?.usage ? command?.details?.usage : "none"
                        },
                        limit: command.limit ? command.limit : false,
                        cooldown: command.cooldown ? command.cooldown : 4,
                        disable: command.disable ? command.disable : false,
                        tags: command.tags ? command.tags : "uncategorized",
                        isMedia: command.isMedia ? command.isMedia : false,
                        isOwner: command.isOwner ? command.isOwner : false,
                        isGroup: command.isGroup ? command.isGroup : false,
                        isPrivate: command.isPrivate ? command.isPrivate : false,
                        isBotAdmin: command.isBotAdmin ? command.isBotAdmin : false,
                        isAdmin: command.isAdmin ? command.isAdmin : false,
                        isBot: command.isBot ? command.isBot : false,
                        isPremium: command.isPremium ? command.isPremium : false,
                        level: command.level ? command.level : 1,
                        nonPrefix: command.nonPrefix ? command.nonPrefix : false,
                        wait: command.wait ? command.wait : false,
                        code: command.code ? command.code : () => {},
                        cooldownActive: false,
                        files: file
                    };
                    listCommand[groups].push(options);
                    if (command.tags) {
                        Commands.set(options.name, options);
                    }

                    const theType = command.tags ? command.tags : "";
                    if (!rawType.has(theType)) {
                        rawType.add(theType);
                        listType.push(theType);
                    }
                    cmdCount++;
                    global.cmdCount = cmdCount
                });
            } else {
                global.logs(`Invalid export in file ${file}. Expected an array of objects.`, "error");
            }
        });
        global.logs(`Success load ${cmdCount} commands from ${dir} directory`, "info")
    } catch (e) {
        console.error(e)
    }
    let sortedCmd = sortCommands(listCommand)
    Commands.list = sortedCmd;
    Commands.type = listType.sort();
    
    return Commands
};

let Plugins = new Map()
exports.loadPlugins = (dir) => {
    try {
        let files = glob.sync(`${dir}/**/*.js`);
        global.logs("Starting to load all plugins...", "info");
        let countplg = 0;

        files.forEach((file) => {
            const pluginsArray = require(file);

            if (Array.isArray(pluginsArray)) {
                pluginsArray.forEach((plugins) => {
                    let options = {
                        name: plugins.name ? plugins.name : "",
                        details: {
                            desc: plugins?.details?.desc ? plugins?.details?.desc : "none",
                            usage: plugins?.details?.usage ? plugins?.details?.usage : "none"
                        },
                        code: plugins.code ? plugins.code : () => {},
                        files: file
                    };
                    Plugins.set(options.name, options)
                    countplg++;
                });
            } else {
                global.logs(`Invalid export in file ${file}. Expected an array of objects.`, "error");
            }
        });

        global.logs(`Success load ${countplg} plugins from ${dir} directory`, "info");
    } catch (e) {
        console.error(e)
    }
    
    return Plugins
};