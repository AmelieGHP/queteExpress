const Joi = require("joi");
const movieSchema = Joi.object({
    title: Joi.string().max(255).required(),
    director: Joi.string().max(255).required(),
    year: Joi.number().integer().required(),
    color: Joi.boolean().required(),
    duration: Joi.number().integer().required(),
})

const validateMovie = (req, res, next) => {
    const { title, director, year, color, duration } = req.body;
    const { error } = movieSchema.validate(
        { title, director, year, color, duration },
        { abortEarly: false }
    );

    if (error) {
        res.status(422).json({ validationErrors: error.details });
    } else {
        next();
    }
};

const userSchema = Joi.object({
    firstname: Joi.string().max(255).required(),
    lastname: Joi.string().max(255).required(),
    email: Joi.string().email().max(255).required(),
    city: Joi.string().max(255).required(),
    language: Joi.string().max(255).required(),
});

const validateUser = (req, res, next) => {
    const { firstname, lastname, email, city, language } = req.body;

    const { error } = userSchema.validate(
        { firstname, lastname, email, city, language },
        { abortEarly: false }
    );

    if (error) {
        res.status(422).json({ validationErrors: error.details });
    } else {
        next();
    }
};

/*const validateMovie = (req, res, next) => {
    // validate req.body then call next() if everything is ok
    const { title, director, year, color, duration } = req.body;
    const errors = [];

    if (title == null) {
        errors.push({ field: "title", message: "This field is required" });
    } else if (title.length >= 255) {
        errors.push({ field: "title", message: "Should contain less than 255 characters" });
    }
    else {
        next();
    }
    if (director == null) {
        errors.push({ field: "director", message: "This field is required" });
    } else {
        next();
    }
    if (year == null) {
        errors.push({ field: "year", message: "This field is required" });
    } else {
        next();
    }
    if (color == null) {
        errors.push({ field: "color", message: "This field is required" });
    } else {
        next();
    }
    if (duration == null) {
        errors.push({ field: "title", message: "This field is required" });
    } else {
        next();
    }
    if (errors.length) {
        res.status(422).json({ validationErrors: errors });
    } else {
        next();
    }
};*/

module.exports = {
    validateMovie,
    validateUser
};