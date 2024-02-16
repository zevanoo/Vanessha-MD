module.exports = (zev, m) => {
	require('./loadUserDatabase')(m)
	require('./chatExpired')(zev, m)
    global.zv.set("exp", global.zv.get("exp", m.sender, "user") + global.expEarningPerCmd, m.sender, "user")
    require('./levelup')(zev, m)
    require('./role')(m)
    require('./area')(m)
}