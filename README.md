# 💬 Live Chat com Spring, STOMP, JavaScript e CSS

Este projeto implementa um sistema de **chat em tempo real** utilizando **Spring Framework no backend** e **JavaScript com STOMP no frontend**. Ele foi desenvolvido como parte do meu portfólio com foco em aplicações web que combinam tecnologias modernas e comunicação assíncrona via WebSocket.

---

## 🚀 Tecnologias Utilizadas

- **Spring Framework** (Spring Boot, WebSocket, STOMP support)
- **JavaScript** (STOMP.js para comunicação cliente-servidor)
- **CSS** (customizado para responsividade e estilo da UI)
- **Broker interno**, podendo ser substituído por **RabbitMQ** ou **Kafka**

---

## 🧠 Visão Geral do Projeto

Este sistema simula uma aplicação de **chat ao vivo**, onde múltiplos usuários podem trocar mensagens instantaneamente. A comunicação entre os usuários é mediada por um **message broker**, configurado inicialmente com memória interna, mas com suporte a brokers externos como RabbitMQ ou Kafka.

A interação principal é feita por meio da biblioteca **STOMP** no frontend, que se conecta ao broker via WebSockets para receber e enviar mensagens.

---

## ⚙️ Como Funciona

### 📡 Backend (Spring Framework)

- O backend expõe endpoints WebSocket e gerencia os tópicos de mensagens.
- Utiliza o protocolo **STOMP sobre WebSocket** para abstrair a comunicação cliente-servidor.
- As mensagens recebidas são roteadas para tópicos específicos no broker.

### 🖥️ Frontend (JavaScript + STOMP.js)

- No frontend, é utilizado **STOMP.js** para criar a conexão com o broker.
- A constante `stompClient` define a comunicação com o servidor e implementa o listener `onConnect`, que:
    - **Monitora alterações de estado na interface** (como cliques em botões).
    - **Faz o subscribe** no canal de mensagens que será monitorado (por exemplo, `/topic/chat`).
    - Garante que as mensagens enviadas por outros usuários sejam recebidas em tempo real.

```
stompClient.onConnect = function (frame) {
    stompClient.subscribe('/topic/chat', function (messageOutput) {
        // Exibe a mensagem na interface
    });
};
```

## 🛠️ Configuração do Broker

Inicialmente é utilizado o **broker embutido no Spring** (`simpleBroker`).

A estrutura permite facilmente alternar para brokers externos como **RabbitMQ** ou **Apache Kafka**, bastando configurar o destino no backend.

---

## 📸 Interface

A interface foi construída com **CSS puro** e é totalmente responsiva. Permite:

- Envio de mensagens com campos de usuário e texto.
- Visualização em tempo real das mensagens enviadas por todos os usuários conectados.
- Feedback visual de conexão ativa com o broker.

---

## 📦 Como Executar o Projeto

### ✅ Pré-requisitos:

- Java 17+
- Maven ou Gradle
- Node.js (opcional, se houver build de frontend separado)

### ▶️ Backend (Spring Boot)

```
./mvnw spring-boot:run
# ou
./gradlew bootRun
```
### ▶️ Frontend

O frontend pode ser servido por qualquer servidor HTTP simples, como:

```
npx live-server
# ou
npx http-server
```
Também é possível integrá-lo diretamente ao backend Spring com @Controller servindo os arquivos HTML.

### 📚 Aprendizados
Este projeto foi essencial para aprimorar minha compreensão sobre:

- Comunicação bidirecional e assíncrona com WebSocket.
- Integração de STOMP no frontend com brokers no backend.
- Arquitetura event-driven, escalável com o uso de mensageria externa (RabbitMQ/Kafka).
- Estruturação de UI reativa e responsiva com CSS e JavaScript puros.