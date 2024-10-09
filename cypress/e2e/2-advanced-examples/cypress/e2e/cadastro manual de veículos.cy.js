import { faker } from '@faker-js/faker';

describe('cadastro de usuário', () => {
    //função executada antes de cada teste fazer o login
  beforeEach(() => {
    // Visita a página de login antes de cada teste
    cy.visit('http://localhost:3000/login');
  });

  it('deve permitir o login com credenciais válidas', () => {
    // serve para monitorar quando essa requisição ocorre e inspecionar a resposta durante o teste.
    cy.intercept('POST', '/api/user/sign-in').as('loginRequest');

    // Digita as credenciais de login e clica no botão de login
    cy.get('#socialId').type('07815571948'); // CPF fixo (pode ser substituído se necessário)
    cy.get('#password').type('1234'); // Senha fixa (pode ser substituída)
    cy.contains('button', 'Login').click();

    // Espera pela resposta da requisição de login
    cy.wait('@loginRequest');
    cy.wait(2000); // Tempo de espera adicional se necessário


  // Acessa a tela de cadastro manual de veículos 
    cy.visit('http://localhost:3000/atpve/veiculos');

    

const generateRandomData = () => {
  const renavam = `${faker.number.int({ min: 10000000000, max: 99999999999 })}`; // Renavam
 
  const numeroCRV = `${faker.number.int({ min: 10000000000, max: 99999999999 })}`; // Número CRV
  const placa = faker.vehicle.licensePlate(); // Placa (gerada com Faker)
  const chassi = faker.vehicle.vin(); // Chassi (gerado com Faker)
  const cnpjVendedor = faker.finance.creditCardNumber(); // CNPJ do vendedor (simulando um número)
  const nomeVendedor = faker.namevendedor.findName(); // Nome do vendedor
  const emailVendedor = faker.internet.email(nomeVendedor); // Email do vendedor
  const telefoneVendedor = faker.phone.number(); // Telefone do vendedor
  const cnpjComprador = faker.finance.creditCardNumber(); // CNPJ do comprador (simulando um número)
  const nomeComprador = faker.namecomprador.findName(); // Nome do comprador
  const emailComprador = faker.internet.email(nomeComprador); // Email do comprador
  
  

  cy.get ('input[name=renavam]'). type(renavam);
        
}})
  });