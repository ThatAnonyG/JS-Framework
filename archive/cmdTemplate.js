const { Command } = require('../../../lib');

module.exports = class NAME extends Command {
	constructor() {
		super('NAME', {
			aliases: [ '' ],
			description: '',
			usage: '',
			botPerms: [],
			perms: []
		});
	}

	async run() {}
};
