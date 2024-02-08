module.exports = [{
	name: "addprem",
	tags: "owner",
	details: { desc: "add premium user", usage: "addprem (id) (time)" },
	code: async (zev, m, { args, isOwner, isPrems, formatDate }) => {
		if(!args) return zev.reply(m.chat, "Masukkan id user dan waktunya", m)
		let id = args[0]
		if(!id) return zev.reply(m.chat, "Masukkan Nomor Yang akan dipremiumkan", m)
		let numberUser = id + "@s.whatsapp.net"
		let timeToAdd = args[1]
		if(!timeToAdd) return zev.reply(m.chat, "Masukkan jumlah hari", m)
		if(isNaN(timeToAdd)) return zev.reply(m.chat, "Hanya Angka", m)
		let userPremiumTime = global.zv.get("premiumTimestamp", numberUser, "user")
        let jumlahHari = 86400000 * timeToAdd
        let now = Date.now() * 1
        if (now < userPremiumTime) global.zv.set("premiumTimestamp", userPremiumTime + jumlahHari, numberUser, "user")
        else global.zv.set("premiumTimestamp", now + jumlahHari, numberUser, "user")
        global.zv.set("premium", true, numberUser, "user")
        zev.reply(m.chat, `Success Add Premium\nName: *${global.zv.get("name", numberUser, "user")}*\nDate Stop: ${formatDate(global.zv.get("premiumTimestamp", numberUser, "user"))}`, m)
        zev.reply(id + "@s.whatsapp.net", `Kamu telah menjadi premium di bot ini\nTanggal Berhenti: ${formatDate(global.zv.get("premiumTimestamp", numberUser, "user"))}`)
    },
    isOwner: true
}]