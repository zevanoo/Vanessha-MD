module.exports = [{
	name: "test",
	tags: "main",
	details: { desc: "test" },
	code: async(zev, m, { isNumber, text }) => {
		if(!isNumber(text)) return;
		const getName = await zev.getName(text + "@s.whatsapp.net")
		console.log(getName)
    m.reply(`Succes ${getName}`)
	}
}]