const { proto, delay, extractMessageContent, jidNormalizedUser, getContentType, areJidsSameUser, generateWAMessage, downloadContentFromMessage, toBuffer } = require("@whiskeysockets/baileys")
const fetch = require('node-fetch')
const fs = require('fs')
const PhoneNumber = require("awesome-phonenumber");
const { getFile } = require('./function')

exports.Client = ({ zev, store }, options = {}) => {
	let client = Object.defineProperties(zev, {
		chats: {
            value: { ...(options.chats || {}) },
            writable: true
        },
		sendText: {
			async value(jid, text, quoted = '', options) {
				let send = await zev.sendMessage(jid, { text, ...options }, { quoted })
				return send
				},
				enumerable: true
			},
			
		getName: {
         async value(jid = '', withoutContact = false) {
                jid = jidNormalizedUser(jid)
                withoutContact = zev.withoutContact || withoutContact
                let v
                if (jid.endsWith('@g.us')) return new Promise(async (resolve) => {
                    v = zev.chats[jid] || {}
                    if (!(v.name || v.subject)) v = await zev.groupMetadata(jid) || {}
                    resolve(v.name || v.subject || global.zv.get("name", jid, "user") || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international'))
                })
                else v = jid === '0@s.whatsapp.net' ? {
                    jid,
                    vname: 'WhatsApp'
                } : areJidsSameUser(jid, zev.user.id) ?
                    zev.user :
                    (zev.chats[jid] || {})
                return (withoutContact ? '' : v.name) || v.subject || v.vname || v.notify || global.zv.get("name", jid, "user") ||v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
            },
            enumerable: true
      },
      
      parseMention: {
         value(text) {
            return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net') || [];
            }
      },
		
		reply: {
			async value(jid, text, m, renderLT = false, useGroupUrl = true, options) {
				let send = await zev.sendText(jid, text, m, { contextInfo: {
					mentionedJid: zev.parseMention(text),
                  externalAdReply: {
                    title: global.botname + " | WhatsApp Bot",
                    thumbnail: fs.readFileSync(__dirname + "/../events/reply.png"),
                    renderLargerThumbnail: renderLT,
                    mediaType: 1,
                    sourceUrl: useGroupUrl ? 'https://chat.whatsapp.com/IS1V1LKUy16Fjd08uPtTdP' : "https://github.com/zevanoo"
                   }}, ...options })
                   return send
				}
		},
       
       sendContact: {
         async value(jid, number, quoted, options = {}) {
            let list = []
            for (let v of number) {
               if (v.endsWith("g.us")) continue
               v = v.replace(/\D+/g, "")
               list.push({
                  displayName: await zev.getName(v + "@s.whatsapp.net"),
                  vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await zev.getName(v + "@s.whatsapp.net")}\nFN:${await zev.getName(v + "@s.whatsapp.net")}\nitem1.TEL;waid=${v}:${v}\nEND:VCARD`
               })
            }
            return zev.sendMessage(jid, {
               contacts: {
                  displayName: `${list.length} Contact`,
                  contacts: list
               }
            }, { quoted, ...options })
         },
         enumerable: true
      },
      
      sendMedia: {
         async value(jid, url, quoted = "", options = {}) {
            let { mime, data: buffer, ext, size, filename } = await getFile(url)
            mime = options?.mimetype ? options.mimetype : mime
            let data = { text: "" }, mimetype = /audio/i.test(mime) ? "audio/mpeg" : mime
            if (size > 45000000) data = { document: buffer, mimetype: mime, fileName: options?.fileName ? options.fileName : (filename || `${zev.user?.name} (${new Date()}).${ext}`), ...options }
            else if (options.asDocument) data = { document: buffer, mimetype: mime, fileName: options?.fileName ? options.fileName : (filename || `${zev.user?.name} (${new Date()}).${ext}`), ...options }
            else if (options.asSticker || /webp/.test(mime)) {
               let pathFile = await writeExif({ mimetype, data: buffer }, { ...options })
               data = { sticker: fs.readFileSync(pathFile), mimetype: "image/webp", ...options }
               fs.existsSync(pathFile) ? await fs.promises.unlink(pathFile) : ""
            }
            else if (/image/.test(mime)) data = { image: buffer, mimetype: options?.mimetype ? options.mimetype : 'image/png', fileName: options?.fileName ? options.fileName : (filename || `${zev.user?.name} (${new Date()}).${ext}`), ...options }
            else if (/video/.test(mime)) data = { video: buffer, mimetype: options?.mimetype ? options.mimetype : 'video/mp4', fileName: options?.fileName ? options.fileName : (filename || `${zev.user?.name} (${new Date()}).${ext}`), ...options }
            else if (/audio/.test(mime)) data = { audio: buffer, mimetype: options?.mimetype ? options.mimetype : 'audio/mpeg', fileName: options?.fileName ? options.fileName : (filename || `${zev.user?.name} (${new Date()}).${ext}`), ...options }
            else data = { document: buffer, mimetype: mime, ...options }
            let msg = await zev.sendMessage(jid, data, { quoted, ...options })
            return msg
         },
         enumerable: true
      },
      
      downloadMediaMessage: {
         async value(message, filename) {
            let mime = {
               imageMessage: "image",
               videoMessage: "video",
               stickerMessage: "sticker",
               documentMessage: "document",
               audioMessage: "audio",
               ptvMessage: "video"
            }[message.type]

            if ('thumbnailDirectPath' in message.msg && !('url' in message.msg)) {
               message = {
                  directPath: message.msg.thumbnailDirectPath,
                  mediaKey: message.msg.mediaKey
               };
               mime = 'thumbnail-link'
            } else {
               message = message.msg
            }

            return await toBuffer(await downloadContentFromMessage(message, mime))
         },
         enumerable: true
      }
		})
	return client
}

const escapeRegExp = (string) => {
   return string.replace(/[.*=+:\-?^${}()|[\]\\]|\s/g, '\\$&')
}

function parseMessage(content) {
   content = extractMessageContent(content)

   if (content && content.viewOnceMessageV2Extension) {
      content = content.viewOnceMessageV2Extension.message
   }
   if (content && content.protocolMessage && content.protocolMessage.type == 14) {
      let type = getContentType(content.protocolMessage)
      content = content.protocolMessage[type]
   }
   if (content && content.message) {
      let type = getContentType(content.message)
      content = content.message[type]
   }

   return content
}

/**
 * Serialize Message
 * @param {WAConnection} conn 
 * @param {Object} m 
 * @param {store} store 
 */
exports.serialize = async (zev, m, store) => {
    if (!m) return m

    if (!m.message) return

   //let M = proto.WebMessageInfo
   m.message = parseMessage(m.message)
    if (m.key) {
        m.id = m.key.id
        m.from = m.key.remoteJid.startsWith("status") ? jidNormalizedUser(m.key.participant) : jidNormalizedUser(m.key.remoteJid)
        m.isBaileys = m.id.startsWith('BAE5') && m.id.length === 16
        m.chat = m.key.remoteJid
        m.fromMe = m.key.fromMe
        m.isGroup = m.chat.endsWith('@g.us')
        m.sender = jidNormalizedUser(m.fromMe && zev.user.id || m.participant || m.key.participant || m.chat || '')
    }
    
    if (m.isGroup) {
      m.metadata = store.groupMetadata[m.from] || await zev.groupMetadata(m.from)
      m.groupAdmins = m.isGroup && (m.metadata.participants.reduce((memberAdmin, memberNow) => (memberNow.admin ? memberAdmin.push({ id: memberNow.id, admin: memberNow.admin }) : [...memberAdmin]) && memberAdmin, []))
      m.isAdmin = m.isGroup && !!m.groupAdmins.find((member) => member.id === m.sender)
      m.isBotAdmin = m.isGroup && !!m.groupAdmins.find((member) => member.id === jidNormalizedUser(zev.user.id))
   }

    if (m.message) {
        m.type = getContentType(m.message) || Object.keys(m.message)[0]
        m.msg = parseMessage(m.message[m.type]) || m.message[m.type]
        m.mentions = [...(m.message?.extendedTextMessage?.contextInfo?.mentionedJid || []), ...(m.message?.extendedTextMessage?.contextInfo.groupMentions?.map(v => v.groupJid) || [])]
        m.body = (m.type === 'conversation') ? m.message.conversation : (m.type == 'imageMessage') ? m.message.imageMessage.caption : (m.type == 'videoMessage') ? m.message.videoMessage.caption : (m.type == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.type === 'messageContextInfo') ? (m.text) : '';
        m.prefix = /^[°•÷×¶£¢€¥®™_=|~!?#$%^&.+-,\/\\©^]/.test(m.body) ? m.body.match(/^[°•÷×¶£¢€¥®™_=|~!?#$%^&.+-,\/\\©^]/gi) : '#';
        m.command = m.body && m.body.replace(m.prefix, '').trim().split(/ +/).shift()
        m.args = m.body.trim().split(/[\s\n]+/).slice(1);
        m.expiration = m.message?.extendedTextMessage?.contextInfo?.expiration || 0
        m.timestamps = (typeof m.messageTimestamp === "number") ? m.messageTimestamp * 1000 : m.message.timestampMs * 1000
        m.isMedia = (m.type === "conversation") ? false : (m.type === "extendedTextMessage") ? false : true

        m.isQuoted = false
      if (m.message?.extendedTextMessage?.contextInfo) {
         m.isQuoted = true
         m.quoted = parseMessage(m.message?.extendedTextMessage?.contextInfo)
         m.quoted.message = parseMessage(m.message?.extendedTextMessage?.contextInfo?.quotedMessage)

         if (m.quoted.message) {
            m.quoted.type = getContentType(m.quoted.message) || Object.keys(m.quoted.message)[0]
            m.quoted.msg = parseMessage(m.quoted.message[m.quoted.type]) || m.quoted.message[m.quoted.type]
            m.quoted.isMedia = !!m.quoted.msg?.mimetype || !!m.quoted.msg?.thumbnailDirectPath
            m.quoted.key = {
               remoteJid: m.message?.extendedTextMessage?.contextInfo?.remoteJid || m.from,
               participant: jidNormalizedUser(m.message?.extendedTextMessage?.contextInfo?.participant),
               fromMe: areJidsSameUser(jidNormalizedUser(m.message?.extendedTextMessage?.contextInfo?.participant), jidNormalizedUser(zev?.user?.id)),
               id: m.message?.extendedTextMessage?.contextInfo?.stanzaId
            }
            m.quoted.from = /g\.us|status/.test(m.message?.extendedTextMessage?.contextInfo?.remoteJid) ? m.quoted.key.participant : m.quoted.key.remoteJid
            m.quoted.fromMe = m.quoted.key.fromMe
            m.quoted.id = m.message?.extendedTextMessage?.contextInfo?.stanzaId
            m.quoted.device = /^3A/.test(m.quoted.id) ? 'ios' : /^3E/.test(m.quoted.id) ? 'web' : /^.{21}/.test(m.quoted.id) ? 'android' : /^.{18}/.test(m.quoted.id) ? 'desktop' : 'unknown'
            m.quoted.isBot = (m.quoted.id.startsWith("BAE5") || m.quoted.id.startsWith("HSK"))
            m.quoted.isGroup = m.quoted.from.endsWith("@g.us")
            m.quoted.participant = jidNormalizedUser(m.message?.extendedTextMessage?.contextInfo?.participant) || false
            m.quoted.sender = jidNormalizedUser(m.message?.extendedTextMessage?.contextInfo?.participant || m.quoted.from)
            m.quoted.mentions = [...(m.quoted?.quotedMessage?.extendedTextMessage?.contextInfo?.mentionedJid || []), ...(m.quoted?.quotedMessage?.extendedTextMessage?.contextInfo?.groupMentions?.map(v => v.groupJid) || [])]
            m.quoted.body = (m.quoted.type === 'conversation') ? m.quoted.message.conversation : (m.quoted.type == 'imageMessage') ? m.quoted.message.imageMessage.caption : (m.quoted.type == 'videoMessage') ? m.quoted.message.videoMessage.caption : (m.quoted.type == 'extendedTextMessage') ? m.quoted.message.extendedTextMessage.text : (m.quoted.type === 'messageContextInfo') ? (m.quoted.text) : '';
            m.quoted.prefix = /^[°•÷×¶£¢€¥®™_=|~!?#$%^&.+-,\/\\©^]/.test(m.body) ? m.body.match(/^[°•÷×¶£¢€¥®™_=|~!?#$%^&.+-,\/\\©^]/gi) : '#';
            m.quoted.command = m.body.replace(m.prefix, '').trim().split(/ +/).shift().toLowerCase();
            m.quoted.args = m.body.trim().split(/[\s\n]+/).slice(1);
        }
    }
    
    m.reply = (text, chatId = m.chat, options = {}) => Buffer.isBuffer(text) ? zev.sendMedia(chatId, text, 'file', '', m, { ...options }) : zev.sendText(chatId, text, m, { ...options, mentions: zev.parseMention(text) })
    
	m.copy = () => exports.serialize(zev, M.fromObject(M.toObject(m)))

	m.copyNForward = (jid = m.chat, forceForward = false, options = {}) => zev.copyNForward(jid, m, forceForward, options)
	
	m.react = (react, msg) => react ? (msg ? zev.sendMessage(msg.from, { react: { text: react, key: msg.key }}) : null) : null

    m.download = async () => m.isQuoted ? await zev.downloadMediaMessage(m.quoted) : await zev.downloadMediaMessage(m)
    
}

zev.appenTextMessage = async(text, chatUpdate) => {
let messages = await generateWAMessage(m.chat, { text: text, mentions: m.mentionedJid }, {
userJid: zev.user.id,
quoted: m.quoted && m.quoted.fakeObj
})
messages.key.fromMe = areJidsSameUser(m.sender, zev.user.id)
messages.key.id = m.key.id
messages.pushName = m.pushName
if (m.isGroup) messages.participant = m.sender
let msg = {
    ...chatUpdate,
    messages: [proto.WebMessageInfo.fromObject(messages)],
    type: 'append'
}
zev.ev.emit('messages.upsert', msg)
}

    return m
}