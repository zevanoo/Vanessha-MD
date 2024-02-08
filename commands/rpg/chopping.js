module.exports = [{
	name: "chop",
	tags: "rpg",
	details: { desc: "chop hutan" },
	code: async (zev, m, { pickRandom, clockString }) => {
		let axe = global.zv.get("axe", m.sender, "chop")
		let __timer = (new Date - global.zv.get("chopTimeout", m.sender, "chop"))
    let _timer = (500000 - __timer)
    let timer = clockString(_timer) 
    let pohon = (axe == 1 ? Math.floor(Math.random() * 10) : '' || axe == 2 ? Math.floor(Math.random() * 16) : '' || axe == 3 ? Math.floor(Math.random() * 23) : '' || axe == 4 ? Math.floor(Math.random() * 27) : '' || axe == 5 ? Math.floor(Math.random() * 32) : '' );
    let beringin = (axe == 1 ? Math.floor(Math.random() * 10) : '' || axe == 2 ? Math.floor(Math.random() * 16) : '' || axe == 3 ? Math.floor(Math.random() * 23) : '' || axe == 4 ? Math.floor(Math.random() * 27) : '' || axe == 5 ? Math.floor(Math.random() * 32) : '' );
    let bambu = (axe == 1 ? Math.floor(Math.random() * 10) : '' || axe == 2 ? Math.floor(Math.random() * 16) : '' || axe == 3 ? Math.floor(Math.random() * 23) : '' || axe == 4 ? Math.floor(Math.random() * 27) : '' || axe == 5 ? Math.floor(Math.random() * 32) : '' );
    let kayu = (axe == 1 ? Math.floor(Math.random() * 10) : '' || axe == 2 ? Math.floor(Math.random() * 16) : '' || axe == 3 ? Math.floor(Math.random() * 23) : '' || axe == 4 ? Math.floor(Math.random() * 27) : '' || axe == 5 ? Math.floor(Math.random() * 32) : '' );
    let rotan = (axe == 1 ? Math.floor(Math.random() * 10) : '' || axe == 2 ? Math.floor(Math.random() * 16) : '' || axe == 3 ? Math.floor(Math.random() * 23) : '' || axe == 4 ? Math.floor(Math.random() * 27) : '' || axe == 5 ? Math.floor(Math.random() * 32) : '' );
    let palem = (axe == 1 ? Math.floor(Math.random() * 10) : '' || axe == 2 ? Math.floor(Math.random() * 16) : '' || axe == 3 ? Math.floor(Math.random() * 23) : '' || axe == 4 ? Math.floor(Math.random() * 27) : '' || axe == 5 ? Math.floor(Math.random() * 32) : '' );
    let durabilityAxe = Math.floor(Math.random() * 100)
	if (axe > 0) {
	if (global.zv.get("axeDurability", m.sender, "chop") > 99) {
    if (new Date - global.zv.get("chopTimeout", m.sender, "chop") > 500000) {
let perfect = (pickRandom(['Anjir GG', 'Mantap', 'Sempurna', 'Besar Nih']))

let hsl = `
*《 Hasil Menchop Kali Ini 》*
 *🌲 = [ ${pohon} ]*			*🪵 = [ ${kayu} ]*
 *🌳 = [ ${beringin} ]*			 *🎍 = [ ${rotan} ]*
 *🎋 = [ ${bambu} ]*			 *🌴 = [ ${palem} ]*
`.trim()

setTimeout(() => {
                     m.reply(`${hsl}`)
global.zv.set("axeDurability", global.zv.get("axeDurability", m.sender, "chop") - durabilityAxe, m.sender, "chop")
global.zv.set("chopTimeout", (new Date * 1), m.sender, "chop")
global.zv.set("pohon", global.zv.get("pohon", m.sender, "chop") + pohon, m.sender, "chop")
global.zv.set("beringin", global.zv.get("beringin", m.sender, "chop") + beringin, m.sender, "chop")
global.zv.set("bambu", global.zv.get("bambu", m.sender, "chop") + bambu, m.sender, "chop")
global.zv.set("kayu", global.zv.get("kayu", m.sender, "chop") + kayu, m.sender, "chop")
global.zv.set("rotan", global.zv.get("rotan", m.sender, "chop") + rotan, m.sender, "chop")
global.zv.set("palem", global.zv.get("palem", m.sender, "chop") + palem, m.sender, "chop")
                     }, 20000) 

                     setTimeout(() => {
                     m.reply(`${perfect}`)
                      }, 18000)

                     setTimeout(() => {
                     m.reply('sweep')
                     }, 15000) 

                     setTimeout(() => {
                     m.reply('menunggu')
                     }, 14000) 

                     setTimeout(() => {
                     m.reply('_Sedang Menchop..._')
                     }, 0) 
        } else zev.reply(m.chat, `*Sepertinya Anda Sudah Kecapekan*\n*Silahkan Istirahat Sejenak Sekitar ${timer}*\n*Untuk Bisa Melanjutkan chop Lagi*`, m)
     } else zev.reply(m.chat, 'Repair axe dulu dah mau patah', m)
   } else zev.reply(m.chat, 'beli axe dulu di .shop', m)
}
},{
	name: "gudang",
	tags: "rpg",
	details: { desc: "cek kayu hasil chop" },
	code: async (zev, m) => {
let hsl = `
*《 GUDANG MU 》*
 *🌲 = [ ${global.zv.get("pohon", m.sender, "chop")} ]* Pohon
 *🌳 = [ ${global.zv.get("beringin", m.sender, "chop")} ]* Beringin
 *🎋 = [ ${global.zv.get("bambu", m.sender, "chop")} ]* Bambu
 *🪵 = [ ${global.zv.get("kayu", m.sender, "chop")} ]* Kayu
 *🎍 = [ ${global.zv.get("rotan", m.sender, "chop")} ]* Rotan
 *🌴 = [ ${global.zv.get("palem", m.sender, "chop")} ]* Palem
`.trim()
zev.reply(m.chat, hsl, m)
}
}]