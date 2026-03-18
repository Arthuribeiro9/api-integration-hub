# API Integration Hub 🚀

**API Integration Hub** é um projeto backend profissional desenvolvido com **Node.js**, **Express** e **MongoDB**, projetado para atuar como uma camada intermediária de integração entre múltiplos sistemas externos.

Este projeto simula um serviço de backend robusto responsável por receber dados via **Webhooks**, processá-los (validação e transformação) e encaminhá-los para sistemas de destino com mecanismos de **retry** e **logging** detalhados.

---

## ✨ Key Features

- Webhook ingestion endpoint
- Data validation and transformation
- External API forwarding
- Automatic retry mechanism
- Integration event logging

## 🏗️ Arquitetura de Integração

O projeto segue uma arquitetura modular e desacoplada, garantindo escalabilidade e facilidade de manutenção. Abaixo está o fluxo de dados típico:

1.  **Webhook Ingestor**: Recebe payloads JSON de serviços externos (ex: Stripe, GitHub, CRMs).
2.  **Logging Layer**: Registra cada evento no MongoDB para auditoria e rastreabilidade.
3.  **Transformation Service**: Normaliza os dados recebidos para o formato esperado pelo sistema de destino.
4.  **Integration Layer (Axios)**: Realiza a comunicação com a API externa de destino.
5.  **Retry Mechanism**: Implementa políticas de re-tentativa automática (Exponential Backoff) para falhas temporárias de rede ou erros 5xx no destino.
6.  **Error Handling**: Middleware centralizado para captura e tratamento de exceções em qualquer estágio do pipeline.

---

## 🛠️ Tecnologias Utilizadas

*   **Runtime**: Node.js (v18+)
*   **Framework**: Express.js
*   **Banco de Dados**: MongoDB (via Mongoose)
*   **HTTP Client**: Axios (com `axios-retry` para resiliência)
*   **Logging**: Winston (armazenamento em arquivos e console)
*   **Segurança**: Dotenv para variáveis de ambiente e tratamento de erros centralizado.

---

## 📂 Estrutura do Projeto

```text
api-integration-hub/
├── config/             # Configurações de banco de dados e ambiente
├── controllers/        # Lógica de controle das rotas (Webhook handling)
├── integrations/       # Clientes de APIs externas e lógica de retry
├── middlewares/        # Tratamento de erros e validações globais
├── models/             # Esquemas do MongoDB (Logs de Integração)
├── routes/             # Definição dos endpoints da API
├── services/           # Regras de negócio, transformações e logger
├── .env.example        # Modelo de variáveis de ambiente
├── index.js            # Ponto de entrada da aplicação
└── README.md           # Documentação técnica
```

---

## 🚀 Como Iniciar

### Pré-requisitos
*   Node.js instalado.
*   Instância do MongoDB rodando localmente ou via Atlas.

### Instalação
1.  Clone o repositório ou baixe os arquivos.
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Configure o ambiente:
    *   Renomeie `.env.example` para `.env`.
    *   Ajuste `MONGODB_URI` e `EXTERNAL_API_URL` conforme necessário.

4.  Inicie o servidor:
    ```bash
    npm start
    ```

---

## 🔌 Endpoints Principais

### 1. Receber Webhook
*   **URL**: `POST /api/v1/webhook/receive`
*   **Header Recomendado**: `x-event-type: user_created`
*   **Payload Exemplo**:
    ```json
    {
      "user_id": "123",
      "full_name": "João Silva",
      "email": "JOAO@EXEMPLO.COM"
    }
    ```

### 2. Health Check
*   **URL**: `GET /health`
*   **Resposta**: `{"status": "UP"}`

---

## 🛡️ Resiliência e Monitoramento

*   **Retentativas Automáticas**: Em caso de falha na API de destino, o sistema tentará reenviar os dados até 3 vezes com atraso exponencial (2s, 4s, 6s).
*   **Logs de Auditoria**: Cada transação é salva no MongoDB com o status (`received`, `processing`, `forwarded`, `failed`), permitindo monitorar o sucesso das integrações em tempo real.
*   **Logs Locais**: Erros críticos são salvos automaticamente em `logs/error.log`.

---

## 📝 Licença
Este projeto é distribuído sob a licença MIT.
