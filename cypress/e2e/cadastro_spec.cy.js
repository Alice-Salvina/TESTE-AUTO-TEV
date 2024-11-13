// Importa o Faker.js
const faker = require('faker');

describe('Formulário de Cadastro', () => {
  it('deve preencher e enviar o formulário com dados falsos', () => {
    // Visita a página de cadastro
    cy.visit('http://localhost:3000/financeira/cadastro'); // Substitua pela URL real

    // Preenche o campo CNPJ com um valor gerado pelo Faker
    cy.get('#cnpj').type(faker.finance.taxId());

    // Preenche o campo Razão Social com um valor gerado pelo Faker
    cy.get('#razao-social').type(faker.company.companyName());

    // Preenche o campo CEP e aguarda o retorno do endereço
    cy.get('#cep').type(faker.address.zipCode());
    cy.wait(2000); // Aguarda 2 segundos para o endereço ser retornado
    cy.get('#numero').type('13');

    // Preenche o campo Valor taxa TEV
    cy.get('#valor-taxas').type('100');

    // Preenche o campo Nome completo com um valor gerado pelo Faker
    cy.get('#nome-completo').type(faker.name.findName());

    // Preenche o campo E-mail com um valor gerado pelo Faker
    cy.get('#email').type(faker.internet.email());

    // Preenche o campo #outlined-basic com o e-mail gerado pelo Faker
    cy.get('input.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputSizeSmall.css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input')
      .type(faker.internet.email());

    // Preenche o campo de telefone com um valor gerado pelo Faker
    cy.get('input[name="telefone"]').type(faker.phone.phoneNumber());

    // Seleciona a opção que contém a palavra "master" na caixa de seleção
    cy.get('select[name="selecao"]')
      .select(option => option.includes('master'));

    // Clica no botão "Adicionar"
    cy.get('button.h-[40px].px-2.5.py-2.text-base.font-semibold.text-center.text-white.whitespace-nowrap.bg-amber-500.rounded-sm.shadow-[0px_4px_4px_rgba(0,0,0,0.25)]')
      .contains('Adicionar')
      .click();

    // Clica no botão "Salvar"
    cy.get('button.h-[40px].px-2.5.py-2.5.text-base.w-[60%].font-semibold.text-center.text-white.whitespace-nowrap.bg-green-600.rounded-sm.shadow-[0px_4px_4px_rgba(0,0,0,0.25)]')
      .contains('Salvar')
      .click();

    // Adicione asserções conforme necessário para verificar o sucesso da operação
    cy.url().should('include', '/sucesso'); // Substitua pela URL real de sucesso
    cy.contains('Cadastro realizado com sucesso');
  });
});