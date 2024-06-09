import Joi, { type ObjectSchema } from 'joi';
import { ValidationError } from '../utils/customErrors';

// const validator = (schema : ObjectSchema) => (payload : ObjectSchema) => schema.validate(payload, {abortEarly : false});

export const validate = <T>(schema: ObjectSchema, data: T) => {
    const { error, value } = schema.validate(data, { stripUnknown: true });
    if (error) {
        throw new ValidationError(error.message);
    }
    return value;
};

export const registerSchema : ObjectSchema = Joi.object({
    fullName : Joi.string().required().trim().max(255),
    username : Joi.string().required().trim(),
    // gender : Joi.string().valid('male', 'female').required().trim(),
    password : Joi.string().min(6).required().trim(),
    confirmPassword : Joi.ref('password'),
});

// export const validateRegister = validator(register);

export const loginSchema : ObjectSchema = Joi.object({
    username : Joi.string().required().trim(),
    password : Joi.string().min(6).required().trim(),
});