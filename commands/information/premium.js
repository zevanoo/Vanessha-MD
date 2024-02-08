module.exports = [{
	name: "premium",
	tags: "information",
	details: { desc: "get information about premium", usage: "premium" },
	code: async (zev, m) => {
		zev.reply(m.chat, `
┏━━━━━━─────┈ ⳹
┃╔━─⟢⟨ *PREMIUM FEATURE* ⟩⟣
┇┃ ➯Unlimited limit
┃║ ➯No Cooldown Feature
┇┃ ➯Access Premium Feature
┃❏
┗━━━◩
`.trim(), m)
    }
}]