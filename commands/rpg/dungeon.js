let monsters = [
    { area: 1, name: "Goblin" }, { area: 1, name: "Slime" }, { area: 1, name: "Wolf" },
    { area: 2, name: "Nymph" }, { area: 2, name: "Skeleton" }, { area: 2, name: "Wolf" },
    { area: 3, name: "Baby Demon" }, { area: 3, name: "Ghost" }, { area: 3, name: "Zombie" },
    { area: 4, name: "Imp" }, { area: 4, name: "Witch" }, { area: 4, name: "Zombie" },
    { area: 5, name: "Ghoul" }, { area: 5, name: "Giant Scorpion" }, { area: 5, name: "Unicorn" },
    { area: 6, name: "Baby Robot" }, { area: 6, name: "Sorcerer" }, { area: 6, name: "Unicorn" },
    { area: 7, name: "Cecaelia" }, { area: 7, name: "Giant Piranha" }, { area: 7, name: "Mermaid" },
    { area: 8, name: "Giant Crocodile" }, { area: 8, name: "Nereid" }, { area: 8, name: "Mermaid" },
    { area: 9, name: "Demon" }, { area: 9, name: "Harpy" }, { area: 9, name: "Killer Robot" },
    { area: 10, name: "Dullahan" }, { area: 10, name: "Manticore" }, { area: 10, name: "Killer Robot" },
    { area: 11, name: "Baby Dragon" }, { area: 11, name: "Young Dragon" }, { area: 11, name: "Scaled Baby Dragon" },
    { area: 12, name: "Kid Dragon" }, { area: 12, name: "Not so young Dragon" }, { area: 12, name: "Scaled Kid Dragon" },
    { area: 13, name: "Definitely not so young Dragon" }, { area: 13, name: "Teen Dragon" }, { area: 13, name: "Scaled Teen Dragon" },
    { area: 14, name: "Ancient Troll" }, { area: 14, name: "Giant Ogre" }, { area: 14, name: "Troll Shaman" },
    { area: 15, name: "Dark Phoenix" }, { area: 15, name: "Skeletal Dragon" }, { area: 15, name: "Spectral Banshee" },
    { area: 16, name: "Frost Giant" }, { area: 16, name: "Ice Elemental" }, { area: 16, name: "Frozen Lich" },
    { area: 17, name: "Volcanic Golem" }, { area: 17, name: "Lava Elemental" }, { area: 17, name: "Magma Dragon" },
    { area: 18, name: "Celestial Seraph" }, { area: 18, name: "Astral Guardian" }, { area: 18, name: "Cosmic Djinn" },
    { area: 19, name: "Ethereal Spirit" }, { area: 19, name: "Void Walker" }, { area: 19, name: "Shadow Assassin" },
    { area: 20, name: "Titanic Behemoth" }, { area: 20, name: "Colossal Leviathan" }, { area: 20, name: "Elder God" }
]

module.exports = [{
	name: "dungeon",
	tags: "rpg",
	details: { desc: "hunting monster" },
	code: async (zev, m, { pushName }) => {
    let health = global.zv.get("health", m.sender, "dungeon")
    let level = global.zv.get("level", m.sender, "user")
    let area = global.zv.get("area", m.sender, "dungeon")

    if (new Date - global.zv.get("dungeonTimeout", m.sender, "dungeon") > 120000) {
        let monster = monsters.find(monster => monster.area === area)
        if (!monster) return m.reply("Tidak ada monster yang ditemukan di area ini.")

        let coins = Math.floor(Math.random() * 30)
        let exp = Math.floor(Math.random() * 50)
        let sum = 51 * area
        let dmg = Math.max(global.zv.get("sword", m.sender, "hunting") * 5 + global.zv.get("armor", m.sender, "dungeon") * 5 - sum, 0)

        global.zv.set("health", health - dmg, m.sender, "dungeon")
        global.zv.set("dungeonTimeout", (Date.now()), m.sender, "dungeon")

        if (health <= 0) {
            global.zv.set("level", global.zv.get("level", m.sender, "user") - 1, m.sender, "user")
            global.zv.set("health", 1000, m.sender, "dungeon")
            return m.reply(`*${pushName}* Anda mati ditangan *${monster.name}* dan turun 1 level karena mati saat berburu!`)
        }

        global.zv.set("money", global.zv.get("money", m.sender, "user") + coins, m.sender, "user")
        global.zv.set("exp", global.zv.get("exp", m.sender, "user") + exp, m.sender, "user")

        m.reply(`*${pushName}* menemukan dan membunuh *${monster.name}*\nMendapatkan ${coins} coins & ${exp} XP\nBerkurang -${dmg} HP, Tersisa ${global.zv.get("health", m.sender, "dungeon")}/100`)
    } else {
        let cd = new Date - global.zv.get("dungeonTimeout", m.sender, "dungeon")
        let s = Math.ceil(3000 - cd / 1000)
        m.reply(`Tunggu ${s} detik lagi untuk bisa berburu monster kembali.`)
    }
   },
 level: 10
}]