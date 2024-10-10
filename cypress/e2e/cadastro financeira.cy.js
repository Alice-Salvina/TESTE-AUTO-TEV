import { faker } from '@faker-js/faker';
import axios from 'axios';

describe('Página de Login', () => {
  let emailResponsavel;

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
        emailResponsavel = response.data.email; // A API deve retornar um campo "email"
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

  it('deve permitir o login com credenciais válidas e redirecionar para a página de cadastro de financeira', () => {
    // Intercepta a requisição de login
    cy.intercept('POST', '/api/user/sign-in').as('loginRequest');

    // Digita as credenciais de login e clica no botão de login
    cy.get('#socialId').type('74726672002'); // CPF fixo
    cy.get('#password').type('Neo@8700'); // Senha fixa
    cy.contains('button', 'Login').click();

    // Espera pela resposta da requisição de login
    cy.wait('@loginRequest');
    cy.wait(2000); // Tempo de espera adicional se necessário

    // Navega para a página de cadastro de financeira
    cy.visit('https://homologacao.tev.net.br/financeira/cadastro');

    // Gerar dados aleatórios usando o Faker
    const razaoSocial = faker.company.name(); // Gera um nome de empresa aleatório
    const nomeResponsavel = `${faker.name.firstName()} ${faker.name.lastName()}`; // Gera um nome completo aleatório
    const telefone = `${faker.number.int({ min: 10000000000, max: 99999999999 })}`; // Gera um número de telefone aleatório com até 11 dígitos
    const cnpj = `${faker.number.int({ min: 1000000000000, max: 9999999999999 })}`; // Gera um número de telefone aleatório com até 14 dígitos


    // Preenche o campo CEP
    cy.get('input[name="zip_code"]').type('82820150');
    cy.wait(4000);

    // Preenche o número do endereço
    cy.get('input[name="number"]').type('100');

    // Preenche o campo Razão Social com um valor aleatório
    cy.get('input[name="company_name"]').type(nomeResponsavel);

    //Preenche o campo de CNPJ
    cy.get('input[name="cnpj"]').type(cnpj);


    // Preenche o campo Valor taxa TEV com um valor fixo
    cy.get('input[name="rate_tev"]').type('10000');

    // Preenche dados do usuário responsável
    cy.get('.MuiInputBase-inputSizeSmall').eq(20).type(nomeResponsavel);
    cy.get('.MuiInputBase-inputSizeSmall').eq(21).type(emailResponsavel); // Usa o e-mail temporário
    cy.get('.MuiInputBase-inputSizeSmall').eq(22).type(telefone);

    // Clica no botão "Adicionar"
    cy.get('button').contains('Adicionar').click();

    // Clica no combobox
    cy.get('[data-testid=ArrowDropDownIcon]').click({ multiple: true });
    cy.get('.MuiAutocomplete-popper li[data-option-index="3"]').click();
    cy.get('.bg-amber-500').eq(1).click();

    // Digita o e-mail do usuário aleatório
    cy.get('.MuiInputBase-inputSizeSmall').eq(24).type(emailResponsavel);
    //clica no botão adicionar o email de faturamento
    cy.get('.bg-amber-500').eq(2).click();
    //clica em ''salvar'' 
      cy.get('button[type="submit"]').click();
  });
});
