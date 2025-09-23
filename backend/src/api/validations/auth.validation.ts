import Joi from 'joi';

const register = {
    body: Joi.object()
        .keys({
            role: Joi.string()
                .lowercase()
                .required()
                .valid('citizen', 'official', 'analyst'),

            fullname: Joi.string().required(),
            email: Joi.string().email().required(),
            phone: Joi.string().required(),
            password: Joi.string().min(8).required(),

            city: Joi.string().required(),
            state: Joi.string().required(),
            country: Joi.string().required(),

            // Only for official/analyst
            designation: Joi.string().when('role', {
                is: Joi.valid('official', 'analyst'),
                then: Joi.required(),
            }),
            organizationName: Joi.string().when('role', {
                is: Joi.valid('official', 'analyst'),
                then: Joi.required(),
            }),
            employeeId: Joi.string().when('role', {
                is: Joi.valid('official', 'analyst'),
                then: Joi.required(),
            }),
        })
        .required(),
};

const login = {
    body: Joi.object().keys({
        identifier: Joi.string().required(),
        password: Joi.string().required(),
    }),
};

export default { register, login };
