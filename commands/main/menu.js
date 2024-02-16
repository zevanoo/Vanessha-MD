let defaultMenu = {
  before: `Halo @%tag

┏━━━━━━─────┈ ⳹
┃╔━─⟢⟨ ${global.botname} ⟩⟣
┇┃ ➯Owner : Zevano
┃║ ➯Bot name : ${global.botname}
┇┃ ➯Uptime : %uptime
┃║ ➯Options : -desc, -use, -info
┇┃ ➯Mode : *${global.public ? "Public" : "Self"}*
┃║ ➯Total User : ${global.zv.totalf("user")}
┇┃ ➯Prefix: *%prefix*
┃❏
┗┳━━◩
┍┛
┆➯📝Commands: %totalf
└─┈⟅
┍━━━──┈❏➢ Profile
┆Name : %name
┆Limit : %limit
┆Status : %status
└──┈┈⟢
%readmore
—————————
(Ⓟ) = Premium
(Ⓛ) = Limit
(Ⓓ) = Disable

-----  -----  ---  -----  -----

  ≡ *ʟ ɪ s ᴛ  ᴍ ᴇ ɴ ᴜ*
`,
header: `⳼────❪ %category ❫\n┃╭─❏`,
  body: '┃│❖ %cmd %islimit%isPremium%isDisable',
  footer: '┃╰───────────────❏\n✇────✪\n',
  after: 'Powered By Zevano',
}
module.exports = [{
    name: 'help',
    aliases: ['menu', 'command'],
    tags: "main",
    details: { desc: 'Display available commands grouped by tags.', usage: 'help' },
    code: async (zev, m, { commands, uptime, limit, command, cmd, args, prefix, readmore, isPrems, isOwner }) => {
        zev.menu = zev.menu ? zev.menu : {};
        const before = zev.menu.before || defaultMenu.before;
        const header = zev.menu.header || defaultMenu.header;
        const body = zev.menu.body || defaultMenu.body;
        const footer = zev.menu.footer || defaultMenu.footer;
        const after = zev.menu.after || defaultMenu.after;
        
        const createSubmenu = (tag) => {
    const command = commands.list[tag];
    if (!command || !Array.isArray(command)) {
        return '│ ◦  No commands available in this category.';
    }

    return command.map(cmd => body
        .replace(/%prefix/g, prefix)
        .replace(/%cmd/g, cmd.name)
        .replace(/%islimit/g, cmd.limit ? '(Ⓛ)' : ' ')
        .replace(/%isPremium/g, cmd.isPremium ? '(Ⓟ)' : '')
        .replace(/%isDisable/g, cmd.disable ? '(Ⓓ)' : '')
        .trim()
    ).join('\n');
};

        let tags = commands.type.reduce((acc, tag) => {
    acc[tag] = tag.charAt(0).toUpperCase() + tag.slice(1) + ' Menu';
    return acc;
}, {});

let res;
if (args.length === 0) {
	let arstr = [...commands.type]
	arstr.push("all")
    let str = arstr.sort();
    let headerText = header.replace(/%category/g, "All Tags");
    let obj = str.map(tag => body
        .replace(/%cmd/g, command)
        .replace(/%islimit/g, tag)
        .replace(/%isPremium/g, "")
        .replace(/%isDisable/g, "")
        .trim()).join('\n');
        
    res = headerText + '\n' + obj + '\n' + footer;
} else {
    res = args.map(arg => {
        if (arg.toLowerCase() === 'all') {
            // User mengirim 'all', tampilkan semua tags
            return commands.type.map(tag => {
                const categoryHeaderText = header.replace(/%category/g, tags[tag]);

                const submenu = createSubmenu(tag);

                return `${categoryHeaderText}\n${submenu}\n${footer}`;
            }).join('\n');
        } else {
            const tag = arg.toLowerCase();
            const categoryHeaderText = header.replace(/%category/g, tags[tag]);

            if (!commands.type.includes(tag)) return `${categoryHeaderText}\n${'│ ◦  Invalid tag: ' + tag}\n${footer}`;

            const submenu = createSubmenu(tag);

            return `${categoryHeaderText}\n${submenu}\n${footer}`;
        }
    }).join('\n');
}
        const text = [
            before
            .replace(/%name/g, m.pushName)
            .replace(/%limit/g, limit)
            .replace(/%tag/g, m.sender.split("@")[0])
            .replace(/%status/g, isOwner ? "Owner" : (isPrems ? "Premium" : "Free User"))
            .replace(/%uptime/g, uptime)
            .replace(/%readmore/g, readmore)
            .replace(/%prefix/g, prefix)
            .replace(/%totalf/g, global.cmdCount)
            .trim(),
            res,
            after
           ].join('\n')

        zev.reply(m.chat, text, m, true, true)
    }
}];