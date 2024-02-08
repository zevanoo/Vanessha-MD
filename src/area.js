module.exports = function (m) {
  let level = global.zv.get("level", m.sender, "user")
        let area = (level <= 10) ? 0
    : ((level >= 10) && (level <= 50)) ? 1
    : ((level >= 50) && (level <= 100)) ? 2
    : ((level >= 100) && (level <= 150)) ? 3
    : ((level >= 150) && (level <= 200)) ? 4
    : ((level >= 200) && (level <= 250)) ? 5
    : ((level >= 250) && (level <= 300)) ? 6
    : ((level >= 300) && (level <= 350)) ? 7
    : ((level >= 350) && (level <= 400)) ? 8
    : ((level >= 400) && (level <= 450)) ? 9
    : ((level >= 450) && (level <= 500)) ? 10
    : ((level >= 500) && (level <= 550)) ? 11
    : ((level >= 550) && (level <= 600)) ? 12
    : ((level >= 600) && (level <= 650)) ? 13
    : ((level >= 650) && (level <= 700)) ? 14
    : ((level >= 700) && (level <= 750)) ? 15
    : ((level >= 750) && (level <= 800)) ? 16
    : ((level >= 800) && (level <= 850)) ? 17
    : ((level >= 850) && (level <= 900)) ? 18
    : ((level >= 900) && (level <= 950)) ? 19
    : ((level >= 950) && (level <= 1000)) ? 20
    : 20
  global.zv.set("area", area, m.sender, "dungeon")
  return true
}