const { Client, Collection } = require('discord.js');
const Handler = require('./Handler');
const Config = require('../handlers/Config');

module.exports = class Bot extends Client {
	constructor() {
		super({
			disableMentions: 'everyone'
		});
		this.config = new Config(__dirname + '/../../../config.json');
		this.commands = new Collection();
		this._token = this.config.get('token');
	}

	async init() {
		this.handler = new Handler(this, {
			commands: __dirname + '/../../bot/commands/',
			events: __dirname + '/../../bot/events/'
		});
		super
			.login(this._token)
			.then(() => console.log(`Client logged on as ${this.user.username}!`));
	}

	getCmd(cmd) {
		return (
			this.commands.find(
				(x) =>
					x.name.toLowerCase() === cmd.toLowerCase() ||
					x.aliases.map((a) => a.toLowerCase()).includes(cmd.toLowerCase())
			) || null
		);
	}
};
