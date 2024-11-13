import { faker } from '@faker-js/faker';

beforeEach(() => {
    // Visita a página de login antes de cada teste
    cy.visit('https://qa.tev.net.br/login');
});
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});

it('deve permitir o login com credenciais válidas e redirecionar para a página de cadastro de financeira', function () {
    const self = this;

    // Intercepta a requisição de login
    cy.intercept('POST', '/api/user/sign-in').as('loginRequest');

    // Digita as credenciais de login e clica no botão de login
    cy.get('#socialId').type('97848405028'); // CPF fixo
    cy.get('#password').type('1234'); // Senha fixa
    cy.contains('button', 'Login').click();

    // Espera pela resposta da requisição de login
    cy.wait('@loginRequest');
    cy.wait(2000); // Tempo de espera adicional se necessário
 // Navega para a página de cadastro de usuário

cy.visit('https://qa.tev.net.br/perfil');
//API faker para nome completo
 const nomecompleto = `${faker.name.firstName()} ${faker.name.lastName()}`; // Gera um nome completo aleatório

 cy.get('input[type="text"]').eq(0) .type(nomecompleto);
 cy.get('input[type="text"]').eq(1) . type('descrição qa');

 cy.get('button[class*="bg-green-"]').click();
 cy.wait(100);

 cy.visit('https://qa.tev.net.br/usuarios');
 cy.contains('span', 'Cadastrar').click();
 cy.wait(200); // Aguarda a pagina carregar para começar o cadastro 
 
  // Função para gerar CPF válido
 function gerarCPFValido() {
   // Gera os primeiros 9 dígitos de forma aleatória
   const cpf = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
 
   // Função para calcular os dígitos verificadores 
   function calcularDigito(cpf, fator) {
     let soma = 0;
     for (let i = 0; i < cpf.length; i++) {
       soma += cpf[i] * fator--;
     }
     const resto = (soma * 10) % 11;
     return resto === 10 ? 0 : resto;
   }
 
   // Calcula o primeiro dígito verificador
   const primeiroDigito = calcularDigito(cpf, 10);
   cpf.push(primeiroDigito);
 
   // Calcula o segundo dígito verificador
   const segundoDigito = calcularDigito(cpf, 11);
   cpf.push(segundoDigito);
 
   // Retorna o CPF como string sem formatação (somente os números)
   return cpf.join('');
 }
 
 // Função para formatar o CPF no padrão XXX.XXX.XXX-XX (se necessário)
 function formatarCPF(cpf) {
   return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
 }

 // Gerar um CPF válido
 const cpf = gerarCPFValido(); // Gera um CPF válido
 const cpfFormatado = formatarCPF(cpf); // Formata o CPF

 // Gera um e-mail aleatório no formato adequado
 const email = `${faker.internet.userName()}@example.com`;
 const telefone = `${faker.number.int({ min: 10000000000, max: 99999999999 })}`; // Gera um número de telefone aleatório com até 11 dígitos

 // Preenche os campos do formulário de cadastro
 cy.get('input[name="name"]').type(nomecompleto); // Preenche nome completo
 cy.get('input[name="socialId"]').type(cpfFormatado); // Preenche CPF formatado
 cy.get('input[name=email]').type(email); // Preenche e-mail
 cy.get('input[name="phone"]').type(telefone);


 // Clica no combobox e seleciona o perfil 'Master Alice financeiro'
 cy.get('input[role=combobox]').click();
 cy.get('li[role="option"]').eq(1) .click();


 // Clica no botão salvar
 cy.get('button.bg-green-600').click();
 cy.wait(1000);

    // Navega para a página de cadastro de financeira
    cy.visit('https://qa.tev.net.br/financeira/cadastro');

    // Gerar dados aleatórios usando o Faker
    const razaoSocial = faker.company.name(); // Gera um nome de empresa aleatório
    const nomeResponsavel = `${faker.name.firstName()} ${faker.name.lastName()}`; // Gera um nome completo aleatório
    const cnpj = `${faker.number.int({ min: 1000000000000, max: 9999999999999 })}`; // Gera um número de telefone aleatório com até 14 dígitos
    

    // Gera um e-mail temporário
    //cy.createTempEmail().then((emailTemporario) => {
      //  console.log("E-mail temporário gerado:", emailTemporario);



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

  });
