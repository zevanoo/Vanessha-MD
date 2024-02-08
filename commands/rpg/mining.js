module.exports = [{
	name: "mining",
	tags: "rpg",
	details: { desc: "mining di goa" },
	code: async (zev, m, { pickRandom, clockString, prefix }) => {
	let pickaxe = global.zv.get("pickaxe", m.sender, "mining")
    let __waktur = (new Date - global.zv.get("miningTimeout", m.sender, "mining"))
    let _waktur = (600000 - __waktur)
    let waktur = clockString(_waktur)
    let diamond = (pickaxe == 1 ? Math.floor(Math.random() * 8) : '' || pickaxe == 2 ? Math.floor(Math.random() * 13) : '' || pickaxe == 3 ? Math.floor(Math.random() * 17) : '' || pickaxe == 4 ? Math.floor(Math.random() * 20) : '' || pickaxe == 5 ? Math.floor(Math.random() * 25) : '' );
    let iron = (pickaxe == 1 ? Math.floor(Math.random() * 23) : '' || pickaxe == 2 ? Math.floor(Math.random() * 29) : '' || pickaxe == 3 ? Math.floor(Math.random() * 36) : '' || pickaxe == 4 ? Math.floor(Math.random() * 41) : '' || pickaxe == 5 ? Math.floor(Math.random() * 49) : '' );
    let gold = (pickaxe == 1 ? Math.floor(Math.random() * 10) : '' || pickaxe == 2 ? Math.floor(Math.random() * 16) : '' || pickaxe == 3 ? Math.floor(Math.random() * 23) : '' || pickaxe == 4 ? Math.floor(Math.random() * 27) : '' || pickaxe == 5 ? Math.floor(Math.random() * 32) : '' );
    let stone = (pickaxe == 1 ? Math.floor(Math.random() * 30) : '' || pickaxe == 2 ? Math.floor(Math.random() * 38) : '' || pickaxe == 3 ? Math.floor(Math.random() * 43) : '' || pickaxe == 4 ? Math.floor(Math.random() * 50) : '' || pickaxe == 5 ? Math.floor(Math.random() * 61) : '' );
    let titanium = (pickaxe == 1 ? Math.floor(Math.random() * 18) : '' || pickaxe == 2 ? Math.floor(Math.random() * 24) : '' || pickaxe == 3 ? Math.floor(Math.random() * 30) : '' || pickaxe == 4 ? Math.floor(Math.random() * 36) : '' || pickaxe == 5 ? Math.floor(Math.random() * 42) : '' );
    let uranium = (pickaxe == 1 ? Math.floor(Math.random() * 20) : '' || pickaxe == 2 ? Math.floor(Math.random() * 26) : '' || pickaxe == 3 ? Math.floor(Math.random() * 32) : '' || pickaxe == 4 ? Math.floor(Math.random() * 38) : '' || pickaxe == 5 ? Math.floor(Math.random() * 44) : '' );
    let aluminium = (pickaxe == 1 ? Math.floor(Math.random() * 26) : '' || pickaxe == 2 ? Math.floor(Math.random() * 32) : '' || pickaxe == 3 ? Math.floor(Math.random() * 37) : '' || pickaxe == 4 ? Math.floor(Math.random() * 41) : '' || pickaxe == 5 ? Math.floor(Math.random() * 50) : '' );
    let konz = Math.floor(Math.random() * 100)
    let goa = (pickRandom(['Akhirnya', 'Ketemu!', 'Goanya besar Juga', 'Dalem nih', 'Akhirnya ketemu juga!', 'Ketemu Juga', 'Banyak Batu!', 'Kayaknya Goanya Bagus']))
    let selesai = (pickRandom(['huuh', 'Selesai Juga', 'Kayaknya Sampah', 'Kayaknya Bagus', 'Perlu Upgrade pickaxe nih biar hasilnya bagus', 'Trash!', 'GG']))
            
    if (pickaxe > 0) {
    if (global.zv.get("pickaxeDurability", m.sender, "mining") > 99) {
    if (new Date - global.zv.get("miningTimeout", m.sender, "mining") > 600000) {

          setTimeout(() => {
          	m.reply(`${selesai}
Akhirnya Kamu Mendapatkan :
💎 ${diamond} Diamond
⛓️ ${iron} Iron
🗿 ${stone} Batu
🔶 ${gold} Gold
🔩 ${titanium} Titanium
☢️ ${uranium} Uranium
🔧 ${aluminium} Aluminium
`)
global.zv.set("pickaxeDurability", (global.zv.get("pickaxeDurability", m.sender, "mining") - konz * 1), m.sender, "mining")
global.zv.set("diamond", global.zv.get("diamond", m.sender, "mining") + diamond, m.sender, "mining")
global.zv.set("iron", global.zv.get("iron", m.sender, "mining") + iron, m.sender, "mining")
global.zv.set("miningTimeout", (new Date * 1), m.sender, "mining")
global.zv.set("gold", global.zv.get("gold", m.sender, "mining") + gold, m.sender, "mining")
global.zv.set("stone", global.zv.get("stone", m.sender, "mining") + stone, m.sender, "mining")
global.zv.set("titanium", global.zv.get("titanium", m.sender, "mining") + titanium, m.sender, "mining")
global.zv.set("uranium", global.zv.get("uranium", m.sender, "mining") + uranium, m.sender, "mining")
global.zv.set("aluminium", global.zv.get("aluminium", m.sender, "mining") + aluminium, m.sender, "mining")
          }, 30000)
                     setTimeout(() => {
                     m.reply(`${goa}`)
                     }, 10000) 

                     setTimeout(() => {
                     m.reply('_Sedang Mencari Goa..._')
                     }, 0) 
                     
            } else m.reply(`Anda kelelahan dan Mager untuk mining, Silahkan tunggu ${waktur} lagi untuk mining!!`)
         } else m.reply(`Pickaxe kamu akan hancur segera repair!`)
     } else m.reply(`Kamu Belum Mempunyai Pickaxe, Segera beli ke ${prefix}shop !!`)
}
},{
	name: "box",
	tags: "rpg",
	details: { desc: "cek box hasil mining" },
	code: async (zev, m) => {
 let hsl = `
*《 BOX MU 》*
 *💎 = [ ${global.zv.get("diamond", m.sender, "mining")} ]* Diamond
 *⛓️ = [ ${global.zv.get("iron", m.sender, "mining")} ]* Iron
 *🗿 = [ ${global.zv.get("stone", m.sender, "mining")} ]* Batu
 *🔶 = [ ${global.zv.get("gold", m.sender, "mining")} ]* Gold
 *🔩 = [ ${global.zv.get("titanium", m.sender, "mining")} ]* Titanium
 *☢️ = [ ${global.zv.get("uranium", m.sender, "mining")} ]* Uranium
 *🔧 = [ ${global.zv.get("aluminium", m.sender, "mining")} ]* Aluminium
`.trim()
zev.reply(m.chat, hsl, m)
}
}]