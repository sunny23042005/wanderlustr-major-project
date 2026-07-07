const Joi = require("joi");
const listing = require("./models/listing");

module.exports.listingSchema = Joi.object({
    listing: Joi.object ({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        category: Joi.string(),
        image: Joi.object({
         filename: Joi.string().allow("", null),
          url: Joi.string().allow("", null)
          }).allow(null),
    }).required(),
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number()
       .min(1)
        .max(5)
            .required()
            .messages({
                "any.required": "Please select a rating",
                "number.base": "Please select a rating"
            }),
        comment: Joi.string().required(),
    }).required(),
});