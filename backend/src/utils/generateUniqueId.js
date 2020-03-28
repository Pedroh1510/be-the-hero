const crypton = require("crypto");

module.exports = function generateUniqueId() {
	return crypton.randomBytes(4).toString("HEX");
};
