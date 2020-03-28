const { celebrate, Segments, Joi } = require("celebrate");

module.exports = {
	index: celebrate({
		[Segments.QUERY]: Joi.object().keys({
			page: Joi.number()
		})
	}),
	create: celebrate({
		[Segments.HEADERS]: Joi.object({
			authorization: Joi.string().required()
		}).unknown(),
		[Segments.BODY]: Joi.object().keys({
			title: Joi.string()
				.required()
				.min(3),
			description: Joi.string().required(),
			value: Joi.number()
				.required()
				.default(0)
		})
	}),
	delete: celebrate({
		[Segments.PARAMS]: Joi.object().keys({
			id: Joi.number().required()
		}),
		[Segments.HEADERS]: Joi.object({
			authorization: Joi.string().required()
		}).unknown()
	})
};
