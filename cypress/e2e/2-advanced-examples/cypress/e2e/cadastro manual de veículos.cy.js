import { faker } from '@faker-js/faker';
import axios from 'axios';

describe('Página de Login', () => {
  let email;

  before(() => {
    // Gera um e-mail temporário antes de iniciar os testes
    cy.wrap(
      axios.get("https://temp-mail-api3.p.rapidapi.com/email/random", {
        headers: {
          'x-rapidapi-host': 'temp-mail-api3.p.rapidapi.com', // Correção: Use vírgula, não dois pontos
          'x-rapidapi-key': '2ef99efd36mshd8d7b3988596780p120cbbjsn12aa3ceb389e' // Sua chave RapidAPI
        }
      }).then(response => {
        // O formato do e-mail gerado depende da resposta da API
        email = response.data.email; // A API deve retornar um campo "email"
      }).catch(error => {
        // Tratamento de erro
        console.error('Erro ao obter e-mail temporário:', error);
        throw new Error('Falha ao gerar e-mail temporário'); // Para parar a execução do teste
      })
    );
  });
  
    
  beforeEach(() => {
    // Visita a página de login antes de cada teste
    cy.visit('https://homologacao.tev.net.br/login');
  });

  it('deve permitir o login com credenciais válidas', () => {
    // Intercepta a requisição de login
    cy.intercept('POST', '/api/user/sign-in').as('loginRequest');

    // Digita as credenciais de login e clica no botão de login
    cy.get('#socialId').should('be.visible').type('07815571948', { force: true }); // Usando force para garantir que o Cypress digite
    cy.get('#password').should('be.visible').type('1234', { force: true }); // Usando force
    cy.contains('button', 'Login').click();

    // Espera pela resposta da requisição de login
    cy.wait('@loginRequest');
    cy.wait(2000); // Tempo de espera adicional se necessário

    // Clica no menu ATPV-e
    cy.get('div.flex-col button').eq(1).should('be.visible').click({ force: true });
    cy.wait(500); // Aguarda um tempo após clicar

    // Clica no botão ATPV-e
    cy.get('span.text-left').eq(0).should('be.visible').click({ force: true });
    cy.wait(500);

    // Clica no botão "Cadastrar"
    cy.contains('span', 'Cadastrar').should('be.visible').click({ force: true });
    cy.wait(500);

    // Gera dados aleatórios para o formulário
      const generateRandomData = () => {
      const renavam = `${faker.number.int({ min: 1000000000000, max: 9999999999999 })}`;
      const numeroCRV = `${faker.number.int({ min: 10000000000, max: 99999999999 })}`; // Número CRV
      const chassi =  `${faker.number.int({ min: 10000000000, max: 99999999999 })}`; // Número chassi
      const placa = faker.vehicle.vrm(); // Placa (gerada com Faker)
      const cnpj = `${faker.number.int({ min: 1000000000000, max: 9999999999999 })}`; // Gera um número de telefone aleatório com até 14 dígitos
      const nome = `${faker.name.firstName()} ${faker.name.lastName()}`;
      const telefone = `${faker.number.int({ min: 10000000000, max: 99999999999 })}`;
      const valor = `${faker.number.int({ min: 100000, max: 999999 })}`;

      
      //PREENCHE TODOS OS DADOS DIGITÁVEIS

      //DADOS DO VEÍCULO
      // preenche o renavan
      cy.get('input[name="renavam"]').should('be.visible').type(renavam, { force: true });
      //preenche o ca,po numero do crv com 11 digitos
      cy.get('input[name="crv_number"]').should('be.visible') .type(numeroCRV, {force: true});
      //preenche o chassi 
      cy.get('input[name=chassis').should('be.visible') .type(chassi, {force: true});
      //preenche a placa 
      cy.get('input[name="license_plate"]').type(placa);
      //preenche a data do crv
      cy.get('input[placeholder="DD/MM/AAAA"]').eq(0).type('12092024');

      //DADOS DO VENDEDOR
      //cnpj do cendedor 
      cy.get('input[name="seller_document"]') .type(cnpj);
      //nome do vendedor
      cy.get('input[name="seller_name"]') .type(nome);
      //e-mail do vendedor 
      cy.get('input[name="seller_email"]') .type (email);
      //telefone do vendedor
      cy.get('input[name="seller_phone"]') .type (telefone)
      //CEP por enquanto será fixo 
      cy.get('input[name="seller_postal_code"]') .type('82820150');
      cy.wait(2000); 
      // preenche o numero 
      cy.get('input[name="seller_number"]') .type ('110')
      
      //DADOS DO COMPRADOR 
      //Cnpj do comprador
      cy.get('input[name="buyer_document"]') .type(cnpj);

      //Nome do comprador
      cy.get('input[name="buyer_name"]') .type(nome);
      
      //Email do comprador
      cy.get('input[name="buyer_email"]') .type (email);

      //Telefone do comprador
      cy.get('input[name="buyer_phone"]') .type(telefone);

      //cep do comprador por enquanto será fixo 
      cy.get('input[name="buyer_postal_code"]') .type('01310200');
      cy.wait(2000);

      //nº do endereço do comprador 
      cy.get('input[name="buyer_number"]') .type('13');
      
      //DADOS DA VENDA 
      //valor da venda 
      cy.get('input[name="sell_value"]') .type(valor);

     
      //seleciona os combobox

      //UF Licenciamento
      cy.get('[data-testid="ArrowDropDownIcon"]').eq(0) .click();
      cy.get('.MuiAutocomplete-popper li[data-option-index="6"]').click();
      
      //especie de veículo 
      cy.get('[data-testid="ArrowDropDownIcon"]').eq(1) .click();
      cy.get('.MuiAutocomplete-popper li[data-option-index="2"]').click();
      cy.wait(2000);

      //marca do veíclo
      cy.get('[data-testid="ArrowDropDownIcon"]').eq(2) .click();
      cy.get('.MuiAutocomplete-popper li[data-option-index="2"]').click();
      cy.wait(2000);
     
      //modelo do veículo
      cy.get('[data-testid="ArrowDropDownIcon"]').eq(3) .click();
      cy.get('.MuiAutocomplete-popper li[data-option-index="2"]').click();
      cy.wait(2000);

      //UF 
      cy.get('[data-testid="ArrowDropDownIcon"]').eq(8) .click();
      cy.get('.MuiAutocomplete-popper li[data-option-index="2"]').click();
      cy.wait(2000);

      //Municipio 
      cy.get('[data-testid="ArrowDropDownIcon"]').eq(9) .click();
      cy.get('.MuiAutocomplete-popper li[data-option-index="2"]').click();
      cy.wait(2000);
  
      //clica no botão salvar 
      cy.get('button[type="submit"]').click();









      




    
      




      
      
     
      

    };

    generateRandomData();
  });
});
