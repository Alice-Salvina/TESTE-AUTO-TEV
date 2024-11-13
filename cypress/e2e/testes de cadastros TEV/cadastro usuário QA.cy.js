import { faker } from '@faker-js/faker';

describe('cadastro de usuário', () => {
    //função executada antes de cada teste fazer o login
  beforeEach(() => {
    // Visita a página de login antes de cada teste
    cy.visit('https://qa.tev.net.br/login');
  });

  it('deve permitir o login com credenciais válidas', () => {
    // serve para monitorar quando essa requisição ocorre e inspecionar a resposta durante o teste.
    cy.intercept('POST', '/api/user/sign-in').as('loginRequest');

    // Digita as credenciais de login e clica no botão de login
    cy.get('#socialId').type('97848405028'); // CPF fixo (pode ser substituído se necessário)
    cy.get('#password').type('Neo@8700'); // Senha fixa (pode ser substituída)
    cy.contains('button', 'Login').click();

   
     
        cy.intercept('POST', '/api/user/sign-in').as('loginRequest');

    // Navega para a página de cadastro de usuário
    cy.visit('https://qa.tev.net.br/usuarios/cadastro');
    cy.get('button[type="submit"]').click();
    cy.wait(200); // Aguarda a pagina carregar para começar o cadastro 
    
    //API faker para nome completo
    const nomecompleto = `${faker.name.firstName()} ${faker.name.lastName()}`; // Gera um nome completo aleatório
    
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
   
    // Preenche os campos do formulário de cadastro
    cy.get('input[name=name]').type(nomecompleto); // Preenche nome completo
    cy.get('input[name=socialId]').type(cpfFormatado); // Preenche CPF formatado
    cy.get('input[name=email]').type(email); // Preenche e-mail

    // Clica no combobox e seleciona o perfil 'Master Alice financeiro'
    cy.get('input[role=combobox]').click();
    cy.get('li[role="option"]').eq(2) .click();

   
    // Clica no botão salvar
    cy.get('button.bg-green-600').click();
    });
});

