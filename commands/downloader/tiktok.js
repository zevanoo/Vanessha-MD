module.exports = [{
	name: "tiktok",
	aliases: ["tt", "ttdl"],
	tags: "downloader",
	details: { desc: "download video/photo from tiktok", usage: "tiktok (url)" },
	code: async(zev, m, { args, isUrl }, { ttdl }) => {
		if(!isUrl(args[0])) return global.mess(zev, "invalidUrl", m)
		let dl = await ttdl(args[0])
		let res = dl.data
		let str = `*Tiktok Downloader:*
➭ Title: *${res.description}*
➭ View: *${res.videoDetails.playCount}*`;
       if(res.type == "video") {
       	zev.sendMedia(m.chat, res.media[0].url, m, { caption: str, mimetype: "video/mp4" })
       }
       if(res.type == "image") {
       	zev.reply(m.chat, str, m)
       	res.media.map((v) => {
           zev.sendMedia(m.chat, v.url, m, { mimetype: "image/png" })
           console.log(v)
            })
      }
	},
	limit: true,
	wait: true
}]