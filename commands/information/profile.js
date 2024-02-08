module.exports = [{
	name: "profile",
	aliases: ["profil"],
	tags: "information",
	details: { desc: "check information user" },
	code: async(zev, m, { isOwner, isPrems, levelling, prefix }) => {
		let tag = m.sender.split("@")[0]
		let exp = await global.zv.get("exp", m.sender, "user")
		let level = await global.zv.get("level", m.sender, "user")
		let { min, xp, max } = await levelling.xpRange(level);
		let math = max - xp;
		let str = `
┏━━━━━━─────┈ ⳹
┃╔━─⟢⟨ Profile ⟩⟣
┇┃ ➯Name : ${global.zv.get("name", m.sender, "user")}
┃║ ➯Status: ${isOwner ? "Owner" : (isPrems ? "Premium" : "Free User")}
┇┃ ➯Limit: ${await global.zv.get("limit", m.sender, "user")}
┃║ ➯Exp: ${exp} (${exp - min} / ${xp})
┇┃ ➯Role: ${global.zv.get("role", m.sender, "user")}
┃║ ➯Level: ${level}
┇┃ ➯Money: ${await global.zv.get("money", m.sender, "user")}
┃❏
┗┳━━◩
┏┛
┃➯Tag: @${m.sender.split("@")[0]}
┗━━━━━━━❏
`.trim()
		zev.reply(m.chat, str, m)
	}
}]