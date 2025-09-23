import jwt from 'jsonwebtoken';
import moment from 'moment';
import { env } from '../../config/env.config';

/**
 * Generate a JWT token
 * @param {number} userId
 * @param {moment.Moment} expires
 * @param {string} secret
 * @returns {string}
 */
const generateToken = (userId: number, expires: moment.Moment, secret: string = env.jwt.secret): string => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
    };
    return jwt.sign(payload, secret);
};

/**
 * Generate auth tokens (access and refresh)
 * @param {User} user
 * @returns {Promise<Object>}
 */
export const generateAuthTokens = async (user: { user_id: number }) => {
    const accessTokenExpires = moment().add(env.jwt.accessExpirationMinutes, 'minutes');
    const accessToken = generateToken(user.user_id, accessTokenExpires);

    // Note: For a full implementation, you would also generate a refresh token
    // and store it in the database to manage sessions properly.

    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate(),
        },
    };
};