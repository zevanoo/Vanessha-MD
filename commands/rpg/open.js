module.exports = [{
	name: "open",
	tags: "rpg",
	details: { desc: "open crate", usage: "open (crateName) (count)" },
	code: async (zev, m, { args, isNumber, pickRandom }) => {

const rewards = {
    common: {
        money: Math.floor(Math.random() * 630) + ",user",
        limit: Math.floor(Math.random() * 20) + ",user"
    },
    uncommon: {
        money: Math.floor(Math.random() * 800) + ",user",
        limit: Math.floor(Math.random() * 30) + ",user",
        potion: Math.floor(Math.random() * 25) + ",dungeon"
    },
    rare: {
        money: Math.floor(Math.random() * 1790) + ",user",
        limit: Math.floor(Math.random() * 35) + ",user",
        potion: Math.floor(Math.random() * 30) + ",dungeon",
        kayu: Math.floor(Math.random() * 50) + ",chop",
        stone: Math.floor(Math.random() * 600) + ",mining"
    },
    legendary: {
        money: Math.floor(Math.random() * 2630) + ",user",
        limit: Math.floor(Math.random() * 40) + ",user",
        potion: Math.floor(Math.random() * 37) + ",dungeon",
        kayu: Math.floor(Math.random() * 50) + ",chop",
        stone: Math.floor(Math.random() * 600) + ",mining",
        ikan: Math.floor(Math.random() * 150) + ",mancing",
        semangka: Math.floor(Math.random() * 150) + ",tanam"
    },
    mythical: {
        money: Math.floor(Math.random() * 5200) + ",user",
        limit: Math.floor(Math.random() * 60) + ",user",
        potion: Math.floor(Math.random() * 43) + ",dungeon",
        kayu: Math.floor(Math.random() * 50) + ",chop",
        stone: Math.floor(Math.random() * 600) + ",mining",
        ikan: Math.floor(Math.random() * 150) + ",mancing",
        semangka: Math.floor(Math.random() * 200) + ",tanam",
        diamond: Math.floor(Math.random() * pickRandom([0, 0, 20, 1, 2, 0, 0, 18])) + ",mining"
    },
    artefact: {
        money: Math.floor(Math.random() * 11000) + ",user",
        limit: Math.floor(Math.random() * 600) + ",user",
        potion: Math.floor(Math.random() * 52) + ",dungeon",
        kayu: Math.floor(Math.random() * 50) + ",chop",
        stone: Math.floor(Math.random() * 600) + ",mining",
        ikan: Math.floor(Math.random() * 150) + ",mancing",
        semangka: Math.floor(Math.random() * 300) + ",tanam",
        diamond: Math.floor(Math.random() * pickRandom([0, 0, 20, 1, 2, 0, 0, 18])) + ",mining",
        beringin: Math.floor(Math.random() * pickRandom([0, 0, 20, 1, 2, 0, 0, 18])) + ",chop"
    },
    pet: {
        kucing: "1,pet",
        rubah: "1,pet",
        kuda: "1,pet",
        potion: "2,dungeon",
        makananpet: "1,pet"
    }
};

let crateList = Object.keys(rewards).join(', ')
    let user = global.zv.getDataUser(m.sender, "crate")
    const type = (args[0] || '').toLowerCase();
    const count = Math.floor(isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 1), Number.MAX_SAFE_INTEGER) : 1) * 1;

    if (!(type in rewards)) {
        return zev.reply(m.chat, `Crate ${type} tidak ditemukan, crate yang tersedia:\n${crateList}`);
    }    

    if (type === "pet") {
    	let userpet = global.zv.getDataUser(m.sender, "pet")
        if (userpet["kucing"] + userpet["rubah"] + userpet["kuda"] >= 3) {
            return zev.reply(m.chat, `Kamu sudah memiliki jumlah maksimal pet.`);
        } else {
            let crateReward = {};
            for (let i = 0; i < count; i++) {
                let _mknp = pickRandom([1, 2, 1, 5, 3, 2, 1, 2, 4, 1, 3, 5, 2, 4, 3]);
                let mknp = (_mknp * 1);
                let _pet = pickRandom(['kucing', 'rubah', 'kuda']);
                if (user["pet"] > 0) { 
                    global.zv.set("pet", global.zv.get("pet", m.sender, "crate") - 1, m.sender, "crate")
                    if (_pet === 'kucing' && userpet["kucing"] > 0) {
                        global.zv.set("potion", global.zv.get("potion", m.sender, "dungeon") + 2, m.sender, "dungeon")
                        global.zv.set("makananpet", global.zv.get("makananpet", m.sender, "pet") + 2, m.sender, "pet")
                        crateReward["potion"] = (crateReward["potion"] || 0) + 2;
                        crateReward["makananpet"] = (crateReward["makananpet"] || 0) + mknp;
                        zev.reply(m.chat, `Anda sudah memiliki pet ${_pet}, Hadiahmu diganti dengan 2 potion${mknp > 0 ? ` Dan ${mknp} Makanan Pet` : ''}`, m);
                    } else if (_pet === 'kucing' && userpet["kucing"] === 0) {
                        global.zv.set("kucing", 1, m.sender, "pet")
                        global.zv.set("makananpet", global.zv.get("makananpet", m.sender, "pet") + 2, m.sender, "pet")
                        crateReward["kucing"] = (crateReward["kucing"] || 0) + 1;
                        crateReward["makananpet"] = (crateReward["makananpet"] || 0) + mknp;
                        zev.reply(m.chat, `*Selamat Anda mendapatkan pet ${_pet}${mknp > 0 ? ` Dan ${mknp} Makanan Pet*` : '*'}`, m);
                    } else if (_pet === 'rubah' && userpet["rubah"] > 0) {
                        global.zv.set("potion", global.zv.get("potion", m.sender, "dungeon") + 2, m.sender, "dungeon")
                        global.zv.set("makananpet", global.zv.get("makananpet", m.sender, "pet") + 2, m.sender, "pet")
                        crateReward["potion"] = (crateReward["potion"] || 0) + 2;
                        crateReward["makananpet"] = (crateReward["makananpet"] || 0) + mknp;
                        zev.reply(m.chat, `Anda sudah memiliki pet ${_pet}, Hadiahmu diganti dengan 2 potion ${mknp > 0 ? `Dan ${mknp} Makanan Pet` : ''}`, m);
                    } else if (_pet === 'rubah' && userpet["rubah"] === 0) {
                        global.zv.set("rubah", 1, m.sender, "pet")
                        global.zv.set("makananpet", global.zv.get("makananpet", m.sender, "pet") + 2, m.sender, "pet")
                        crateReward["rubah"] = (crateReward["rubah"] || 0) + 1;
                        crateReward["makananpet"] = (crateReward["makananpet"] || 0) + mknp;
                        zev.reply(m.chat, `*Selamat Anda mendapatkan pet ${_pet}${mknp > 0 ? ` Dan ${mknp} Makanan Pet*` : '*'}`, m);
                    } else if (_pet === 'kuda' && userpet["kuda"] > 0) {
                        global.zv.set("potion", global.zv.get("potion", m.sender, "dungeon") + 2, m.sender, "dungeon")
                        global.zv.set("makananpet", global.zv.get("makananpet", m.sender, "pet") + 2, m.sender, "pet")
                        crateReward["potion"] = (crateReward["potion"] || 0) + 2;
                        crateReward["makananpet"] = (crateReward["makananpet"] || 0) + mknp;
                        zev.reply(m.chat, `Anda sudah memiliki pet ${_pet}, Hadiahmu diganti dengan 2 potion${mknp > 0 ? ` Dan ${mknp} Makanan Pet` : ''}`, m);
                    } else if (_pet === 'kuda' && userpet["kuda"] === 0) {
                        global.zv.set("kuda", 1, m.sender, "pet")
                        global.zv.set("makananpet", global.zv.get("makananpet", m.sender, "pet") + 2, m.sender, "pet")
                        crateReward["kuda"] = (crateReward["kuda"] || 0) + 1;
                        crateReward["makananpet"] = (crateReward["makananpet"] || 0) + mknp;
                        zev.reply(m.chat, `*Selamat Anda mendapatkan pet ${_pet}${mknp > 0 ? ` Dan ${mknp} Makanan Pet*` : '*'}`, m);
                    } else {
                        global.zv.set("makananpet", global.zv.get("makananpet", m.sender, "pet") + 2, m.sender, "pet")
                        zev.reply(m.chat, pickRandom(['Anda kurang beruntung', 'Coba buka lagi lain kali, karena gk dapet pet', 'kasian gk dapet pet', 'Mungkin lagi gk hoki dan gk dapet pet', 'wkwkkwkwke']) + '. Anda hanya mendapatkan *' + mknp + '* makanan pet', m)
                    }
                } else zev.reply(m.chat, 'Pet Crate kamu tidak cukup', m)
            }
            zev.reply(m.chat, `Kamu membuka *${count}* ${type} crate dan mendapatkan:\n${Object.keys(crateReward).map(reward => `*${reward}:* ${crateReward[reward]}`).join('\n')}`, m);
        }
    } else {
        if (user[type] < count) {
            return zev.reply(m.chat, `Kamu tidak punya cukup *${type}* crate, kamu hanya punya ${user[type]} crate`, m)
        }
        
        let crateReward = {};
        for (let i = 0; i < count; i++) {
            for (let [reward, valueDatabase] of Object.entries(rewards[type])) {
                const [value, database] = valueDatabase.split(',');
                const newValue = (global.zv.get(reward, m.sender, database) || 0) + parseInt(value);
                global.zv.set(reward, newValue, m.sender, database);
                crateReward[reward] = (crateReward[reward] || 0) + parseInt(value);
            }
        }
        zev.reply(m.chat, `Kamu membuka *${count}* ${type} crate dan mendapatkan:\n${Object.keys(crateReward).map(reward => `*${reward}:* ${crateReward[reward]}`).join('\n')}`, m);
        global.zv.set(type, user[type] - count, m.sender, "crate");
    }
}
},{
	name: "shed",
	tags: "rpg",
	detaills: { desc: "cek crate mu" },
	code: async (zev, m) => {
 let hsl = `
*《 SHED MU 》*
 *📦 = [ ${global.zv.get("common", m.sender, "tanam")} ]* Common
 *🎁 = [ ${global.zv.get("uncommon", m.sender, "tanam")} ]* Uncommon
 *🌟 = [ ${global.zv.get("rare", m.sender, "tanam")} ]* Rare
 *🏆 = [ ${global.zv.get("legendary", m.sender, "tanam")} ]* Legendary
 *🦄 = [ ${global.zv.get("mythical", m.sender, "tanam")} ]* Mythical
 *🔱 = [ ${global.zv.get("artefact", m.sender, "tanam")} ]* Artefact
`.trim()
zev.reply(m.chat, hsl, m)
}
}]