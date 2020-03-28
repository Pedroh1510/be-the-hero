const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");

const newOng = {
	name: "aaa",
	email: "ong@ong.com",
	whatsapp: "11123456789",
	city: "são paulo",
	uf: "Sp"
};

describe("ONG", () => {
	beforeEach(async () => {
		await connection.migrate.rollback();
		await connection.migrate.latest();
	});

	afterAll(async () => {
		await connection.destroy();
	});

	it("should be able to create a new ONG", async () => {
		const response = await request(app)
			.post("/ongs")
			.send(newOng);

		expect(response.body).toHaveProperty("id");
		expect(response.body.id).toHaveLength(8);
	});

	it("should be able to list ONGs", async () => {
		await request(app)
			.post("/ongs")
			.send(newOng);
		const response = await request(app).get("/ongs");

		expect(response.body[0]).toHaveProperty("id");
	});
});
