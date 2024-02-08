module.exports = [{
	name: "kick",
	tags: "group",
	details: { desc: "kick member", usage: "kick @tag, atau balas pesan yang akan di kick" },
	code: async(zev, m, { participants, baileys }) => {
		if(!m?.quoted?.participant || !m?.mentions) {
			m.reply("tag/balas member yang akan di kick")
		} else {
		let users = m.quoted.participant || m.mentions
        if (users.endsWith('@s.whatsapp.net') && !(participants.find(v => baileys.areJidsSameUser(v.id, users)) || { admin: true }).admin) {
            const res = await zev.groupParticipantsUpdate(m.chat, [users], 'remove')
    m.reply(`Succes kick ${await zev.getName(users)}`)
	}
	}
	},
	isGroup: true,
	isAdmin: true,
	isBotAdmin: true
}]