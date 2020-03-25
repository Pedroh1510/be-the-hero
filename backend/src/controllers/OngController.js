const connection = require("../database/connection");
const crypton = require("crypto");
module.exports = {
	async index(resquest, response) {
		const ongs = await connection("ongs").select("*");
		return response.json(ongs);
	},

	async create(request, response) {
		const { name, email, whatsapp, city, uf } = request.body;
		const id = crypton.randomBytes(4).toString("HEX");
		await connection("ongs").insert({
			id,
			name,
			email,
			whatsapp,
			city,
			uf
		});
		return response.json({ id });
	}
};
