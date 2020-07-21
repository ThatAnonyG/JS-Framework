const { readdirSync } = require('fs');

module.exports = class Handler {
	constructor(bot, { commands, events }) {
		this.client = bot;
		this._init({ commands, events });
	}

	_init({ commands, events }) {
		this.initCommand(commands);
		this.initEvent(events);
	}

	initCommand(path) {
		readdirSync(path).filter((x) => !x.endsWith('.js')).forEach((cat) => {
			const cmdFiles = readdirSync(`${path}/${cat}/`).filter((x) =>
				x.endsWith('.js')
			);

			for (let file of cmdFiles) {
				try {
					const pull = require(`${path}/${cat}/${file}`);
					let command = new pull();
					command.category = cat;
					command.bot = this.client;
					this.client.commands.set(command.name, command);
					console.log(`Loaded command: ${command.name}`);
				} catch (e) {
					console.log(e);
				}
			}
		});
	}

	initEvent(path) {
		const eventFiles = readdirSync(path).filter((x) => x.endsWith('.js'));
		for (let file of eventFiles) {
			try {
				const pull = require(`${path}/${file}`);
				let event = new pull();
				event.bot = this.client;
				this.client.on(event.name, event.run.bind(null, this.client));
				console.log(`Loaded event: ${event.name}`);
			} catch (e) {
				console.log(e);
			}
		}
	}
};
