const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client();
const conversations = [];
const timeoutDuration = 60000; // 60 segundos
const path = require('path'); // Importe o módulo 'path' para trabalhar com caminhos de arquivos

// Função para verificar a inatividade do usuário e encerrar a conversa, se necessário
function checkInactivity() {
    const currentTime = Date.now();
    conversations.forEach((conversation, index) => {
        if (currentTime - conversation.lastActivity >= timeoutDuration) {
            // Se o tempo desde a última atividade for maior ou igual ao tempo limite, encerra a conversa
            client.sendMessage(conversation.user, 'O atendimento foi encerrado devido à inatividade. Se precisar de mais ajuda, por favor, entre em contato novamente.');
            conversations.splice(index, 1);
        }
    });
}

// Verifica periodicamente se houve atividade dos usuários e encerra a conversa se não houver
setInterval(checkInactivity, 10000); // Verifica a cada 10 segundos

// Ouvir o evento 'qr' antes de iniciar o cliente
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async (message) => {
    if (!message.fromMe && !message.isGroupMsg) {
        let conversation = conversations.find(conversation => conversation.user === message.from);

        if (!conversation) {
            conversation = { user: message.from, lastActivity: Date.now() };
            conversations.push(conversation);
            await client.sendMessage(message.from, 'Olá, seja bem vindo(a) a Universo Tech 🪐📱. \nTrabalhamos com venda de acessórios para smartphone, computador, serviços, segunda via de conta, impressão, xerox etc. \nNos siga no Instagram para acompanhar as novidades da loja: \nhttps://www.instagram.com/universoo.tech/ \nEntão, como podemos te ajudar?\n Escolha uma opção:\n1. Atendimento\n2. Ver catálogo');
        } else {
            if (conversation.serviceRequested) {
                // Se serviceRequested for true, responde à mensagem do cliente
                if (message.body.toLowerCase() === '# sair') {
                    conversation.serviceRequested = false;
                    await client.sendMessage(message.from, 'Você voltou para o menu principal.\n\nEscolha uma opção:\n1. Atendimento\n2. Ver catálogo');
                } else if (!conversation.professionalResponded) {
                    // Se o profissional ainda não respondeu, não repita a mensagem do cliente
                    conversation.lastClientMessage = message.body; // Armazenar a última mensagem do cliente
                }
            } else if (conversation.catalogRequested) {
                if (message.body.toLowerCase() === '# sair') {
                    conversation.catalogRequested = false;
                    await client.sendMessage(message.from, 'Você voltou para o menu principal.\n\nEscolha uma opção:\n1. Atendimento\n2. Ver catálogo');
                } else {
                    await client.sendMessage(message.from, 'Opção inválida. Digite "# sair" para voltar para o menu principal.');
                }
            } else {
                if (message.body === '1') {
                    conversation.serviceRequested = true;
                    await client.sendMessage(message.from, 'Você escolheu Atendimento. Aguarde enquanto conectamos você com um de nossos profissionais.');
                } else if (message.body === '2') {
                    conversation.catalogRequested = true;
                    await client.sendMessage(message.from, 'Você escolheu Ver catálogo.');

                    // Enviar o documento PDF (substitua 'caminho/para/seu/catalogo.pdf' pelo caminho real do seu arquivo PDF)
                    const pdfFilePath = 'caminho/para/seu/catalogo.pdf'; 
                    await client.sendDocument(
                        message.from,
                        pdfFilePath,
                        { caption: 'Confira nosso catálogo em PDF:' }
                    );
                } else {
                    handleInvalidInput(message.from); // Lidar com a entrada inválida
                }
            }
            conversation.lastActivity = Date.now(); // Atualiza o tempo da última atividade do usuário
        }
    } else {
        // Se a mensagem for do próprio bot (profissional respondendo), marque como profissional já respondeu
        let conversation = conversations.find(conversation => conversation.user === message.to);
        if (conversation) {
            conversation.professionalResponded = true;
            // Se o profissional respondeu e o cliente enviou mais mensagens, responda apenas com a última mensagem do cliente
            if (conversation.lastClientMessage) {
                await client.sendMessage(message.to, conversation.lastClientMessage);
            }
        }
    }
});

// Função para lidar com entrada inválida
async function handleInvalidInput(recipient) {
    await client.sendMessage(recipient, 'Opção inválida. Por favor, escolha uma opção válida.');
}

// Inicializar o cliente WhatsApp
client.initialize();
