const { MoleculerError } = require('moleculer').Errors;
const { ValidationError } = require('moleculer').Errors;

const createActionNotImplementedYetError = (serviceName, actionName) => {
  return new MoleculerError(`${serviceName}.${actionName} not implemented yet `, 501, 'ERR_NOT_IMPLEMENTED_YET');
};

const createConcatValidationError = (methodName, errors) => {
  return new ValidationError(`missing required values for ${methodName}`, 'ERR_CONCAT_BUS_PRE_VALIDATION', errors);
};

const createFromConcatError = (message, code, problem) => {
  return new MoleculerError(message, code, 'ERR_CONCAT_FROM_ERROR', problem);
};

const createRedisError = (message, code) => {
  return new MoleculerError(message, code, 'ERR_REDIS_ERROR');
};

const createPortfolioError = (message, code) => {
  return new MoleculerError(message, code, 'ERR_CONCAT_PORTFOLIO_NOT_FOUND');
};

const createConcatSenderError = (message, code) => {
  return new MoleculerError(message, code, 'ERR_CONCAT_SENDER');
};

const createConcatServiceError = (message, code) => {
  return new MoleculerError(message, code, '');
};

const createRedisMessageValidationError = (methodName, errors) => {
  return new ValidationError(`missing required values for ${methodName}`, 'ERR_REDIS_MESSAGE_BUS_PRE_VALIDATION', errors);
};

module.exports = {
  createActionNotImplementedYetError,
  createConcatValidationError,
  createFromConcatError,
  createRedisError,
  createPortfolioError,
  createConcatSenderError,
  createConcatServiceError,
  createRedisMessageValidationError
};
