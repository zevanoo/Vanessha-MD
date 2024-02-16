module.exports = [{
	name: "add",
	tags: "group",
	details: { desc: "add member" },
	code: async(zev, m, { participants, baileys, args, text, isNumber }) => {
		if(!isNumber(text)) return zev.reply(m.chat, "hanya angka, dan harus nomor yang valid", m)
		const users = text + "@s.whatsapp.net"
            await zev.groupParticipantsUpdate(m.chat, [users], 'add')
    zev.reply(m.chat, `Succes add ${await zev.getName(users)}`, m)
	},
	isGroup: true,
	isAdmin: true,
	isBotAdmin: true
},{
	name: "kick",
	tags: "group",
	details: { desc: "kick member", usage: "kick @tag, atau balas pesan yang akan di kick" },
	code: async(zev, m, { participants, baileys }) => {
		if(!m.mentions || m.mentions.length === 0) return zev.reply(m.chat, "tag member yang akan di kick", m)
		let users = m.mentions[0]
        await zev.groupParticipantsUpdate(m.chat, [users], 'remove')
       zev.reply(m.chat, `Succes kick ${await zev.getName(users)}`, m)
	},
	isGroup: true,
	isAdmin: true,
	isBotAdmin: true
},{
	name: "demote",
	tags: "group",
	detalis: { desc: "demote admin to member", usage: "demote @tag" },
	code: async (zev, m, { groupAdmins }) => {
		if(!m.mentions || m.mentions.length === 0) return zev.reply(m.chat, "tag admin yang akan di demote", m)
		let users = m.mentions[0]
        if(!groupAdmins.includes(users)) return m.reply("dia bukan admin")
        await zev.groupParticipantsUpdate(m.chat, [users], 'demote')
        zev.reply(m.chat, `Succes demote ${await zev.getName(users)}`, m)
	},
	isAdmin: true,
	isBotAdmin: true,
	isGroup: true
},{
	name: "promote",
	tags: "group",
	detalis: { desc: "promote member to admin", usage: "promote @tag" },
	code: async (zev, m, { groupAdmins }) => {
		if(!m.mentions || m.mentions.length === 0) return zev.reply(m.chat, "tag member yang akan di promote", m)
		let users = m.mentions[0]
        if(groupAdmins.includes(users)) return m.reply("dia sudah admin")
        await zev.groupParticipantsUpdate(m.chat, [users], 'promote')
        zev.reply(m.chat, `Succes promote ${await zev.getName(users)}`, m)
	},
	isAdmin: true,
	isBotAdmin: true,
	isGroup: true
}]