const IntegrationLog = require('../models/IntegrationLog');
const { transformPayload } = require('../services/transformationService');
const { forwardData } = require('../integrations/externalApi');
const logger = require('../services/logger');

const handleWebhook = async (req, res, next) => {
  const payload = req.body;
  const eventType = req.headers['x-event-type'] || 'generic_event';

  // 1. Logging: Registro inicial do recebimento do webhook
  const logEntry = new IntegrationLog({
    event_type: eventType,
    payload_received: payload,
    status: 'received'
  });

  try {
    await logEntry.save();
    logger.info(`[Webhook Controller] Webhook recebido: ${eventType}. Registrado com ID: ${logEntry._id}`);

    // 2. Data Validation & Transformation: Camada de processamento
    const transformedData = transformPayload(payload);
    logEntry.payload_transformed = transformedData;
    logEntry.status = 'processing';
    await logEntry.save();

    // 3. Forward: Encaminhar para o sistema de destino (com retry embutido na integração)
    const forwardResponse = await forwardData(transformedData);

    // 4. Update Log: Sucesso no encaminhamento
    logEntry.status = 'forwarded';
    logEntry.external_api_response = forwardResponse.data;
    await logEntry.save();

    res.status(200).json({
      status: 'success',
      message: 'Dados recebidos, transformados e encaminhados com sucesso.',
      integration_id: logEntry._id
    });

  } catch (error) {
    logger.error(`[Webhook Controller] Falha no processamento: ${error.message}`);
    
    // Atualizar log com o erro
    logEntry.status = 'failed';
    logEntry.error_message = error.message;
    await logEntry.save();

    next(error); // Encaminha para o middleware de erro global
  }
};

module.exports = { handleWebhook };
