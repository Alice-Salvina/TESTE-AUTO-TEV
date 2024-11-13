import { faker } from '@faker-js/faker';

beforeEach(() => {
    // Visita a página de login antes de cada teste
    cy.visit('https://qa.tev.net.br/login');
});

it('deve permitir o login com credenciais válidas e redirecionar para a página de cadastro de financeira', function () {
    const self = this;

    // Intercepta a requisição de login
    cy.intercept('POST', '/api/user/sign-in').as('loginRequest');

    // Digita as credenciais de login e clica no botão de login
    cy.get('#socialId').type('97848405028'); // CPF fixo
    cy.get('#password').type('Neo@8700'); // Senha fixa
    cy.contains('button', 'Login').click();

    // Espera pela resposta da requisição de login
    cy.wait('@loginRequest');
    cy.wait(2000); // Tempo de espera adicional se necessário

    // Navega para a página de cadastro de financeira
    cy.visit('https://qa.tev.net.br/financeira/cadastro');

    // Gerar dados aleatórios usando o Faker
    const razaoSocial = faker.company.name(); // Gera um nome de empresa aleatório
    const nomeResponsavel = `${faker.name.firstName()} ${faker.name.lastName()}`; // Gera um nome completo aleatório
    const telefone = `${faker.number.int({ min: 10000000000, max: 99999999999 })}`; // Gera um número de telefone aleatório com até 11 dígitos
    const cnpj = `${faker.number.int({ min: 1000000000000, max: 9999999999999 })}`; // Gera um número de telefone aleatório com até 14 dígitos
    const email = `${faker.internet.userName()}@example.com`;





    // Preenche o campo CEP
    cy.get('input[name="zip_code"]').type('82820150');
    cy.wait(4000);

    // Preenche o número do endereço
    cy.get('input[name="number"]').type('100');

    // Preenche o campo Razão Social com um valor aleatório
    cy.get('input[name="company_name"]').type(razaoSocial);

    //Preenche o campo de CNPJ
    cy.get('input[name="cnpj"]').type(cnpj);


    // Preenche o campo Valor taxa TEV com um valor fixo
    cy.get('input[name="rate_tev"]').type('10000');

    // Preenche dados do usuário responsável
    cy.get('.MuiInputBase-inputSizeSmall').eq(20).type(nomeResponsavel);
    cy.get('.MuiInputBase-inputSizeSmall').eq(21).type(email); // Usa o e-mail temporário
    cy.get('.MuiInputBase-inputSizeSmall').eq(22).type(telefone);

    // Clica no botão "Adicionar"
    cy.get('button').contains('Adicionar').click();

    // Clica no combobox
    cy.get('[data-testid=ArrowDropDownIcon]').click({ multiple: true });
    cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click();
    cy.get('.bg-amber-500').eq(1).click();

    // Digita o e-mail do usuário aleatório
    cy.get('.MuiInputBase-inputSizeSmall').eq(24).type(email); //email temporario
    //clica no botão adicionar o email de faturamento
    cy.get('.bg-amber-500').eq(2).click();
    //clica em ''salvar'' 
      cy.get('button[type="submit"]').click();

  });;
