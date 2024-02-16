module.exports = [{
	name: "addprem",
	tags: "owner",
	details: { desc: "add premium user", usage: "addprem (id) (time) (join count)" },
	code: async (zev, m, { args, isOwner, isPrems, formatDate }) => {
		if(!args) return zev.reply(m.chat, "Masukkan id user dan waktunya serta jumlah berapa user bisa memasukkan bot ke group", m)
		let id = args[0]
		if(!id) return zev.reply(m.chat, "Masukkan Nomor Yang akan dipremiumkan", m)
		let numberUser = id + "@s.whatsapp.net"
		let timeToAdd = args[1]
		if(!timeToAdd) return zev.reply(m.chat, "Masukkan jumlah hari", m)
		if(isNaN(timeToAdd)) return zev.reply(m.chat, "Hanya Angka", m)
		let joinCount = args[2]
		if(!joinCount) return zev.reply(m.chat, "masukkan jumlah berapa user bisa memasukkan bot ke group", m)
		let userPremiumTime = global.zv.get("premiumTimestamp", numberUser, "user")
        let jumlahHari = 86400000 * timeToAdd
        let now = Date.now() * 1
        if (now < userPremiumTime) global.zv.set("premiumTimestamp", userPremiumTime + jumlahHari, numberUser, "user")
        else global.zv.set("premiumTimestamp", now + jumlahHari, numberUser, "user")
        global.zv.set("premium", true, numberUser, "user")
        global.zv.set("joinCount", joinCount, numberUser, "user")
        zev.reply(m.chat, `Success Add Premium\nName: *${global.zv.get("name", numberUser, "user")}*\nDate Stop: ${formatDate(global.zv.get("premiumTimestamp", numberUser, "user"))}`, m)
        zev.reply(numberUser, `Kamu telah menjadi premium di bot ini\nTanggal Berhenti: ${formatDate(global.zv.get("premiumTimestamp", numberUser, "user"))}`)
    },
    isOwner: true
}]