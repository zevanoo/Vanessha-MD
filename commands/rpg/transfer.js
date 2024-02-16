module.exports = [{
    name: "transfer",
    aliases: ["tf"],
    tags: "rpg",
    details: { desc: "Transfer resources to another user.", usage: "tf [type] [count] [target]" },
    code: async (zev, m, { args }) => {
        const [type, count, target] = args;

        if(!type || !count || !target) {
            return zev.reply(m.chat, "Format yang benar: tf [type] [count] [target]", m);
        }

        const amount = parseInt(count);
        if(isNaN(amount) || amount <= 0) {
            return zev.reply(m.chat, "Jumlah harus berupa angka positif.", m);
        }

        const validTypes = ["diamond", "money", "limit", "potion"]
        if(!validTypes.includes(type.toLowerCase())) {
            return zev.reply(m.chat, "Tipe yang valid adalah: \n" + validTypes.join(" "), m);
        }
        
        const findDBitems = global.zv.find(type.toLowerCase(), m.sender)

        const userData = global.zv.get(type.toLowerCase(), m.sender, findDBitems)
        if(userData < amount) {
            return zev.reply(m.chat, `Kamu tidak memiliki cukup ${type} untuk ditransfer.`, m);
        }
        
        let targetUser = null;
        if (target.startsWith("@")) {
            targetUser = zev.onWhatsApp(target.slice(1))[0]
        } else if (/^\d+$/.test(target)) {
            targetUser = zev.onWhatsApp(target)[0]
        }
        if (!targetUser.exists) {
            return zev.reply(m.chat, "Target tidak valid. Pastikan target adalah pengguna valid.", m)
        }

        let targetDB = global.zv.get(type.toLowerCase(), targetUser.jid, findDBitems)
        if (!targetDB) {
            return zev.reply(m.chat, "Database pengguna target tidak ditemukan.", m)
        }
       
       global.zv.set(type.toLowerCase(), userData - amount, m.sender, findDBitems);
       global.zv.set(type.toLowerCase(), targetDB + amount, targetUser.jid, findDBitems);
        
        zev.reply(m.chat, `Berhasil mentransfer ${amount} ${type} ke ${await zev.getName(targetUser.jid)}.`, m)
        zev.reply(targetUser.jid, `Kamu menerima ${amount} ${type} dari ${await zev.getName(m.sender)}.`);
    }
}];
