module.exports = [{
	name: "instagram",
	aliases: ["ig", "igdl"],
	tags: "downloader",
	details: { desc: "download video/photo from Instagram", usage: "ig (url) (type media)" },
	code: async(zev, m, { args, axios, path }, { igdl }) => {
		let dl = await igdl(args[0])
		let res = dl.data
		let typeMedia = args[1]
		res.map((v) => {
			switch(typeMedia) {
				case "photo": case "foto": {
					zev.sendMedia(m.chat, v.url, m, { mimetype: "image/png" })
			}
			break;
			case "video": case "vidio": {
				zev.sendMedia(m.chat, v.url, m, { mimetype: "video/mp4" })
			}
			break;
			default: zev.reply(m.chat, "masukkan type media nya, opsi yang tersedia: \n-photo\n-video\njika tidak sesuai maka akan error", m)
		}
		})
	},
	isUrl: true,
	limit: true,
	wait: true
}]