module.exports = [{
	name: "owner",
	tags: "information",
	details: { desc: "list contact owner" },
	code: async(zev, m, {}) => {
		let list = []
		let owner = global.owner.filter(([number, isCreator, isDeveloper]) => isCreator === true);
		owner.map(async ([number]) => {
			list.push(number)
		})
		zev.sendContact(m.chat, list, m)
	}
}]