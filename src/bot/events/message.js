const { BotEvent } = require('../../lib');

module.exports = class MessageEvent extends BotEvent {
	constructor() {
		super('message');
	}

	async run(bot, message) {
		if (message.author.bot) return;
		if (!message.guild) return;
		if (!message.member) await message.guild.members.fetch(message.author);

		const prefix = bot.config.get('prefix');
		if (!message.content.startsWith(prefix)) return;

		const args = message.content.trim().slice(prefix.length).split(/+ /g);
		const cmd = args.shift();
		const command = bot.getCmd(cmd);
		if (!command) return;

		await command.run(message, args);
	}
};
