let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i

module.exports = [{
	name: "join",
	tags: "group",
	details: { desc: "join groups", usage: "join (url) (jumlah hari)" },
	code: async (zev, m, { text, args, prefix, isOwner, util, formatDate  }) => {
		let joinCount = global.zv.get("joinCount", m.sender, "user")
		if(joinCount > 1 || isOwner) {
		let [_, code] = text.match(linkRegex) || []
		if(!args[0]) return zev.reply(m.chat, `Link nya mana?`, m)
        if(!code) return zev.reply(m.chat, `Link tidak valid!`, m)
        if(!args[1]) return zev.reply(m.chat, `Angkanya mana?`, m)
        if(isNaN(args[1])) return zev.reply(m.chat, `Hanya angka, mewakili hari!`, m)
        if(args[1] > 10 && !isOwner) return zev.reply(m.chat, `Angka tidak boleh lebih dari 10 hari`, m)
        let jumlahHari = 86400000 * args[1]
        try {
        let res = await zev.groupAcceptInvite(code)
        let data = await zev.groupMetadata(res)
        global.zv.variables({
        	id: data.id,
            time: 0
        }, "group")
        let sisaHari = global.zv.get("time", data.id, "group")
        let now = Date.now()
        if(now < sisaHari) {
        	global.zv.set("time", sisaHari + jumlahHari, data.id, "group")
        } else {
        	global.zv.set("time", now + jumlahHari, data.id, "group")
        }
        global.zv.set("joinCount", joinCount - 1, m.sender, "user")
        zev.reply(m.chat, `Sukses invite bot ${global.botname} ke group ${data.subject} dan bot akan otomatis keluar pada waktu:\n${formatDate(global.zv.get("time", data.id, "group"))}`, m)
        zev.reply(data.id, `Hai Semuanya aku ${global.botname}, aku adalah bot yang dibuat untuk menghibur kalian semua\nketik .menu untuk melihat list command`)
        } catch (e) {
            m.reply(util.format(e))
        	zev.reply(m.chat, "Maaf, bot tidak dapat bergabung ke group tersebut karena telah di kick", m)
        }
       } else zev.reply(m.chat, `Join count kamu 0, beli premium dulu`, m)
	},
	isPremium: true,
	wait: true,
	isPrivate: true
}]