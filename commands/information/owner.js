module.exports = [{
	name: "owner",
	tags: "information",
	details: { desc: "list contact owner" },
	code: async(zev, m, {}) => {
		let list = []
		global.owner.map(v => {
			list.push(v[0])
		})
		zev.sendContact(m.chat, list, m)
	}
}]