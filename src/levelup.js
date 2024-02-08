let levelling = require('../lib/levelling')

module.exports = function (zev, m) {
    try {
        let level = global.zv.get("level", m.sender, "user");
        let exp = global.zv.get("exp", m.sender, "user");
        let before = level;

        while (levelling.canLevelUp(level, exp)) {
            level++;
            global.zv.set("level", level, m.sender, "user");
        }

        if (before !== global.zv.get("level", m.sender, "user")) {
            let chating = `Congratulations, you have leveled up! ${before} -> ${level}. Use *.profile* to check.`;
            m.reply(chating);
        }
    } catch (e) {
        console.error("Error:", e);
    }
}
