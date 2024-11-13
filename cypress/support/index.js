import 'dotenv/config';
import { MailSlurp } from 'mailslurp-client';

// Inicializa o MailSlurp
const mailslurp = new MailSlurp({ apiKey: process.env.MAILSLURP_API_KEY });

// Comando para criar um e-mail temporário
Cypress.Commands.add('createTempEmail', async () => {
    const inbox = await mailslurp.createInbox();
    return inbox.emailAddress; // Retorna o e-mail temporário
});