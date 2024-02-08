module.exports = [{
	name: "daily",
	tags: "rpg",
	details: { desc: "claim daily", usage: "daily" },
	code: async(zev, m, { clockString }) => {
    let __timers = (new Date - global.zv.get("dailyTimeout", m.sender, "user"))
    let _timers = (86400000 - __timers)
    let timers = clockString(_timers) 
    if (new Date - global.zv.get("dailyTimeout", m.sender, "user") > 86400000) {
        zev.reply(m.chat, `Anda sudah mengklaim dan mendapatkan 100 money dan 1 potion`, m)
        global.zv.set("money", global.zv.get("money", m.sender, "user") + 100, m.sender, "user")
        global.zv.set("potion", global.zv.get("potion", m.sender, "dungeon") + 1, m.sender, "dungeon")
        global.zv.set("dailyTimeout", new Date * 1, m.sender, "user")
    } else {
        m.reply(`silahkan tunggu *${timers}* lagi untuk bisa mengclaim lagi`)
    };
   }
},{
	name: "weekly",
	tags: "rpg",
	details: { desc: "claim weekly", usage: "weekly" },
	code: async(zev, m, { clockString }) => {
    let __timers = (new Date - global.zv.get("weeklyTimeout", m.sender, "user"))
    let _timers = (604800000 - __timers)
    let timers = clockString(_timers) 
    if (new Date - global.zv.get("weeklyTimeout", m.sender, "user") > 604800000) {
        zev.reply(m.chat, `Anda sudah mengklaim dan mendapatkan 700 money dan 5 rare crate`, m)
        global.zv.set("money", global.zv.get("money", m.sender, "user") + 700, m.sender, "user")
        global.zv.set("rare", global.zv.get("rare", m.sender, "crate") + 5, m.sender, "crate")
        global.zv.set("weeklyTimeout", new Date * 1, m.sender, "user")
    } else {
        m.reply(`silahkan tunggu *${timers}* lagi untuk bisa mengclaim lagi`)
    };
   }
},{
	name: "monthly",
	tags: "rpg",
	details: { desc: "claim monthly", usage: "monthly" },
	code: async(zev, m, { clockString }) => {
    let __timers = (new Date - global.zv.get("monthlyTimeout", m.sender, "user"))
    let _timers = (2592000000 - __timers)
    let timers = clockString(_timers) 
    if (new Date - global.zv.get("monthlyTimeout", m.sender, "user") > 2592000000) {
        zev.reply(m.chat, `Anda sudah mengklaim dan mendapatkan 2000 money dan 3 legendary crate dan 2 pet crate`, m)
        global.zv.set("money", global.zv.get("money", m.sender, "user") + 2000, m.sender, "user")
        global.zv.set("legendary", global.zv.get("legendary", m.sender, "crate") + 3, m.sender, "crate")
        global.zv.set("pet", global.zv.get("pet", m.sender, "crate") + 3, m.sender, "crate")
        global.zv.set("monthlyTimeout", new Date * 1, m.sender, "user")
    } else {
        m.reply(`silahkan tunggu *${timers}* lagi untuk bisa mengclaim lagi`)
    };
   }
}]