module.exports = [{
	name: "simulate",
	tags: "owner",
	code: async(zev, m, { prefix, command, text, args: [event] }) => {
		if (!event) return await zev.reply(m.chat, `contoh:
${prefix + command} welcome @user
${prefix + command} bye @user
${prefix + command} promote @user
${prefix + command} demote @user`, m)
    let who = zev.parseMention(text)
    let part = who.length ? who : [m.sender]
    let act = false
    m.reply(`Simulating ${event}...*`)
    switch (event.toLowerCase()) {
        case 'add':
        case 'invite':
        case 'welcome':
            act = 'add'
            break
        case 'bye':
        case 'kick':
        case 'leave':
        case 'remove':
            act = 'remove'
            break
        case 'promote':
            act = 'promote'
            break
        case 'demote':
            act = 'demote'
            break
        default:
            throw await zev.reply(m.chat, `contoh:
${prefix + command} welcome @user
${prefix + command} bye @user
${prefix + command} promote @user
${prefix + command} demote @user`, m)
    }
    if (act) return zev.participantsUpdate({
        id: m.chat,
        participants: part,
        action: act
    })
	},
	isOwner: true
}]