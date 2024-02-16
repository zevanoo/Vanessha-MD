module.exports = [{
	name: "heal",
	tags: "rpg",
	details: { desc: "heal health for dungeon", usage: "heal" },
	code: async (zev, m, { prefix, args, isNumber }) => {
		let healthUser = global.zv.get("health", m.sender, "dungeon")
		let potion = global.zv.get("potion", m.sender, "dungeon")
		if(healthUser > 1000) return zev.reply(m.chat, "health mu sudah penuh", m)
		if(potion < 1) return zev.reply(m.chat, `kamu tidak mempunyai potion, beli dulu di ${prefix}shop`, m)
		let countToHeal = 100 + (global.zv.get("kucing", m.sender, "pet") * 5)
		let count = Math.max(1, Math.min(Number.MAX_SAFE_INTEGER, (isNumber(args[0]) && parseInt(args[0]) || Math.round((1000 - healthUser) / countToHeal)))) * 1
		if(potion < count) return zev.reply(m.chat, `potionmu ga cukup, potionmu hanya ${potion} beli dulu di ${prefix}shop`, m)
		global.zv.set("potion", potion - count * 1, m.sender, "dungeon")
		global.zv.set("heal", countToHeal * count, m.sender, "dungeon")
		zev.reply(m.chat, `Success use ${count} potion to heal`, m)
	}
}]