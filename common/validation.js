// Import Validation Package
const Joi = require('@hapi/joi');

//Register Validation

const registerValidation = data => {
    const registerSchema = Joi.object( {
        name: Joi.string().min(6).max(255).required(),
        email: Joi.string().email().required(),
        password : Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{7,10}$/)
                    .message('hello pwd error')
    })

    return registerSchema.validate(data);
}

const loginValidation = data => {
    const loginSchema = Joi.object( {
        email: Joi.string().email().required(),
        password : Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{7,10}$/)
                    .message('hello pwd error')
    })

    return loginSchema.validate(data);
}

module.exports = { registerValidation, loginValidation }
