module.exports = [{
	name: "test",
	tags: "main",
	details: { desc: "test" },
	code: async(zev, m, { util }) => {
		let res = await m.reply(`@${m.sender.split("@")[0]}`)
		m.reply(util.format(res.message.extendedTextMessage.contextInfo.mentionedJid))
		m.reply(util.format(m.mentions))
	}
}]