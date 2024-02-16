module.exports = [{
	name: "tanam",
	tags: "rpg",
	details: { desc: "menanam buah buahan" },
	code: async (zev, m, { clockString, prefix }) => {
		
	let __waktur = (new Date - global.zv.get("tanamTimeout", m.sender, "tanam"))
    let _waktur = (600000 - __waktur)
    let waktur = clockString(_waktur)
    
    let bibitApel = global.zv.get("bibitApel", m.sender, "tanam")
    let bibitMangga = global.zv.get("bibitMangga", m.sender, "tanam")
    let bibitPisang = global.zv.get("bibitPisang", m.sender, "tanam")
    let bibitWortel = global.zv.get("bibitWortel", m.sender, "tanam")
    let bibitJagung = global.zv.get("bibitJagung", m.sender, "tanam")
    let bibitSemangka = global.zv.get("bibitSemangka", m.sender, "tanam")
    let bibitTimun = global.zv.get("bibitTimun", m.sender, "tanam")
    let bibitTomat = global.zv.get("bibitTomat", m.sender, "tanam")
    let bibitStroberi = global.zv.get("bibitStroberi", m.sender, "tanam")
    let bibitBlueberi = global.zv.get("bibitBlueberi", m.sender, "tanam")
    
    if(bibitApel < 100) return zev.reply(m.chat, `bibit *apel* mu harus lebih dari 100, beli dulu di ${prefix}shop`, m)
    if(bibitMangga < 100) return zev.reply(m.chat, `bibit *mangga* mu harus lebih dari 100, beli dulu di ${prefix}shop`, m)
    if(bibitPisang < 100) return zev.reply(m.chat, `bibit *pisang* mu harus lebih dari 100, beli dulu di ${prefix}shop`, m)
    if(bibitWortel < 100) return zev.reply(m.chat, `bibit *wortel* mu harus lebih dari 100, beli dulu di ${prefix}shop`, m)
    if(bibitJagung < 100) return zev.reply(m.chat, `bibit *jagung* mu harus lebih dari 100, beli dulu di ${prefix}shop`, m)
    if(bibitSemangka < 100) return zev.reply(m.chat, `bibit *semangka* mu harus lebih dari 100, beli dulu di ${prefix}shop`, m)
    if(bibitTimun < 100) return zev.reply(m.chat, `bibit *timun* mu harus lebih dari 100, beli dulu di ${prefix}shop`, m)
    if(bibitTomat < 100) return zev.reply(m.chat, `bibit *tomat* mu harus lebih dari 100, beli dulu di ${prefix}shop`, m)
    if(bibitStroberi < 100) return zev.reply(m.chat, `bibit *stroberi* mu harus lebih dari 100, beli dulu di ${prefix}shop`, m)
    if(bibitBlueberi < 100) return zev.reply(m.chat, `bibit *blueberi* mu harus lebih dari 100, beli dulu di ${prefix}shop`, m)
    
const tanamPanen = global.zv.get("tanamPanen", m.sender, "tanam");
const tanamTimeout = global.zv.get("tanamTimeout", m.sender, "tanam");

if(!tanamPanen === 0) {
    zev.reply(m.chat, `panen dulu tanamanmu, ketik ${prefix}panen`, m);
} else if (new Date - global.zv.get("tanamTimeout", m.sender, "tanam") > 86400000) {
        global.zv.set("bibitApel", bibitApel - 100, m.sender, "tanam");
        global.zv.set("bibitWortel", bibitWortel - 100, m.sender, "tanam");
        global.zv.set("bibitPisang", bibitPisang - 100, m.sender, "tanam");
        global.zv.set("bibitMangga", bibitMangga - 100, m.sender, "tanam");
        global.zv.set("bibitJagung", bibitJagung - 100, m.sender, "tanam");
        global.zv.set("bibitSemangka", bibitSemangka - 100, m.sender, "tanam");
        global.zv.set("bibitTimun", bibitTimun - 100, m.sender, "tanam");
        global.zv.set("bibitTomat", bibitTomat - 100, m.sender, "tanam");
        global.zv.set("bibitStroberi", bibitStroberi - 100, m.sender, "tanam");
        global.zv.set("bibitBlueberi", bibitBlueberi - 100, m.sender, "tanam");
        global.zv.set("tanamTimeout", (new Date * 1), m.sender, "tanam");
        
        setTimeout(() => {
            zev.reply(m.sender, `Tanaman yang kamu tanam sudah siap panen, ketik ${prefix}panen untuk memanen tanamanmu`, m);
        }, 300000);

        setTimeout(() => {
            zev.reply(m.chat, 'Ditinggalkan, kamu akan diberitahu di private chat bahwa tanaman sudah siap panen', m)
            global.zv.set("tanamPanen", Date.now() + 300000, m.sender, "tanam");
        }, 12000);

        setTimeout(() => {
            m.reply('Menyiram');
        }, 9000);

        setTimeout(() => {
            m.reply('_Sedang menanam..._');
        }, 0);
    } else {
        zev.reply(m.chat, `*Sepertinya Anda Sudah Kecapekan*\n*Silahkan Istirahat Sejenak Sekitar ${waktur}*\n*Untuk Bisa Melanjutkan Menanam Lagi*`, m);
    }
}
},{
	name: "panen",
	tags: "rpg",
	details: { desc: "memanen buah buahan" },
	code: async (zev, m, { clockString }) => {
		const tanamPanen = global.zv.get("tanamPanen", m.sender, "tanam");
		let __timer = (new Date - tanamPanen);
    let _timer = (300000 - __timer);
    let timer = clockString(_timer);
    let now = Date.now()

if(tanamPanen === 0) {
	zev.reply(m.chat ,"kamu ngga nanem apa apa", m)
} else if (now > tanamPanen) {
    let apel = Math.floor(Math.random() * 100);
    let wortel = Math.floor(Math.random() * 100);
    let pisang = Math.floor(Math.random() * 100);
    let mangga = Math.floor(Math.random() * 100);
    let jagung = Math.floor(Math.random() * 100);
    let semangka = Math.floor(Math.random() * 100);
    let timun = Math.floor(Math.random() * 100);
    let tomat = Math.floor(Math.random() * 100);
    let stroberi = Math.floor(Math.random() * 100);
    let blueberi = Math.floor(Math.random() * 100);

    let hsl = `
    *《 Hasil Menanam Kali Ini 》*
     *🍎 = [ ${apel} ]*			*🥕 = [ ${wortel} ]*
     *🍌 = [ ${pisang} ]*			 *🥭 = [ ${mangga} ]*
     *🌽 = [ ${jagung} ]*			 *🍉 = [ ${semangka} ]*
     *🥒 = [ ${timun} ]*			 *🍅 = [ ${tomat} ]*
     *🍓 = [ ${stroberi} ]*			 *🫐 = [ ${blueberi} ]*
    `.trim();

    zev.reply(m.chat, `${hsl}`, m)
    global.zv.set("apel", global.zv.get("apel", m.sender, "tanam") + apel, m.sender, "tanam");
    global.zv.set("wortel", global.zv.get("wortel", m.sender, "tanam") + wortel, m.sender, "tanam");
    global.zv.set("pisang", global.zv.get("pisang", m.sender, "tanam") + pisang, m.sender, "tanam");
    global.zv.set("mangga", global.zv.get("mangga", m.sender, "tanam") + mangga, m.sender, "tanam");
    global.zv.set("jagung", global.zv.get("jagung", m.sender, "tanam") + jagung, m.sender, "tanam");
    global.zv.set("semangka", global.zv.get("semangka", m.sender, "tanam") + semangka, m.sender, "tanam");
    global.zv.set("timun", global.zv.get("timun", m.sender, "tanam") + timun, m.sender, "tanam");
    global.zv.set("tomat", global.zv.get("tomat", m.sender, "tanam") + tomat, m.sender, "tanam");
    global.zv.set("stroberi", global.zv.get("stroberi", m.sender, "tanam") + stroberi, m.sender, "tanam");
    global.zv.set("blueberi", global.zv.get("blueberi", m.sender, "tanam") + blueberi, m.sender, "tanam");

    global.zv.set("tanamPanen", 0, m.sender, "tanam");
} else {
    zev.reply(m.chat, `tanamanmu belum siap panen, tunggu ${timer} agar bisa memanen`, m)
}
}
},{
	name: "lumbung",
	tags: "rpg",
	detaills: { desc: "cek hasil menanam" },
	code: async (zev, m) => {
 let hsl = `
*《 LUMBUNG MU 》*
 *🍎 = [ ${global.zv.get("apel", m.sender, "tanam")} ]* Apel
 *🥕 = [ ${global.zv.get("wortel", m.sender, "tanam")} ]* Wortel
 *🍌 = [ ${global.zv.get("pisang", m.sender, "tanam")} ]* Pisang
 *🥭 = [ ${global.zv.get("mangga", m.sender, "tanam")} ]* Mangga
 *🌽 = [ ${global.zv.get("jagung", m.sender, "tanam")} ]* Jagung
 *🍉 = [ ${global.zv.get("semangka", m.sender, "tanam")} ]* Semangka
 *🥒 = [ ${global.zv.get("timun", m.sender, "tanam")} ]* Timun
 *🍅 = [ ${global.zv.get("tomat", m.sender, "tanam")} ]* Tomato
 *🍓 = [ ${global.zv.get("stroberi", m.sender, "tanam")} ]* Stroberi
 *🫐 = [ ${global.zv.get("blueberri", m.sender, "tanam")} ]* Blueberi
`.trim()
zev.reply(m.chat, hsl, m)
}
}]