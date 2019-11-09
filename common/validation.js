// Import Validation Package

const Joi = require('@hapi/joi');

// User register payload Validation

const registerValidation = data => {
    const registerSchema = Joi.object( {
        name: Joi.string().min(6).max(255).required().error(new Error('Name is required. Character length should be min 6 & max 255.')),
        email: Joi.string().email().required().error(new Error('Email is required & Please enter correct EMAIL FORMAT.')),
        password : Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{7,10}$/)
                    .required().error(new Error('Password should have min 7 & max 10 charactes.It should include number, special character such as !@#$%^&* and both lower & upper case character.'))
    })

    return registerSchema.validate(data);
}

// User fogin payload validation

const loginValidation = data => {
    const loginSchema = Joi.object( {
        email: Joi.string().email().required().error(new Error('Email is required & Please enter correct EMAIL FORMAT.')),
        password : Joi.string().required().error(new Error('Password is required.'))
    })

    return loginSchema.validate(data);
}

// Contact payload validation during insertion

const contactValidation = data => {
    const contactSchema = Joi.object( {
        name: Joi.string().min(6).max(255).required().error(new Error('Name is required. Character length should be min 6 & max 255.')),
        email: Joi.string().email().required().error(new Error('Email is required & Please enter correct EMAIL FORMAT.')),
        phone: Joi.number().min(10).required().error(new Error('Phone is required & It should be min 10 digit.')),
        address: Joi.string().max(300).required().error(new Error('Address is required & Character length should be max 300.'))
    })

    return contactSchema.validate(data);
}

// Contact payload validation during update

const contactUpdateValidation = data => {
    const contactSchema = Joi.object( {
        name: Joi.string().min(6).max(255).error(new Error('Name is required. Character length should be min 6 & max 255.')),
        email: Joi.string().email().error(new Error('Email is required & Please enter correct EMAIL FORMAT.')),
        address: Joi.string().max(300).error(new Error('Address is required & Character length should be max 300.'))
    })

    return contactSchema.validate(data);
}

module.exports = { registerValidation, loginValidation , contactValidation , contactUpdateValidation}
