import { faker } from '@faker-js/faker';

describe('Página de Login', () => {
     
    
  beforeEach(() => {
    // Visita a página de login antes de cada teste
    cy.visit('https://qa.tev.net.br/login');
  });

  it('deve permitir o login com credenciais válidas', () => {
    // Intercepta a requisição de login
    cy.intercept('POST', '/api/user/sign-in').as('loginRequest');

    // Digita as credenciais de login e clica no botão de login
    cy.get('#socialId').should('be.visible').type('19490304662', { force: true }); // Usando force para garantir que o Cypress digite
    cy.get('#password').should('be.visible').type('1234', { force: true }); // Usando force
    cy.contains('button', 'Login').click();

    // Espera pela resposta da requisição de login
    cy.wait('@loginRequest');
    cy.wait(2000); // Tempo de espera adicional se necessário

    // Clica no menu ATPV-e
    cy.contains('span', 'ATPV-E').should('be.visible').click({ force: true });
    cy.wait(500); // Aguarda um tempo após clicar

    // Clica no botão ATPV-e
    cy.get('span.text-base').eq(2).click({ force: true });
    cy.wait(500);

    // Clica no botão "Cadastrar"
    cy.contains('span', 'Cadastrar').should('be.visible').click({ force: true });
    cy.wait(500);

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


    // Gera dados aleatórios para o formulário
      const generateRandomData = () => {
      const renavam = `${faker.number.int({ min: 1000000000000, max: 9999999999999 })}`;
      const numeroCRV = `${faker.number.int({ min: 10000000000, max: 99999999999 })}`; // Número CRV
      const numeroChassi = faker.string.numeric(17);
      console.log("Número de chassi gerado:", numeroChassi);
      const cnpj = `${faker.number.int({ min: 1000000000000, max: 9999999999999 })}`; // Gera um número de telefone aleatório com até 14 dígitos
      const nome = `${faker.name.firstName()} ${faker.name.lastName()}`;
      const telefone = `${faker.number.int({ min: 10000000000, max: 99999999999 })}`;
      const valor = `${faker.number.int({ min: 100000, max: 999999 })}`;
      const email = `${faker.internet.userName()}@qaalice.com`;

      //TODO:Achar uma forma de criar uma função pelo faker
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
      
      // Exemplo de uso
      const placa = gerarPlacaBrasileira();
      console.log("Placa brasileira gerada:", placa);

      
      //PREENCHE TODOS OS DADOS DIGITÁVEIS

      //DADOS DO VEÍCULO
      // preenche o renavan
      cy.get('input[name="renavam"]').should('be.visible').type(renavam, { force: true });
      //preenche o ca,po numero do crv com 11 digitos
      cy.get('input[name="crv_number"]').should('be.visible') .type(numeroCRV, {force: true});
      //preenche o chassi 
      cy.get('input[name=chassis').should('be.visible') .type(numeroChassi, {force: true});
      //preenche a placa 
      cy.get('input[name="license_plate"]').type(placa);
      //preenche a data do crv
      cy.get('input[placeholder="DD/MM/AAAA"]').eq(0).type('12092024');

      //DADOS DO VENDEDOR
      //cnpj do cendedor 
      cy.get('input[name="seller_document"]') .type(cnpj);
      //cpf do vendedor 
      cy.get('input[name="seller_subscriber_document"]') .type(cpfFormatado)
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
      //cpf comprador
      cy.get('input[name="buyer_subscriber_document"]') .type(cpfFormatado)

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
      
      // //especie de veículo 
      // cy.get('[data-testid="ArrowDropDownIcon"]').eq(1) .click();
      // cy.get('.MuiAutocomplete-popper li[data-option-index="2"]').click();
      // cy.wait(2000);

      // //marca do veíclo
      // cy.get('[data-testid="ArrowDropDownIcon"]').eq(2) .click();
      // cy.get('.MuiAutocomplete-popper li[data-option-index="2"]').click();
      // cy.wait(2000);
     
      // //modelo do veículo
      // cy.get('[data-testid="ArrowDropDownIcon"]').eq(3) .click();
      // cy.get('.MuiAutocomplete-popper li[data-option-index="2"]').click();
      // cy.wait(2000);

      //UF 
      cy.get('input[aria-autocomplete="list"]').eq(5) .click();
      cy.get('.MuiAutocomplete-popper li[data-option-index="2"]').click();
      cy.wait(2000);

      //Municipio 
      cy.get('input[aria-autocomplete="list"]').eq(6).click();
      cy.get('.MuiAutocomplete-popper li[data-option-index="5"]').click();
      cy.wait(2000);

//  //UF 
//  cy.get('input[aria-autocomplete="list"]').eq(3) .click();
//  cy.get('.MuiAutocomplete-popper li[data-option-index="9"]').click();
//  cy.wait(2000);

//  //Municipio 
//  cy.get('input[aria-autocomplete="list"]').eq(4)
//  cy.get('.MuiAutocomplete-popper li[data-option-index="3"]').click();
//  cy.wait(2000);

//  cy.get('input[aria-autocomplete="list"]').eq(5)
//  cy.get('.MuiAutocomplete-popper li[data-option-index="4"]').click();
//  cy.wait(2000);

//  cy.get('input[aria-autocomplete="list"]').eq(6)
//  cy.get('.MuiAutocomplete-popper li[data-option-index="5"]').click();
//  cy.wait(2000);


//  cy.get('input[name="sell_value"]') .type(10000);
 
//  cy.wait(2000);



  
      //clica no botão salvar 
      cy.get('button[type="submit"]').click();
    };

    generateRandomData();
  });
});


