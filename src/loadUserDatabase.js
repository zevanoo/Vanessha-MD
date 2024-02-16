module.exports = function (m) {
// user default
global.zv.variables({
	id: m.sender,
    name: m.pushName,
    premium: false,
    banned: false,
    limit: 20,
    premiumTimestamp: 0,
    joinCount: 0,
    exp: 0,
    level: 1,
    money: 0,
    role: "Newbie ㋡",
    dailyTimeout: 0,
    weeklyTimeout: 0,
    monthlyTimeout: 0
    }, "user")
// mancing
global.zv.variables({
	id: m.sender,
    fishingTimeout: 0,
    fishingrod: 0,
    fishingrodDurability: 0,
    kepiting: 0,
    cumi: 0,
    buntal: 0,
    dory: 0,
    lumba: 0,
    lobster: 0,
    udang: 0,
    ikan: 0
    }, "mancing")
// mining
global.zv.variables({
	id: m.sender,
    miningTimeout: 0,
    pickaxe: 0,
    pickaxeDurability: 0,
    diamond: 0,
    iron: 0,
    gold: 0,
    stone: 0,
    titanium: 0,
    uranium: 0,
    aluminium: 0
    }, "mining")
// hunting
global.zv.variables({
	id: m.sender,
    huntingTimeout: 0,
    sword: 0,
    swordDurability: 0,
    panda: 0,
    kerbau: 0,
    monyet: 0,
    ayam: 0,
    bebek: 0,
    sapi: 0,
    babi: 0,
    kambing: 0
    }, "hunting")
// dungeon
global.zv.variables({
	id: m.sender,
    dungeonTimeout: 0,
    armor: 0,
    health: 1000,
    potion: 0,
    area: 0,
    }, "dungeon")
// tanam
global.zv.variables({
	id: m.sender,
    tanamTimeout: 0,
    tanamPanen: 0,
    bibitApel: 0,
    bibitPisang: 0,
    bibitMangga: 0,
    bibitJagung: 0,
    bibitSemangka: 0,
    bibitTimun: 0,
    bibitTomat: 0,
    bibitWortel: 0,
    bibitStroberi: 0,
    bibitBlueberi: 0,
    apel: 0,
    pisang: 0,
    mangga: 0,
    jagung: 0,
    semangka: 0,
    timun: 0,
    tomat: 0,
    wortel: 0,
    stroberi: 0,
    blueberi: 0
    }, "tanam")
// crates
global.zv.variables({
	id: m.sender,
	pet: 0,
	common: 0,
	uncommon: 0,
	rare: 0,
	legendary: 0,
	mythical: 0,
	artefact: 0,
	trash: 0
}, "crate")
// chop
global.zv.variables({
	id: m.sender,
	chopTimeout: 0,
	axe: 0,
	axeDurability: 0,
	pohon: 0,
	beringin: 0,
	bambu: 0,
	kayu: 0,
	rotan: 0,
	palem: 0
}, "chop")
// pet
global.zv.variables({
	id: m.sender,
	kucing: 0,
	rubah: 0,
	kuda: 0,
	makananpet: 0
}, "pet")
}