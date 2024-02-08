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
};

let crateList = Object.keys(rewards).join(', ')
    let user = global.zv.getDataUser(m.sender, "crate")
    const type = (args[0] || '').toLowerCase();
    const count = Math.floor(isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 1), Number.MAX_SAFE_INTEGER) : 1) * 1;

    if (!(type in rewards)) {
        return m.reply(`Crate ${type} tidak ditemukan, crate yang tersedia:\n${crateList}`);
    }    

    if (user[type] < count) {
        return m.reply(`Kamu tidak punya cukup *${type}* crate, kamu hanya punya ${user[type]} crate`);
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
    m.reply(`Kamu membuka *${count}* ${type} crate dan mendapatkan:\n${Object.keys(crateReward).map(reward => `*${reward}:* ${crateReward[reward]}`).join('\n')}`);
    global.zv.set(type, user[type] - count, m.sender, "crate");
}
}]