module.exports = [{
	name: "youtubevideo",
	aliases: ["ytv", "youtubemp4", "ytmp4"],
	tags: "downloader",
	details: { desc: "download video from youtube", usage: "ytv (url)" },
	code: async(zev, m, { args, formatSize, isUrl }, { ytv }) => {
		if(!isUrl(args[0])) return global.mess(zev, "invalidUrl", m)
		let dl = await ytv(args[0])
		let data = dl.data
		if(dl.status) {
			try {
					if(data.mediaSize > 100000000) return global.mess(zev, "oversize", m)
					let media = data.media.url;
					let info = data.videoInfo;
					let caption = `*YouTube Downloader:*
➭ Title: *${info.title}*
➭ View: *${info.viewCount}*
➭ Size: *${formatSize(data.mediaSize)}*`; 
					zev.sendMedia(m.chat, media, m, { caption, mimetype: "video/mp4", fileName: `${info.title}.mp4` });
			} catch (e) {
			console.error(e)
			}
			} else {
				global.mess(zev, "error", m)
			}
	},
	limit: true,
	wait: true
},{
	name: "youtubeaudio",
	aliases: ["yta", "youtubemp3", "ytmp3"],
	tags: "downloader",
	details: { desc: "download audio from youtube", usage: "yta (url)" },
	code: async(zev, m, { args, formatSize, isUrl }, { yta }) => {
		if(!isUrl(args[0])) return global.mess(zev, "invalidUrl", m)
		let dl = await yta(args[0])
		let data = dl.data
		if(dl.status) {
					if(data.mediaSize > 100000000) return global.mess(zev, "oversize", m)
					let media = data.media.url;
					let info = data.videoInfo;
					let caption = `*YouTube Downloader:*
➭ Title: *${info.title}*
➭ View: *${info.viewCount}*
➭ Size: *${formatSize(data.mediaSize)}*`;
                   zev.reply(m.chat, caption, m)
					zev.sendMedia(m.chat, media, m, { mimetype: "audio/mp4", fileName: `${info.title}.mp4`, contextInfo: {
							externalAdReply: {
								title: info.title,
								body: global.wm,
								mediaType: 1,
								renderLargerThumbnail: true,
								thumbnailUrl: data.thumbnails.url,
								sourceUrl: text
							}
						}});
			} else {
				global.mess(zev, "error", m)
			}
	},
	limit: true,
	wait: true
},{
	name: "youtubesearch",
	aliases: ["yts", "ytsearch"],
	tags: "downloader",
	details: { desc: "search youtube query using this bot", usage: "yts (query)" },
	code: async(zev, m, { text }, { yts }) => {
		if(!text) return m.reply("masukkan query")
		let dl = await yts(text)
		let data = dl.data
		let header = `*YouTube Search:*`
		let res = `➭ Title: %title
			➭ Duration: %duration
			➭ Views: %views
			➭ Upload: %ago
			➭ Link: %url
			➭ Creator: %author`;
		let body = data.map(v => res
		.replace(/%title/g, v.title)
		.replace(/%duration/g, v.duration)
		.replace(/%views/g, v.views)
		.replace(/%ago/g, v.ago)
		.replace(/%url/g, v.url)
		.replace(/%author/g, v.author.name)
		.trim()).join("\n\n")
		zev.reply(m.chat, header + "\n\n" + body, m)
	},
	limit: true,
	wait: true
}]