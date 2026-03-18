const mongoose = require('mongoose');

const integrationLogSchema = new mongoose.Schema({
  event_type: { type: String, required: true },
  payload_received: { type: Object, required: true },
  payload_transformed: { type: Object },
  status: { type: String, enum: ['received', 'processing', 'forwarded', 'failed'], default: 'received' },
  external_api_response: { type: Object },
  error_message: { type: String },
  retries: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('IntegrationLog', integrationLogSchema);
