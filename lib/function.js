const axios = require("axios")
const cheerio = require("cheerio")
const path = require("path")
const util = require("util")
const { toBuffer } = require("@whiskeysockets/baileys");
const chalk = require('chalk')
const mimes = require("mime-types");
const fs = require('fs')

exports.getRandom = (ext, length = "20") => {
    var result = ""
    var character = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
    var characterLength = character.length
    for (var i = 0; i < length; i++) {
        result += character.charAt(Math.floor(Math.random() * characterLength))
    }

    return `${result}.${ext}`
}

exports.fetchBuffer = (url, options = {}) => {
   return new Promise((resolve, reject) => {
      axios.get(url, {
         headers: {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "Upgrade-Insecure-Requests": "1",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0",
            ...(!!options.headers ? options.headers : {}),
         },
         responseType: "stream",
         ...options
      }).then(async (response) => {
         try {
            const { data, headers } = response;
            let buffer = await toBuffer(data);
            let disposition = headers && (headers['content-disposition'] || '');
            let position = disposition.match(/filename=(?:(?:"|')(.*?)(?:"|')|([^"'\s]+))/);
            let filename = decodeURIComponent(position?.[1] || position?.[2]) || null;
            let mimetype = mimes.lookup(filename) || "application/octet-stream";
            let ext = mimes.extension(mimetype) || "bin";

            resolve({ data: buffer, filename, mimetype, ext });
         } catch (error) {
            reject(error);
         }
      }).catch(reject);
   });
};

exports.fetchUrl = async (url, options) => {
    try {
        options ? options : {}
        const res = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            },
            ...options
        })
        return res.data
    } catch (err) {
        return err
    }
}

exports.WAVersion = async () => {
    let get = await exports.fetchUrl("https://web.whatsapp.com/check-update?version=1&platform=web")
    let version = [get.currentVersion.replace(/[.]/g, ", ")]
    return version
}

exports.runtime = (seconds) => {
    seconds = Number(seconds)
	var d = Math.floor(seconds / (3600 * 24))
	var h = Math.floor(seconds % (3600 * 24) / 3600)
	var m = Math.floor(seconds % 3600 / 60)
	var s = Math.floor(seconds % 60)
	var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : ""
	var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : ""
	var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : ""
	var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : ""
	return dDisplay + hDisplay + mDisplay + sDisplay
}

exports.clockString = (ms) => {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

exports.isUrl = (url) => {
   let regex = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,9}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, "gi")
   if (!regex.test(url)) return false
   return url.match(regex)
}

exports.sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

exports.jsonformat = (string) => {
    return JSON.stringify(string, null, 2)
}

exports.logic = (check, inp, out) => {
	if (inp.length !== out.length) throw new Error('Input and Output must have same length')
	for (let i in inp)
		if (util.isDeepStrictEqual(check, inp[i])) return out[i]
	return null
}
exports.parseUnix = function (timestamp, format) {
  format = format ? format : "{d} hari, {h} jam, {min} menit, {sec} detik";
  let milliseconds = Math.floor(parseInt(timestamp, 10));
  let now = Math.floor(Date.now());
  if (isNaN(milliseconds)) {
    throw global.logs("Timestamp is not valid number!", "error");
  }
  
  let ms = Math.floor((milliseconds - now) / 1000);
  let days = Math.floor(ms / 86400);
  let hours = Math.floor((ms % 86400) / 3600);
  let minutes = Math.floor(((ms % 86400) % 3600) / 60);
  let seconds = ((ms % 86400) % 3600) % 60;

  return format
    .replaceAll("{d}", days)
    .replaceAll("{h}", hours)
    .replaceAll("{min}", minutes)
    .replaceAll("{sec}", seconds);
}

exports.parseMention = (text) => {
    return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@c.us')
}

exports.isNumber = (number) => {
    const int = parseInt(number)
    return typeof int === 'number' && !isNaN(int)
}

exports.getFile = async(PATH, save) => {
  try {
    let filename = null;
      let data = (await this.fetchBuffer(PATH))

      if (data?.data && save) {
        filename = path.join(process.cwd(), "../", "tmp", Date.now() + "." + data.ext)
        fs.promises.writeFile(filename, data?.data);
      }
      return {
        filename: data?.name ? data.name : filename,
        ...data
      };
  } catch (e) {
    throw e
  }
}

exports.mediaSize = async function(url) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const sizeInBytes = response.data.byteLength;
    return sizeInBytes;
  } catch (error) {
    console.error('Error:', error.message);
    return -1;
  }
}

exports.formatSize = (bytes, si = true, dp = 2) => {
   const thresh = si ? 1000 : 1024;

   if (Math.abs(bytes) < thresh) {
      return `${bytes} B`;
   }

   const units = si
      ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
      : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
   let u = -1;
   const r = 10 ** dp;

   do {
      bytes /= thresh;
      ++u;
   } while (
      Math.round(Math.abs(bytes) * r) / r >= thresh &&
      u < units.length - 1
   );

   return `${bytes.toFixed(dp)} ${units[u]}`;
}

exports.formatDate = function (timestamp) {
  const date = new Date(timestamp);
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  
  const day = days[date.getDay()];
  const month = months[date.getMonth()];
  const dateOfMonth = date.getDate();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();

  return `Hari ${day} Tanggal ${dateOfMonth} ${month} Tahun ${year} Jam ${hour}:${minute} `;
}

exports.pickRandom = function (list) {
    return list[Math.floor(Math.random() * list.length)]
}