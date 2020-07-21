require('dotenv').config({
	path: __dirname + '/../../../.env'
});

module.exports = class Config {
	constructor(path) {
		this.config = require(path);
		this._type = process.env.TYPE;
	}

	get envType() {
		return this._type;
	}

	set envType(type) {
		this._type = type;
	}

	get(key = 'token') {
		return this.config[this.envType][key];
	}
};
