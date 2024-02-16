module.exports = [{
	name: "hidetag",
	aliases: ["ht", "announce"],
	tags: "group",
	details: { desc: "tag all member but tags hide", usage: "hidetag (teks)" },
	code: async (zev, m, { participants, text }) => {
		const freply = {
            "key": {
                "participants": "0@s.whatsapp.net",
                "remoteJid": "status@broadcast",
                "fromMe": false,
                "id": "Vanessha-MD"
            },
            "message": {
                "contactMessage": {
                    "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            },
            "participant": "0@s.whatsapp.net"
        };

        zev.sendMessage(m.chat, {
        	text: text || global.botname,
        mentions: participants.map(a => a.id)
       }, { quoted: freply });
    },
    isGroup: true,
    isAdmin: true
}]