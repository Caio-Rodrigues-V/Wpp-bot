# Configurar o Ambiente de Desenvolvimento:

1- Instalar o Node.js: Se o Node.js não estiver instalado, ela pode baixá-lo e instalá-lo em seu sistema a partir do site oficial: Node.js Downloads.

2- Criar um novo projeto Node.js: Ela pode criar um novo diretório para o projeto e inicializá-lo com npm. No terminal, ela pode navegar até o diretório desejado e executar o comando:
**npm init**  Isso guiará ela através do processo de criação do arquivo package.json.

3- instalar Dependências: Com o projeto inicializado, ela pode instalar as dependências necessárias, que são o whatsapp-web.js e qrcode-terminal, utilizando o comando:

# Obter Credenciais do WhatsApp Web:
1- Ela precisa acessar o WhatsApp Web em um navegador em seu computador. Ela pode visitar web.whatsapp.com.

2- No WhatsApp Web, ela precisa escanear o código QR exibido na tela usando o WhatsApp em seu dispositivo móvel. Isso vinculará o WhatsApp Web à sua conta do WhatsApp.

# Substituir o Código:
1- Ela precisa substituir o caminho para o arquivo PDF do catálogo pelo caminho real do arquivo no sistema. No código fornecido, o caminho para o arquivo PDF é definido pela variável pdfFilePath.

# Executar o Bot:
1- No terminal, dentro do diretório do projeto, ela pode executar o bot usando o Node.js. Ela precisa digitar o seguinte comando:
**node bot.js**

# Testar o Bot:
1- Após a inicialização do bot, ela pode testá-lo enviando mensagens para a conta do WhatsApp associada às credenciais usadas no bot. O bot responderá conforme a lógica definida no código.
Este guia deve ajudá-la a configurar e executar o bot com sucesso. Certifique-se de seguir cada etapa cuidadosamente para garantir que tudo funcione conforme o esperado.

# Funcionalidades
- Envio de mensagens automáticas.
- Opção de escolher entre serviços ou visualizar um catálogo.
- Encerramento automático da conversa após um período de inatividade.
- Envio de documentos, como um catálogo em PDF.
