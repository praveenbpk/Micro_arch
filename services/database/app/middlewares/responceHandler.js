const { STATUS_CODES,STATUS_MESSAGE } = require('../utils/constants');

const responseHandler = () => {

    return async (ctx,next) => {

        /* 200 responses */
        ctx.success = ({ statusCode, data = null, count = null, message = null }) => {
            const status = STATUS_MESSAGE.SUCCESS;
            (statusCode && ((statusCode < STATUS_CODES.HTTP_MULTIPLE_CHOICE) && (statusCode >= STATUS_CODES.HTTP_OK))) ? (ctx.status(statusCode)) : (ctx.status(STATUS_CODES.HTTP_OK));
            const returnObj = { status, data, message };
            if (count != null) {
                returnObj.count = count;
            }
            ctx.send(returnObj);
        };
        
        /* 300 responses */
        ctx.redirect = ({ statusCode, data = null, error = null, message = null }) => {
            const status = STATUS_MESSAGE.REDIRECT;
            (statusCode && ((statusCode < STATUS_CODES.HTTP_BAD_REQUEST) && (statusCode >= STATUS_CODES.HTTP_MULTIPLE_CHOICE))) ? (ctx.status(statusCode)) : (ctx.status(STATUS_CODES.HTTP_MULTIPLE_CHOICE));
            ctx.send({ status, data, message, error });
        };

        /* 400 responses */
        ctx.clientError = ({ statusCode, data = null, error = null, message = null }) => {
            const status = STATUS_MESSAGE.CLIENT_ERROR;
            (statusCode && ((statusCode < STATUS_CODES.HTTP_INTERNAL_SERVER_ERROR) && (statusCode >= STATUS_CODES.HTTP_BAD_REQUEST))) ? (ctx.status(statusCode)) : (ctx.status(STATUS_CODES.HTTP_BAD_REQUEST));
            ctx.send({ status, data, message, error });
        };

        /* 500 responses */
        ctx.serverError = ({ statusCode, data = null, error = null, message = null }) => {
            const status = STATUS_MESSAGE.SERVER_ERROR;
            (statusCode && (statusCode < STATUS_CODES.HTTP_INTERNAL_SERVER_ERROR)) ? (ctx.status(statusCode)) : (ctx.status(STATUS_CODES.HTTP_BAD_REQUEST));
            ctx.send({ status, data, message, error });
        };
         /* 200 */
         ctx.ok = (params = {}) => {
            ctx.success({ ...params, statusCode: STATUS_CODES.HTTP_OK });
        };

        /* 201 */
        ctx.created = (params = {}) => {
            ctx.success({ ...params, statusCode: STATUS_CODES.HTTP_CREATED });
        };

        /* 202 */
        ctx.accepted = (params = {}) => {
            ctx.success({ ...params, statusCode: STATUS_CODES.HTTP_ACCEPTED });
        };

        /* 204 */
        ctx.noContent = (params = {}) => {
            ctx.success({ ...params, statusCode: STATUS_CODES.HTTP_NO_CONTENT });
        };

        /* 400 */
        ctx.badRequest = (params = {}) => {
            ctx.clientError({ ...params, statusCode: STATUS_CODES.HTTP_BAD_REQUEST });
        };

        /* 401 */
        ctx.unauthorized = (params = {}) => {
            ctx.clientError({ ...params, statusCode: STATUS_CODES.HTTP_UNAUTHORIZED });
        };

        /* 403 */
        ctx.forbidden = (params = {}) => {
            ctx.clientError({ ...params, statusCode: STATUS_CODES.HTTP_FORBIDDEN });
        };

        /* 404 */
        ctx.notFound = (params = {}) => {
            ctx.clientError({ ...params, statusCode: STATUS_CODES.HTTP_NOT_FOUND });
        };

        /* 406 */
        ctx.notAcceptable = (params = {}) => {
            ctx.clientError({ ...params, statusCode: STATUS_CODES.HTTP_NOT_ACCEPTABLE });
        };

        /* 408 */
        ctx.requestTimeout = (params = {}) => {
            ctx.clientError({ ...params, statusCode: STATUS_CODES.HTTP_REQUEST_TIMEOUT });
        };

        /* 409 */
        ctx.conflict = (params = {}) => {
            ctx.clientError({ ...params, statusCode: STATUS_CODES.HTTP_CONFLICT });
        };

        /* 422 */
        ctx.unprocessableEntity = (params = {}) => {
            ctx.clientError({ ...params, statusCode: STATUS_CODES.HTTP_UNPROCESSABLE_ENTITY });
        };

        /* 500 */
        ctx.internalServerError = (params = {}) => {
            ctx.serverError({ ...params, statusCode: STATUS_CODES.HTTP_INTERNAL_SERVER_ERROR });
        };

        /* 502 */
        ctx.badGateway = (params = {}) => {
            ctx.serverError({ ...params, statusCode: STATUS_CODES.HTTP_BAD_GATEWAY });
        };

        /* 503 */
        ctx.serviceUnavailable = (params = {}) => {
            ctx.serverError({ ...params, statusCode: STATUS_CODES.HTTP_SERVICE_UNAVAILABLE, });
        };

        /* 504 */
        ctx.gatewayTimeout = (params = {}) => {
            ctx.serverError({ ...params, statusCode: STATUS_CODES.HTTP_GATEWAY_TIMEOUT, });
        };

        await next();
    }
}
module.exports = responseHandler;
