const logger = require('../services/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(`[Error Handler] ${err.message}`, { stack: err.stack });

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Erro interno no servidor de integração.',
    code: statusCode
  });
};

module.exports = errorHandler;
