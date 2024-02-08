module.exports = [{
	name: "add",
	tags: "group",
	details: { desc: "add member" },
	code: async(zev, m, { participants, baileys, args, text, isNumber }) => {
		if(!isNumber(text)) return m.reply("hanya angka, dan harus nomor yang valid")
		const users = text + "@s.whatsapp.net"
            await zev.groupParticipantsUpdate(m.chat, [users], 'add')
    m.reply(`Succes add ${await zev.getName(users)}`)
	},
	isGroup: true,
	isAdmin: true,
	isBotAdmin: true
}]