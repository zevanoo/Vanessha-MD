require("./config.js");
const baileys = require('@whiskeysockets/baileys')
const util = require('util');
const syntax = require('syntax-error');
const { exec, spawn, execSync } = require("child_process");
const path = require('path')
const chalk = require('chalk')
const axios = require('axios')
const os = require('os')
const fs = require('fs')
const moment = require("moment-timezone")
const fetch = require('node-fetch')

module.exports = async (zev, m, commands, Plugins) => {
	const { getRandom, fetchBuffer, fetchUrl, clockString, isUrl, sleep, jsonformat, parseMention, isNumber, parseUnix, formatSize, formatDate, pickRandom } = require("./lib/function")
	const { from, fromMe, type, body, prefix, isGroup, isMedia, isBot, isQuoted, args, sender } = m;
	const levelling = require('./lib/levelling')
    const metadata = m.metadata || {};
    const text = args.join(' ').trim()

    const command = m.command
    const cmd = commands.get(command) || Array.from(commands.values()).find((v) => v.aliases.find((x) => x.toLowerCase() == command)) || {};
    let isCmd = cmd.nonPrefix ? body.startsWith(`${command}`) : body.startsWith(`${prefix}${command}`)
    
    const sortedPlugins = [...Plugins.values()].sort((a, b) => a.name.localeCompare(b.name));
	const plugins = { ...sortedPlugins.reduce((acc, v) => ({ ...acc, [v.name]: v.code }), {}) };
    
    const quoted = m.isQuoted ? m.quoted : m;
    const mentions = quoted.mentions || m.mentions;
    
    const detraw = cmd.details || { desc: "none", usage: "%prefix%command" };
    const usage = `${detraw.usage}`.replace(/%prefix/gi, prefix).replace(/%command/gi, command).replace(/%text/gi, text);
    const desc = detraw.desc;
    const details = { desc, usage };
    
	const remote = m.key.remoteJid;
	const pushName = m.pushName || "tidak diketahui"
	
	if (cmd.name == undefined) return;
	if (isCmd) {
    	console.log(chalk.yellow('[ PESAN ]'), chalk.yellow("Terkirim pukul " + moment.tz("Asia/Jakarta").format("HH:mm:ss") + " WIB | " + moment.tz("Asia/Jakarta").format("DD/MM/YYYY") + "\n"), chalk.blue(body || type) + "\n" + chalk.yellow(" Dari"), chalk.blue(m.sender) + "\n" + chalk.yellow(" Di"), isGroup ? chalk.blue(metadata.subject) : chalk.blue(m.sender) + chalk.yellow(" dengan nickname ") + chalk.blue(m.pushName), "\n" + chalk.green("------------------------------------------"));
        require('./src/loadUserDatabase')(m)
        global.zv.set("exp", global.zv.get("exp", m.sender, "user") + global.expEarningPerCmd, m.sender, "user")
        require('./src/levelup')(zev, m)
        require('./src/role')(m)
        require('./src/area')(m)
    }
	
	const isOwner = [baileys.jidNormalizedUser(zev.user?.["id"]["split"](":")[0]), ...global.owner.map(([number, isCreator, isDeveloper]) => number)].map(v => v + '@s.whatsapp.net').includes(m.sender)
    const isPrems = global.zv.get("premium", m.sender, "user")
    const isBanned = global.zv.get("banned", m.sender, "user")
    const limit = global.zv.get("limit", m.sender, "user")
        
    const more = String.fromCharCode(8206)
    const readmore = more.repeat(4001)
    const uptime = clockString(process.uptime() * 1000)
    
    const participants = metadata.participants || [{id: m.sender, admin: null}];
	const participantIds = participants.sort().map(v => v.id);
	const memberCount = participants.length || 0;
	const groupAdmins = isGroup ? participants.filter(v => v.admin == "admin" || v.admin == "superadmin").map(v => v.id) : [];
	const superAdmin = isGroup ? participants.filter(v => v.admin == "superadmin").map(v => v.id) : [];
    const isAdmin = isGroup ? groupAdmins.includes(m.sender) : false;
	const isSuperAdmin = isGroup ? superAdmin.includes(m.sender) : false;
	const isBotAdmin = isGroup ? groupAdmins.includes(zev.number.replace(":3", "")) : false;

    if (isOwner === false && isBanned === true) return;
    
    if(isPrems === true) {
            let now = Date.now();
            let premiumExpiredDate = global.zv.get("premiumTimestamp", m.sender, "user");
            if(now > premiumExpiredDate) {
                global.zv.set("premium", false, m.sender, "user");
                global.zv.set("premiumTimestamp", 0, m.sender, "user");
                zev.reply(m.sender, "Waktu Premium Kamu sudah habis, silahkan beli lagi ke owner")
                zev.sendContact(m.sender, global.owner.map(v => v[0]))
            }
        }

    if (isCmd == false && cmd.nonPrefix == false) {
        return;
    }
    if (isCmd && !cmd) {
        return;
    } else if (!isCmd && !cmd) return;
    
    if (cmd.cooldownActive === true && !isPrems && !isOwner) {
    	return zev.reply(m.chat, `command ini sedang cooldown, tunggu ${cmd.cooldown} detik untuk bisa menggunakan command ini kembali`, m)
    }
    
    if (desc && text.endsWith("-desc")) return m.reply(desc);
    if (usage && text.endsWith("-use")) return m.reply(usage);
    if (cmd.details && text.endsWith("-info")) {
        return m.reply(
            "*Command Info:*\n" +
            "- Name: *" + cmd.name + "*\n" +
            "- Aliases: *" + cmd.aliases + "*\n" +
            "- Only Premium: *" + (cmd.isPremium ? "yes" : "no") + "*\n" +
            "- Only Owner: *" + (cmd.isOwner ? "yes" : "no") + "*\n" +
            "- Only Group: *" + (cmd.isGroup ? "yes" : "no") + "*\n" +
            "- Using Limit: *" + (cmd.isLimit ? "yes" : "no") + "*\n" +
            "- Only Group Admin: *" + (cmd.isAdmin ? "yes" : "no") + "*\n" +
            "- Description: *" + desc + "*"
        );
    }
    
    if (cmd.isMedia && !isMedia) {
        return global.mess(zev, "media", m);
    }
    
    if (cmd.isUrl && text == "") {
    	return global.mess(zev, "url", m)
    }
    
    if(cmd.isUrl && !isUrl(text)) {
    	return global.mess(zev, "invalidUrl", m)
    }

    if (cmd.isRegistered && !isRegistered) {
        zev.reply(m.chat, "Kamu belum terdaftar di dalam database bot, Silahkan daftar dengan " + prefix + "register untuk mendaftar.", m);
        return;
    }
    
    if (cmd.isOwner && !isOwner) {
        return global.mess(zev, "owner", m);
    }
    
    if (cmd.isGroup && !isGroup) {
        return global.mess(zev, "group", m);
    }
    
    if (cmd.isPrivate && isGroup) {
        return global.mess(zev, "private", m);
    }
    
    if (cmd.isPremium && !isPrems && !isBot && !isOwner) {
        return global.mess(zev, "premium", m);
    }
    
    if (cmd.isBotAdmin && !isBotAdmin) {
        return global.mess(zev, "botAdmin", m);
    }
    
    if (cmd.isAdmin && !isAdmin) {
        return global.mess(zev, "admin", m);
    }
   
    if (cmd.isBot && !isBot) {
        return global.mess(zev, "bot", m);
    }
    
    if (cmd.disable && cmd) {
        return global.mess(zev, "dead", m)
    }
    
    if (cmd.level > global.zv.get("level", m.sender, "user")) {
    	return zev.reply(m.chat, `dibutukan level ${cmd.level} untuk mengakses fitur ini, level kamu ${global.zv.get("level", m.sender, "user")}`, m)
    }
    
    if (cmd.isQuery && !text) {
        return m.reply(usage);
    }
    
    if (cmd.wait) {
         global.mess(zev, "wait", m)
   }

    if (cmd.limit == true) {
    	if (isPrems === true) {}
        else if (limit === 0) {
            return global.mess(zev, "limit", m);
        } else {
        	global.zv.set("limit", limit - 1, m.sender, "user")
            zev.reply(m.chat, 'Limit terpakai 1', m);
        }
    }
    
    if(cmd.cooldownActive === false) {
      	cmd.cooldownActive = true
      setTimeout(function () {
      	cmd.cooldownActive = false
      }, cmd.cooldown * 1000)
      }
    
        let extra = {
            name: global.botname,
            
            // modules
            util,
            syntax,
            exec,
            spawn,
            execSync,
            path,
            axios,
            os,
            fs,
            fetch,
            moment,
            decode: baileys.jidNormalizedUser,
            baileys,
            plugins,
            
            // components
            getRandom,
            fetchBuffer,
            fetchUrl, 
            clockString,
            sleep,
            jsonformat,
            parseMention,
            isNumber,
            parseUnix,
            readmore,
            uptime,
            formatSize,
            formatDate,
            pickRandom,
            
            // mesaage
            type,
            body,
            args,
            text,
            mentions,
            
            // user
            from,
            quoted,
            remote,
            pushName,
            isPrems,
            limit,
            levelling,
            
            // groups
            isGroup,
            metadata,
			participants,
			participantIds,
			memberCount,
			groupAdmins,
			superAdmin,
		    isAdmin,
			isSuperAdmin,
			isBotAdmin,
			
			// command
			prefix,
			command,
			commands,
			cmd,
			usage,
			desc,
			details,
			
			// checker
			isBanned,
			isBot,
			isQuoted,
			isCmd,
			isUrl,
			isPublic: zev.public,
			isOwner,
			isMedia
        };
    try {
    	global.readMessage ? zev.readMessages([m.key]) : null
        cmd.code(zev, m, extra, plugins)
    } catch (e) {
        console.error(e);
        for (let [jid] of global.owner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
                        let data = (await conn.onWhatsApp(jid))[0] || {}
                        if (data.exists) {
                            zev.reply(data.jid, `*🗂️ Plugin:* ${cmd.files}\n*👤 Sender:* ${m.sender}\n*💬 Chat:* ${m.chat}\n*💻 Command:* ${cmd.name}\n\n\${format(e)}`.trim(), m)
                        }
                    }
    }
};
