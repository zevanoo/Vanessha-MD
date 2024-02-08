module.exports = [{
	name: "tiktok",
	aliases: ["tt", "ttdl"],
	tags: "downloader",
	details: { desc: "download video/photo from tiktok", usage: "tiktok (url)" },
	code: async(zev, m, { text }, { ttdl }) => {
		let dl = await ttdl(text)
		let res = dl.data
		let str = `*Tiktok Downloader:*
➭ Title: *${res.desc}*
➭ View: *${res.videoDetails.playCount}*`;
       if(res.type == "video") {
       	zev.sendMedia(m.chat, res.media[0].url, m, { caption: str, mimetype: "video/mp4" })
       }
       if(res.type == "image") {
       	m.reply(str)
       	res.media.map((v) => {
           zev.sendMedia(m.chat, v.url, m, { mimetype: "image/png" })
           console.log(v)
            })
      }
	},
	isUrl: true,
	limit: true,
	wait: true
}]