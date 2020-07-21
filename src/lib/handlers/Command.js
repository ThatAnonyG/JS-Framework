module.exports = class Command {
	constructor(
		name,
		options = {
			aliases: [],
			description: 'A cool command',
			usage: 'Give the command a try',
			perms: [],
			botPerms: []
		}
	) {
		this.name = name;
		this.aliases = options.aliases;
		this.description = options.description;
		this.perms = options.perms;
		this.botPerms = options.botPerms;
	}
};
