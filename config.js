const db = require('./lib/localdb')
const colors = require("@colors/colors");
global.zv = db

global.owner = [
["6289520306297", true, true]
]
global.botname = "Vanesshaa-MD" // Nama bot
global.wm = "© Vanesshaa" // wm bot
global.expEarningPerCmd = 23 // exp yang dihasilkan per command
global.multiplier = 40 // semakin tinggi, semakin sulit levelup

global.zv.init('./database', {
	"user": "user.json",
	"mancing": "rpg/mancing.json",
	"mining": "rpg/mining.json",
	"hunting": "rpg/hunt.json",
	"dungeon": "rpg/dungeon.json",
	"tanam": "rpg/tanam.json",
	"crate": "rpg/crates.json",
	"chop": "rpg/chop.json"
}) // Gausah diubah

global.public = false // mode public/self
global.notifyAfterConnect = false // notifikasi dari bot ke owner setiap selesai terhubung
global.readMessage = false // bot membaca pesan?

colors.setTheme({
   main: ['brightBlue', 'bold'],
   info: "cyan",
   warn: "yellow",
   error: "brightRed"
});

global.logs = (text, type) => {
	console.log("Vanessha".main, "-", text[type])
}

global.mess = (zev, type, m) => {
    let msg = {
        owner: `Perintah ini hanya dapat digunakan oleh Owner!`,
        group: `Perintah ini hanya dapat digunakan di group!`,
        private: `Perintah ini hanya dapat digunakan di private chat!`,
        admin: `Perintah ini hanya dapat digunakan oleh admin group!`,
        botAdmin: `Bot bukan admin, tidak dapat mengakses fitur tersebut`,
        bot: `Fitur ini hanya dapat diakses oleh Bot`,
        dead: `Fitur ini sedang dimatikan!`,
        media: `Reply media nya`,
        invalidUrl: `Url nya Invalid`,
        url: `Tidak ada urlnya`,
        error: `Tidak ada hasil yang ditemukan`,
        premium: `Fitur ini khusus user premium!\nMinat jadi pengguna premium? cek keuntungan nya dengan ketik *.premium*`,
        limit: `Limit kamu telah habis untuk melakukan request command ini!`,
        wait: `Tunggu sebentar kak, data sedang diproses`,
        oversize: `Ukuran data terlalu besar`,
        error: `Gagal memproses data`
    }[type]
    if (msg) return zev.reply(m.chat, msg, m)
}
