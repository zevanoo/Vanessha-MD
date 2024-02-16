module.exports = [{
    name: "exec",
    aliases: ["ex", "$"],
    desc: "Running Terminal Code via Command",
    tags: "owner",
    code: async(zev, m, { exec, text }) => {
    	zev.reply(m.chat, "Executing....", m)
				if (!text) return m.reply(`No query code`)
        exec(text, async (err, stdout) => {
            if (err) return m.reply(err)
            if (stdout) return m.reply(stdout)
        })
    },
    isOwner: true,
    nonPrefix: true
},{
	name: "eval",
    aliases: ["ev", "=>", ">"],
    desc: "Running JavaScript Code via Command",
    tags: "owner",
    code: async(zev, m, {
        	name,
            
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
            decode,
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
			isPublic,
			isOwner,
			isMedia
			}, {
			ttdl,
			ytv,
			yta,
			yts,
			fbdl,
			fbdlv2,
			igdl,
			aiodl
			}) => {
    	let evaled
        try {
        	evaled = await eval(`(async () => { return ${text} })()`)
        m.reply(util.format(evaled))
        } catch (e) {
            m.reply(util.format(e))
        }
    },
    isOwner: true,
    nonPrefix: true
}]