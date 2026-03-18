const transformPayload = (data) => {
  // Simulação de transformação: normalizar nomes de campos
  // Exemplo: 'user_id' -> 'externalId', 'full_name' -> 'name'
  return {
    externalId: data.user_id || data.id || 'N/A',
    name: data.full_name || data.name || 'Desconhecido',
    email: data.email ? data.email.toLowerCase() : 'N/A',
    sourceSystem: 'API-Integration-Hub',
    receivedAt: new Date().toISOString(),
    originalData: { ...data }
  };
};

module.exports = { transformPayload };
