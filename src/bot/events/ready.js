const { BotEvent } = require('../../lib');

module.exports = class ReadyEvent extends BotEvent {
	constructor() {
		super('ready');
	}

	async run(bot) {
		await bot.user.setPresence({
			activity: {
				name: `${bot.users.cache.size} users!`,
				type: 'WATCHING'
			}
		});
	}
};
