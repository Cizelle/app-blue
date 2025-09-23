import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const envVarsSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
        PORT: Joi.number().default(5000),
        DATABASE_URL: Joi.string().required().description('PostgreSQL DB URL'),
        JWT_SECRET: Joi.string().required().description('JWT secret key'),
        JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30),
        JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30),
        SUPABASE_URL: Joi.string().required().description('Supabase project URL'),
        SUPABASE_SERVICE_KEY: Joi.string().required().description('Supabase service role key'),
    })
    .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export const env = {
    nodeEnv: envVars.NODE_ENV,
    port: envVars.PORT,
    dbUrl: envVars.DATABASE_URL,
    jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    },
    supabase: {
        url: envVars.SUPABASE_URL,
        serviceKey: envVars.SUPABASE_SERVICE_KEY,
    },
};