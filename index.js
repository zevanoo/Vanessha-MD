(async () => {
require("./config.js")
const useCODE = !process.argv.includes("--qr")

const { default: makeWASocket, makeInMemoryStore, useMultiFileAuthState, fetchLatestBaileysVersion, DisconnectReason, PHONENUMBER_MCC } = require("@whiskeysockets/baileys")
const { Boom } = require("@hapi/boom");
const readline = require("readline")
const pino = require("pino")
const path = require('path')
const fetch = require('node-fetch')
const NodeCache = require("node-cache")
const { serialize, Client } = require("./lib/serialize")
const { loadCommands, loadPlugins } = require("./lib/loader")
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })

let Commands;
let Plugins;
let timeout = 0;
async function start() {
	Commands = await loadCommands(path.join(__dirname, "commands"))
	Plugins = await loadPlugins(path.join(__dirname, "plugins"))
    const { state, saveCreds } = await useMultiFileAuthState("./baileys/sessions")
    
    const { version, isLatest } = await fetchLatestBaileysVersion()
    const nodeCache = new NodeCache()
    const connectionUpdate = {
        version,
        keepAliveInternalMs: 30000,
        printQRInTerminal: !useCODE,
        generateHighQualityLinkPreview: true,
        msgRetryCounterCache: nodeCache,
        markOnlineOnconnect: false,
        defaultQueryTimeoutMs: undefined,
        logger: pino({ level: "silent" }),
        browser: ['Mac OS', 'safari', ''],
        auth: state
    }
    const zev = makeWASocket(connectionUpdate)
    await Client({ zev, store })
    store.bind(zev.ev)
    
    setInterval(() => {
        store.writeToFile("./baileys/store.json")
    }, 10000)

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
var question = text => new Promise(resolve => rl.question(text, resolve));

    if(useCODE && !zev.authState.creds.registered) {
		const { registration } = { registration: {} }
		let phoneNumber = ''
		do {
			phoneNumber = await question("Vanessha".main + " - " + 'Input a Valid number start with region code. Example : 62xxx:\n'.info)
		} while (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v)))
		rl.close()
		phoneNumber = phoneNumber.replace(/\D/g,'')
		global.logs('Generating code...', "info")
		setTimeout(async () => {
			let code = await zev.requestPairingCode(phoneNumber)
			code = code?.match(/.{1,4}/g)?.join('-') || code
			global.logs(`Your Pairing Code : ` + code, "info")
		}, 3000)
	}


    zev.ev.on("connection.update", async (update) => {
    	const { lastDisconnect, connection } = update
      if(connection) global.logs(`Connection status : ${connection}`, "info")
      
      if(timeout > 10) {
    		global.logs(`Program stopped after 10 times reconnecting!`, "warn");
    		return process.exit(1)
    	}
      
      if (connection === "close") {
      	let reason = new Boom(lastDisconnect?.error)?.output.statusCode
        if (reason === DisconnectReason.badSession) {
        	global.logs(`Bad Session File, Please Delete Session and Scan Again`, "error")
          process.exit(0)
        } else if (reason === DisconnectReason.connectionClosed) {
        	timeout++
          global.logs("Connection closed, reconnecting....", "warn")
          await start()
        } else if (reason === DisconnectReason.connectionLost) {
        	timeout++
          global.logs("Connectionn Lost from Server, reconnecting...", "warn")
          await start()
        } else if (reason === DisconnectReason.connectionReplaced) {
          global.logs("Connection Replaced, Another New Session Opened, Please Close Current Session First", "error")
          process.exit(1)
        } else if (reason === DisconnectReason.loggedOut) {
          global.logs(`Device Logged Out, Please Scan Again And Run.`, "error")
          process.exit(1)
        } else if (reason === DisconnectReason.restartRequired) {
          global.logs("Restart Required, Restarting...", "warn")
          await start()
        } else if (reason === DisconnectReason.timedOut) {
          global.logs("Connection TimedOut, Reconnecting...", "warn")
          process.exit(0)
        } else if (reason === DisconnectReason.multideviceMismatch) {
          global.logs("Multi device mismatch, please scan again", "error")
          process.exit(0)
        } else {
          console.error(reason)
          process.exit(0)
        }
     }
     
     if(connection === "open") {
     	 global.logs(`Client connected on number ${zev.user?.["id"]["split"](":")[0]}`, "info")
          global.notifyAfterConnect ? global.owner.map(res => zev.sendMessage(res[0] + "@s.whatsapp.net", { text: `Client ${zev?.user?.name || global.botname} has been connected` })) : null
     }
    })
zev.number = zev.user?.["id"]["split"](":")[0] + "@s.whatsapp.net"
zev.ev.on('messages.upsert', async chatUpdate => {
// console.log(JSON.stringify(chatUpdate, undefined, 2))
	try {
mek = chatUpdate.messages[0]
if (!mek.message) return
mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
if (mek.key && mek.key.remoteJid === 'status@broadcast') return
if (!global.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
m = await serialize(zev, mek, store)
require("./zevchat")(zev, m, Commands, Plugins)
} catch (e) {
console.error(e);
}
})
zev.ev.on('creds.update', saveCreds)
   
   return zev
}

start()
})()