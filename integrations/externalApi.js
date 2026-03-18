const axios = require('axios');
const axiosRetry = require('axios-retry').default;
const logger = require('../services/logger');

const apiClient = axios.create({
  baseURL: process.env.EXTERNAL_API_URL || 'https://jsonplaceholder.typicode.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': process.env.EXTERNAL_API_KEY || 'default-secret-key'
  }
});

// Configuração do Retry Mechanism: Tenta 3 vezes em caso de erro 5xx ou erro de rede
axiosRetry(apiClient, {
  retries: 3,
  retryDelay: (retryCount) => {
    logger.info(`[Retry Mechanism] Tentativa ${retryCount} de reenvio de dados...`);
    return retryCount * 2000; // Exponential backoff simplificado: 2s, 4s, 6s
  },
  retryCondition: (error) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.response?.status >= 500;
  }
});

const forwardData = async (payload) => {
  try {
    const response = await apiClient.post('/posts', payload); // Usando endpoint fake para simulação
    logger.info(`[External API] Dados enviados com sucesso para o sistema de destino. Status: ${response.status}`);
    return {
      status: 'success',
      data: response.data,
      statusCode: response.status
    };
  } catch (error) {
    logger.error(`[External API Error] Falha definitiva após retentativas: ${error.message}`);
    throw error;
  }
};

module.exports = { forwardData };
