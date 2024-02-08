const { mediaSize } = require("../lib/function");
const axios = require("axios");
const cheerio = require('cheerio')
const ytdl = require("ytdl-core");
const fs = require('fs')
const ytsapi = require("yt-search");
const getFBInfo = require("fb-downloader-new");
const { TiktokDL } = require("@tobyg74/tiktok-api-dl");
const insta = require("@sasmeee/igdl");

module.exports = [{
	name: "ytv",
	details: {
		desc: "Get youtube video data",
		usage: "await ytv(url)"
	},
	code: async(url) => {
    try {
        if(!ytdl.validateURL(url)) return { status: false, message: "Invalid url video!" };
        
        const dataVid = await ytdl.getInfo(url);
        const sortData = dataVid.formats.filter((format) => format.hasVideo && format.hasAudio).sort((a, b) => (b.width * b.height) - (a.width * a.height));
        const fileSize = dataVid.formats.filter((format) => format.qualityLabel === sortData[0].qualityLabel).sort((a, b) => (b.width * b.height) - (a.width * a.height));
        const thumbnail = dataVid.videoDetails.thumbnails.sort((a, b) => b.width - a.width).find((thumbnail) => thumbnail.width > 1000 || thumbnail.width > 700 || thumbnail.width > 600 || thumbnail.width > 500 || thumbnail.width > 400 || thumbnail.width > 300 || thumbnail.width > 200 || thumbnail.width > 100);
        const result = { status: true, data: { videoInfo: { title: dataVid.videoDetails.title, description: dataVid.videoDetails.description, viewCount: dataVid.videoDetails.viewCount, videoId: dataVid.videoDetails.videoId }, thumbnails: thumbnail, media: sortData[0], mediaSize: fileSize[0].contentLength }};
        return result;
    } catch(err) {
        return { status: false, message: err };;
    }
	}
},{
	name: "yta",
	details: {
		desc: "Get youtube audio data",
		usage: "await yta(url)"
	},
	code: async(url) => {
    try {
        if(!ytdl.validateURL(url)) return { status: false, message: "Invalid url video!" };
        
        const dataVid = await ytdl.getInfo(url);
        const sortData = dataVid.formats.filter((format) => format.hasVideo == false && format.hasAudio == true).sort((a, b) => (b.width * b.height) - (a.width * a.height));
        const thumbnail = dataVid.videoDetails.thumbnails.sort((a, b) => b.width - a.width).find((thumbnail) => thumbnail.width > 1000 || thumbnail.width > 700 || thumbnail.width > 600 || thumbnail.width > 500 || thumbnail.width > 400 || thumbnail.width > 300 || thumbnail.width > 200 || thumbnail.width > 100);
        const fileSize = await mediaSize(sortData[0].url);
        const result = { status: true, data: { videoInfo: { title: dataVid.videoDetails.title, description: dataVid.videoDetails.description, viewCount: dataVid.videoDetails.viewCount, videoId: dataVid.videoDetails.videoId }, thumbnails: thumbnail, media: sortData[0], mediaSize: fileSize }};
        return result;
    } catch(err) {
        return { status: false, message: err };;
    }
	}
},{
	name: "yts",
	details: {
		desc: "Get youtube searching data",
		usage: "await yts(url)"
	},
	code: async(query) => {
    if(!query) return { status: false, message: "Please input the query!" };
    try {
        const res = await ytsapi(query);
        const list = res.all.filter(v => v.type === "video") || [];
        if(list.length === 0) return { status: false, message: "Can't find data!" };
        return { status: true, data: list };
    } catch (e) {
        return { status: false, message: e };
    }
	}
},{
	name: "igdl",
	details: {
		desc: "Download instagram post, reels, etc",
		usage: "await igdl(url)"
	},
	code: async(url) => {
    if (!url) return { status: false, message: "Invalid url!" };
    try {
        const res = await insta(url);
        if (res.length < 1) return { status: false, message: "Invalid url instagram post!" };
        const content = await Promise.all(res.map(async (data) => {
            let size = await mediaSize(data.download_link);
            let media = {
                thumbnail: data.thumbnail_link,
                url: data.download_link,
                size
            };
            return media;
        }));
        return { status: true, mediaCount: content.length, data: content };
    } catch (e) {
        return { status: false, message: e };
    }
	}
},{
	name: "fbdl",
	details: {
		desc: "Download facebook video",
		usage: "await fbdl(url)"
	},
	code: async(url) => {
    if(!url) return { status: false, message: "Invalid url!" };
    try {
        const result = await getFBInfo(url);
        const size = await mediaSize(result.hd || result.sd);
        return { status: true, data: { post: result.url, caption: result.title, thumb: result.thumbnail, video: result.hd || result.sd, size }};
    } catch (e) {
        return { status: false, message: e };
    }
	}
},{
	name: "ttdl",
	details: {
		desc: "Download tiktok post or slide",
		usage: "await ttdl(url)"
	},
	code: async(url, version) => {
		version = version || "v1";
    if(!url) return { status: false, message: "Invalid url!" };
    try {
        const res = await TiktokDL(url, { version });
        if(res.result === undefined) return { status: false, message: res.message };
        let media = [];
        if(res.result.type == "video") {
            const vid = res.result.video;
            media = await Promise.all(vid.map(async (data) => {
                let size = await mediaSize(data);
                let result = {
                    size,
                    url: data
                }
                return result;
            }));
        } else {
            const img = res.result.images;
            media = await Promise.all(img.map(async (data) => {
                let size = await mediaSize(data);
                let result = {
                    size,
                    url: data
                }
                return result;
            }));
        }
        const tt = res.result;;
        tt.music.size = await mediaSize(tt.music.playUrl[0]);
        const content = {
            type: tt.type,
            id: tt.id,
            createTime: tt.createTime,
            description: tt.description,
            hashtag: tt.hashtag,
            author: tt.author,
            videoDetails: tt.statistics,
            cover: tt.cover,
            dynamicCover: tt.dynamicCover,
            originCover: tt.originCover,
            music: tt.music,
            media
        }
        return { status: true, data: content };
    } catch (e) {
        console.log(e)
        return { status: false, message: e };
    }
	}
}]