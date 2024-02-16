module.exports = [{
	name: "mancing",
	tags: "rpg",
	details: { desc: "mancing hewan air" },
	code: async (zev, m, { pickRandom, clockString }) => {
		let fishingRod = global.zv.get("fishingrod", m.sender, "mancing")
		let __timer = (new Date - global.zv.get("fishingTimeout", m.sender, "mancing"))
    let _timer = (500000 - __timer)
    let timer = clockString(_timer)
    let kepiting = (fishingRod == 1 ? Math.floor(Math.random() * 10) : '' || fishingRod == 2 ? Math.floor(Math.random() * 16) : '' || fishingRod == 3 ? Math.floor(Math.random() * 23) : '' || fishingRod == 4 ? Math.floor(Math.random() * 27) : '' || fishingRod == 5 ? Math.floor(Math.random() * 32) : '' );
    let cumi = (fishingRod == 1 ? Math.floor(Math.random() * 10) : '' || fishingRod == 2 ? Math.floor(Math.random() * 16) : '' || fishingRod == 3 ? Math.floor(Math.random() * 23) : '' || fishingRod == 4 ? Math.floor(Math.random() * 27) : '' || fishingRod == 5 ? Math.floor(Math.random() * 32) : '' );
    let buntal = (fishingRod == 1 ? Math.floor(Math.random() * 10) : '' || fishingRod == 2 ? Math.floor(Math.random() * 16) : '' || fishingRod == 3 ? Math.floor(Math.random() * 23) : '' || fishingRod == 4 ? Math.floor(Math.random() * 27) : '' || fishingRod == 5 ? Math.floor(Math.random() * 32) : '' );
    let dory = (fishingRod == 1 ? Math.floor(Math.random() * 10) : '' || fishingRod == 2 ? Math.floor(Math.random() * 16) : '' || fishingRod == 3 ? Math.floor(Math.random() * 23) : '' || fishingRod == 4 ? Math.floor(Math.random() * 27) : '' || fishingRod == 5 ? Math.floor(Math.random() * 32) : '' );
    let lumba = (fishingRod == 1 ? Math.floor(Math.random() * 10) : '' || fishingRod == 2 ? Math.floor(Math.random() * 16) : '' || fishingRod == 3 ? Math.floor(Math.random() * 23) : '' || fishingRod == 4 ? Math.floor(Math.random() * 27) : '' || fishingRod == 5 ? Math.floor(Math.random() * 32) : '' );
    let lobster = (fishingRod == 1 ? Math.floor(Math.random() * 10) : '' || fishingRod == 2 ? Math.floor(Math.random() * 16) : '' || fishingRod == 3 ? Math.floor(Math.random() * 23) : '' || fishingRod == 4 ? Math.floor(Math.random() * 27) : '' || fishingRod == 5 ? Math.floor(Math.random() * 32) : '' );
    let udang = (fishingRod == 1 ? Math.floor(Math.random() * 10) : '' || fishingRod == 2 ? Math.floor(Math.random() * 16) : '' || fishingRod == 3 ? Math.floor(Math.random() * 23) : '' || fishingRod == 4 ? Math.floor(Math.random() * 27) : '' || fishingRod == 5 ? Math.floor(Math.random() * 32) : '' );
    let ikan = (fishingRod == 1 ? Math.floor(Math.random() * 10) : '' || fishingRod == 2 ? Math.floor(Math.random() * 16) : '' || fishingRod == 3 ? Math.floor(Math.random() * 23) : '' || fishingRod == 4 ? Math.floor(Math.random() * 27) : '' || fishingRod == 5 ? Math.floor(Math.random() * 32) : '' );
    let durabilityFishingRod = Math.floor(Math.random() * 100)
	if (fishingRod > 0) {
	if (global.zv.get("fishingrodDurability", m.sender, "mancing") > 99) {
    if (new Date - global.zv.get("fishingTimeout", m.sender, "mancing") > 500000) {
let perfect = (pickRandom(['Anjir GG', 'Mantap', 'Sempurna', 'Mancing Mania...', 'Besar Nih']))

let hsl = `
*《 Hasil Memancing Kali Ini 》*
 *🦀 = [ ${kepiting} ]*			*🐠 = [ ${dory} ]*
 *🦞 = [ ${lobster} ]*			 *🐟 = [ ${ikan} ]*
 *🦐 = [ ${udang} ]*			 *🐬 = [ ${lumba} ]*
 *🐙 = [ ${cumi} ]*			 *🐡 = [ ${buntal} ]*
`.trim()

setTimeout(() => {
                     zev.reply(m.chat, `${hsl}`, m)
global.zv.set("fishingrodDurability", global.zv.get("fishingrodDurability", m.sender, "mancing") - durabilityFishingRod, m.sender, "mancing")
global.zv.set("fishingTimeout", (new Date * 1), m.sender, "mancing")
global.zv.set("kepiting", global.zv.get("kepiting", m.sender, "mancing") + kepiting, m.sender, "mancing")
global.zv.set("cumi", global.zv.get("cumi", m.sender, "mancing") + cumi, m.sender, "mancing")
global.zv.set("buntal", global.zv.get("buntal", m.sender, "mancing") + buntal, m.sender, "mancing")
global.zv.set("dory", global.zv.get("dory", m.sender, "mancing") + dory, m.sender, "mancing")
global.zv.set("lumba", global.zv.get("lumba", m.sender, "mancing") + lumba, m.sender, "mancing")
global.zv.set("lobster", global.zv.get("lobster", m.sender, "mancing") + lobster, m.sender, "mancing")
global.zv.set("udang", global.zv.get("udang", m.sender, "mancing") + udang, m.sender, "mancing")
global.zv.set("ikan", global.zv.get("ikan", m.sender, "mancing") + ikan, m.sender, "mancing")
                     }, 20000) 

                     setTimeout(() => {
                     m.reply(`${perfect}`)
                      }, 18000)

                     setTimeout(() => {
                     m.reply('strike')
                     }, 15000) 

                     setTimeout(() => {
                     m.reply('menunggu')
                     }, 14000) 

                     setTimeout(() => {
                     m.reply('_Sedang Memancing..._')
                     }, 0) 
        } else zev.reply(m.chat, `*Sepertinya Anda Sudah Kecapekan*\n*Silahkan Istirahat Sejenak Sekitar ${timer}*\n*Untuk Bisa Melanjutkan Memancing Lagi*`, m)
     } else zev.reply(m.chat, 'Repair fishing rod dulu dah mau patah', m)
   } else zev.reply(m.chat, 'beli fishing rod dulu di .shop', m)
}
},{
	name: "kolam",
	tags: "rpg",
	details: { desc: "cek hewan hasil mancing" },
	code: async (zev, m) => {
let hsl = `
*《 KOLAM MU 》*
 *🦀 = [ ${global.zv.get("kepiting", m.sender, "mancing")} ]* Ekor Kepiting
 *🐠 = [ ${global.zv.get("dory", m.sender, "mancing")} ]* Ekor Dory
 *🦞 = [ ${global.zv.get("lobster", m.sender, "mancing")} ]* Ekor Lobster
 *🐟 = [ ${global.zv.get("ikan", m.sender, "mancing")} ]* Ekor Ikan
 *🦐 = [ ${global.zv.get("udang", m.sender, "mancing")} ]* Ekor Udang
 *🐬 = [ ${global.zv.get("lumba", m.sender, "mancing")} ]* Ekor Lumba
 *🐙 = [ ${global.zv.get("cumi", m.sender, "mancing")} ]* Ekor Cumi
 *🐡 = [ ${global.zv.get("buntal", m.sender, "mancing")} ]* Ekor Buntal
`.trim()
zev.reply(m.chat, hsl, m)
}
}]