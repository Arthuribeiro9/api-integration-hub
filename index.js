require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const webhookRoutes = require('./routes/webhookRoutes');
const errorHandler = require('./middlewares/errorHandler');
const logger = require('./services/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware global para processar JSON e logs de requisição
app.use(bodyParser.json());
app.use((req, res, next) => {
  logger.info(`[Server] Recebida requisição ${req.method} para ${req.url}`);
  next();
});

// Rotas da API
app.use('/api/v1/webhook', webhookRoutes);

// Endpoint de Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', message: 'API Integration Hub está rodando.' });
});

// Middleware de Erro (Deve ser o último a ser definido)
app.use(errorHandler);

// Iniciar o Servidor após conexão com o Banco de Dados
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    logger.info(`[Server] API Integration Hub rodando na porta ${PORT}`);
  });
};

startServer();
