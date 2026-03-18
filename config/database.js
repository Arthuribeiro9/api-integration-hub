const mongoose = require('mongoose');
const logger = require('../services/logger');

const connectDB = async () => {
  try {
    // No Mongoose v6+, as opções useNewUrlParser e useUnifiedTopology já são o padrão e não precisam ser passadas.
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/api-integration-hub';
    
    await mongoose.connect(mongoURI);
    logger.info('[Database] MongoDB conectado com sucesso.');
  } catch (error) {
    logger.error(`[Database Error] Falha na conexão: ${error.message}`);
    logger.info('[Database Tip] Certifique-se de que o MongoDB está rodando ou use o MongoDB Atlas (Cloud).');
    process.exit(1); 
  }
};

module.exports = connectDB;
