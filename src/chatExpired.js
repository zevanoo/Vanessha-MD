module.exports = async (zev, m) => {
if(m.isGroup) {
    let chats = global.zv.getDataUser(m.chat, "group") || {}
    if (chats.time === 0) return;
    if (Date.now() > chats.time) {
        await zev.reply(m.chat, 'Bye🖐 bot akan left!!')
        await zev.groupLeave(m.chat)
        global.zv.set("time", 0, m.chat, "group")
    }
  }
}