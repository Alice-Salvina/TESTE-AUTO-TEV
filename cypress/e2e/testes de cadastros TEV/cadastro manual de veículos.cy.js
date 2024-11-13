import { faker } from '@faker-js/faker';

describe('Página de Login', () => {
     
    
  beforeEach(() => {
    // Visita a página de login antes de cada teste
    cy.visit('https://homologacao.tev.net.br/login');
  });

  it('deve permitir o login com credenciais válidas', () => {
    // Intercepta a requisição de login
    cy.intercept('POST', '/api/user/sign-in').as('loginRequest');

    // Digita as credenciais de login e clica no botão de login
    cy.get('#socialId').type('99635416075'); // CPF fixo (pode ser substituído se necessário)
    cy.get('#password').type('Neo@8700'); // Senha fixa (pode ser substituída)
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
    function gerarPlacaBrasileira() {
      const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const numeros = "0123456789";
      
      // Gerando as 3 primeiras letras
      const letrasIniciais = Array.from({ length: 3 }, () => letras[Math.floor(Math.random() * letras.length)]).join('');
      
      // Gerando o número, a letra e os números finais
      const numeroLetra = numeros[Math.floor(Math.random() * numeros.length)] +
                          letras[Math.floor(Math.random() * letras.length)] +
                          numeros[Math.floor(Math.random() * numeros.length)] +
                          numeros[Math.floor(Math.random() * numeros.length)];
    
      return letrasIniciais + numeroLetra;
    }
    


    // Gera dados aleatórios para o formulário
      const generateRandomData = () => {
      const renavam = `${faker.number.int({ min: 1000000000000, max: 9999999999999 })}`;
      const numeroCRV = `${faker.number.int({ min: 10000000000, max: 99999999999 })}`; // Número CRV
      const chassi =  `${faker.number.int({ min: 10000000000, max: 99999999999 })}`; // Número chassi
      const cnpj = `${faker.number.int({ min: 1000000000000, max: 9999999999999 })}`; // Gera um número de telefone aleatório com até 14 dígitos
      const nome = `${faker.name.firstName()} ${faker.name.lastName()}`;
      const telefone = `${faker.number.int({ min: 10000000000, max: 99999999999 })}`;
      const valor = `${faker.number.int({ min: 100000, max: 999999 })}`;
      const email = `${faker.internet.userName()}@example.com`;
      const placa = gerarPlacaBrasileira();
    console.log("Placa brasileira gerada:", placa);

      
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
