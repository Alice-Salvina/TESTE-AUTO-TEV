import { faker } from '@faker-js/faker';

describe('Teste de cadastro com dados aleatórios usando Faker.js', () => {
  it('Deve preencher o formulário com dados randômicos', () => {
    cy.visit('https://homologacao.tev.net.br/login');
});

it('deve permitir o login com credenciais válidas e redirecionar para a página de cadastro de financeira', () => {
  // Intercepta a requisição de login
  cy.intercept('POST', '/api/user/sign-in').as('loginRequest');

  // Digita as credenciais de login e clica no botão de login
  cy.get('#socialId').type('74726672002');
  cy.get('#password').type('Neo@8700');
  cy.contains('button', 'Login').click();

  // Espera pela resposta da requisição de login
  cy.wait(2000);

      // Navega para a página de cadastro de financeira
  cy.visit('https://homologacao.tev.net.br/financeira/cadastro');
  
    // Gera valores randômicos usando o Faker
    const cnpj = faker.finance.account(14); // Gera um número randômico com 14 dígitos (simulando CNPJ)
    const razaoSocial = faker.company.name(); // Gera um nome de empresa aleatório
    const cep = faker.address.zipCode('########'); // Gera um CEP no formato brasileiro
    const numero = faker.datatype.number({ min: 1, max: 100 }).toString(); // Número aleatório de 1 a 100
    const valorTev = faker.commerce.price(1000, 10000, 0); // Gera um valor de taxa TEV entre 1000 e 10000
    const nomeResponsavel = faker.name.firstName() + ' ' + faker.name.lastName(); // Gera um nome completo
    const telefone = faker.phone.number('###########'); // Gera um telefone aleatório
    const emailResponsavel = faker.internet.email(); // Gera um e-mail aleatório

    // Preenche o campo CNPJ com um valor aleatório
    cy.get('input[name="cnpj"]').type(cnpj);

    // Preenche o campo Razão Social com um valor aleatório
    cy.get('input[name="company_name"]').type(razaoSocial);

    // Preenche o campo CEP e aguarda o retorno do endereço
    cy.get('input[name="zip_code"]').type(cep);
    cy.wait(2000); // Aguarda 2 segundos para o endereço ser retornado
    cy.get('input[name="number"]').type(numero);

    // Preenche o campo Valor taxa TEV com um valor aleatório
    cy.get('input[name="rate_tev"]').type(valorTev);

    // Preenche dados do usuário responsável
    cy.get('input[name="name"]').type(nomeResponsavel);
    cy.get('input[name="phone_accountable"]').type(telefone);
    cy.get('input[name="email_accountable"]').type(emailResponsavel);

    // Clica no botão "Adicionar"
    cy.get('button').contains('Adicionar').click();
    //cy.get('input[role=combobox]');
    function clicarNaUltimaOpcao() {
      // Clica no input do combobox para abrir a lista de opções
      cy.get('input[aria-autocomplete="list"]').click(); // Seleciona o input do combobox
      
      // Aguarda as opções estarem visíveis e clica na última opção
      cy.get('.MuiAutocomplete-option') // Altere para o seletor correto para as opções, se necessário
        .should('be.visible') // Garante que as opções estão visíveis
        .last() // Seleciona a última opção
        .click(); // Clica na última opção
        
  }});
});