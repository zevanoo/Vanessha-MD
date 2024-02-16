module.exports = [{
	name: "hunting",
	tags: "rpg",
	details: { desc: "hunting hewan darat" },
	code: async (zev, m, { pickRandom, clockString }) => {
		let sword = global.zv.get("sword", m.sender, "hunting")
		let __timer = (new Date - global.zv.get("huntingTimeout", m.sender, "hunting"))
    let _timer = (500000 - __timer)
    let timer = clockString(_timer) 
    let panda = (sword == 1 ? Math.floor(Math.random() * 10) : '' || sword == 2 ? Math.floor(Math.random() * 16) : '' || sword == 3 ? Math.floor(Math.random() * 23) : '' || sword == 4 ? Math.floor(Math.random() * 27) : '' || sword == 5 ? Math.floor(Math.random() * 32) : '' );
    let kerbau = (sword == 1 ? Math.floor(Math.random() * 10) : '' || sword == 2 ? Math.floor(Math.random() * 16) : '' || sword == 3 ? Math.floor(Math.random() * 23) : '' || sword == 4 ? Math.floor(Math.random() * 27) : '' || sword == 5 ? Math.floor(Math.random() * 32) : '' );
    let monyet = (sword == 1 ? Math.floor(Math.random() * 10) : '' || sword == 2 ? Math.floor(Math.random() * 16) : '' || sword == 3 ? Math.floor(Math.random() * 23) : '' || sword == 4 ? Math.floor(Math.random() * 27) : '' || sword == 5 ? Math.floor(Math.random() * 32) : '' );
    let ayam = (sword == 1 ? Math.floor(Math.random() * 10) : '' || sword == 2 ? Math.floor(Math.random() * 16) : '' || sword == 3 ? Math.floor(Math.random() * 23) : '' || sword == 4 ? Math.floor(Math.random() * 27) : '' || sword == 5 ? Math.floor(Math.random() * 32) : '' );
    let bebek = (sword == 1 ? Math.floor(Math.random() * 10) : '' || sword == 2 ? Math.floor(Math.random() * 16) : '' || sword == 3 ? Math.floor(Math.random() * 23) : '' || sword == 4 ? Math.floor(Math.random() * 27) : '' || sword == 5 ? Math.floor(Math.random() * 32) : '' );
    let sapi = (sword == 1 ? Math.floor(Math.random() * 10) : '' || sword == 2 ? Math.floor(Math.random() * 16) : '' || sword == 3 ? Math.floor(Math.random() * 23) : '' || sword == 4 ? Math.floor(Math.random() * 27) : '' || sword == 5 ? Math.floor(Math.random() * 32) : '' );
    let babi = (sword == 1 ? Math.floor(Math.random() * 10) : '' || sword == 2 ? Math.floor(Math.random() * 16) : '' || sword == 3 ? Math.floor(Math.random() * 23) : '' || sword == 4 ? Math.floor(Math.random() * 27) : '' || sword == 5 ? Math.floor(Math.random() * 32) : '' );
    let kambing = (sword == 1 ? Math.floor(Math.random() * 10) : '' || sword == 2 ? Math.floor(Math.random() * 16) : '' || sword == 3 ? Math.floor(Math.random() * 23) : '' || sword == 4 ? Math.floor(Math.random() * 27) : '' || sword == 5 ? Math.floor(Math.random() * 32) : '' );
    let durabilitySword = Math.floor(Math.random() * 100)
	if (sword > 0) {
	if (global.zv.get("swordDurability", m.sender, "hunting") > 99) {
    if (new Date - global.zv.get("huntingTimeout", m.sender, "hunting") > 500000) {
let perfect = (pickRandom(['Anjir GG', 'Mantap', 'Sempurna', 'Besar Nih']))

let hsl = `
*《 Hasil Menhunting Kali Ini 》*
 *🐼 = [ ${panda} ]*			*🐃 = [ ${kerbau} ]*
 *🐒 = [ ${monyet} ]*			 *🐔 = [ ${ayam} ]*
 *🦆 = [ ${bebek} ]*			 *🐄 = [ ${sapi} ]*
 *🐖 = [ ${babi} ]*			 *🐐 = [ ${kambing} ]*
`.trim()

setTimeout(() => {
                     zev.reply(m.chat, `${hsl}`, m)
global.zv.set("swordDurability", global.zv.get("swordDurability", m.sender, "hunting") - durabilitySword, m.sender, "hunting")
global.zv.set("huntingTimeout", (new Date * 1), m.sender, "hunting")
global.zv.set("panda", global.zv.get("panda", m.sender, "hunting") + panda, m.sender, "hunting")
global.zv.set("kerbau", global.zv.get("kerbau", m.sender, "hunting") + kerbau, m.sender, "hunting")
global.zv.set("monyet", global.zv.get("monyet", m.sender, "hunting") + monyet, m.sender, "hunting")
global.zv.set("ayam", global.zv.get("ayam", m.sender, "hunting") + ayam, m.sender, "hunting")
global.zv.set("bebek", global.zv.get("bebek", m.sender, "hunting") + bebek, m.sender, "hunting")
global.zv.set("sapi", global.zv.get("sapi", m.sender, "hunting") + sapi, m.sender, "hunting")
global.zv.set("babi", global.zv.get("babi", m.sender, "hunting") + babi, m.sender, "hunting")
global.zv.set("kambing", global.zv.get("kambing", m.sender, "hunting") + kambing, m.sender, "hunting")
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
                     m.reply('_Sedang Menhunting..._')
                     }, 0) 
        } else zev.reply(m.chat, `*Sepertinya Anda Sudah Kecapekan*\n*Silahkan Istirahat Sejenak Sekitar ${timer}*\n*Untuk Bisa Melanjutkan hunting Lagi*`, m)
     } else zev.reply(m.chat, 'Repair sword dulu dah mau patah', m)
   } else zev.reply(m.chat, 'beli sword dulu di .shop', m)
}
},{
	name: "kandang",
	tags: "rpg",
	details: { desc: "cek hewan hasil hunting" },
	code: async (zev, m) => {
let hsl = `
*《 KANDANG MU 》*
 *🐼 = [ ${global.zv.get("panda", m.sender, "hunting")} ]* Ekor Panda
 *🐃 = [ ${global.zv.get("kerbau", m.sender, "hunting")} ]* Ekor Kerbau
 *🐒 = [ ${global.zv.get("monyet", m.sender, "hunting")} ]* Ekor Monyet
 *🐔 = [ ${global.zv.get("ayam", m.sender, "hunting")} ]* Ekor Ayam
 *🦆 = [ ${global.zv.get("bebek", m.sender, "hunting")} ]* Ekor Bebek
 *🐄 = [ ${global.zv.get("sapi", m.sender, "hunting")} ]* Ekor Sapi
 *🐖 = [ ${global.zv.get("babi", m.sender, "hunting")} ]* Ekor Babi
 *🐐 = [ ${global.zv.get("kambing", m.sender, "hunting")} ]* Ekor Kambing
`.trim()
zev.reply(m.chat, hsl, m)
}
}]