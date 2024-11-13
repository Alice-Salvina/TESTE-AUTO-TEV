describe('Testando combinações de Categoria e Produto', () => {
  
  it('Deve testar todas as combinações e registrar os resultados', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false; // Impede que o Cypress falhe por causa do erro da aplicação
    });
    // Visitar a página onde os elementos estão
    cy.visit('https://meuconsignado.neoconsig.com.br/administrativo/login');

    // Função para inserir a senha através do teclado numérico
    function digitarSenha(senha) {
      senha.split('').forEach(digito => {
        cy.contains('span', digito).click();
      });
    }

    cy.get('input#login').type('GERENCIAL1');
    
    // Abre o teclado
    cy.get('input[readonly="readonly"]').click();
    
    // Clicar repetidamente em 1 e 3 com espera
    const sequencia = ['1', '1', '3', '1', '3', '1', '3'];
    
    sequencia.forEach((num) => {
      cy.contains('span', num).click();
      cy.wait(500);  // Espera 500ms entre cada clique
    });
    
    // Esperar até que o botão esteja habilitado (classe `ui-keyboard-valid-input`)
    cy.get('button[data-value="accept"]')
      .should('have.class', 'ui-keyboard-valid-input')
      .click();  // Clica no botão apenas quando ele estiver habilitado

    // Clicar no botão acessar
    cy.get('a#botao_acessar').click();

    // Acessar o menu de Notificações e depois a sub-opção de Envio de Notificações
    cy.contains('span', 'Notificações').eq(0)
cy.get('li.parent span').eq(16).click();


cy.get('a[href="/administrativo/notificacao/index"] span').click();


    // Acessar a tela de criação de notificações
   // Acessar a tela de criação de notificações
  cy.visit('https://meuconsignado.neoconsig.com.br/administrativo/notificacao/create');

  // Clicar no filtro personalizado
  cy.get('input#notificacao-not_filtros_personalizados').click();

  // Abrir o dropdown de categorias
  cy.get('#select2-notificacao-not_categoria_cat_id-container').click();

  // Aguardar que as opções estejam visíveis
  cy.get('.select2-results__options', { timeout: 10000 }).should('be.visible');

  // Capturar as opções do combobox de Categoria
  cy.get('.select2-results__option').then(($categoriaOptions) => {
    const categorias = [];

    // Iterar sobre as opções de categoria e armazenar os textos
    $categoriaOptions.each((index, option) => {
      if (index > 0) { // Ignorar "Selecione"
        categorias.push(Cypress.$(option).text());
      }
    });

    // Capturar as opções do combobox de Produtos
    cy.get('#notificacao-not_produto_pro_id').then(($produtoOptions) => {
      const produtos = [];

      // Iterar sobre as opções de produto e armazenar os valores
      $produtoOptions.children('option').each((index, option) => {
        if (index > 0) { // Ignorar "Selecione"
          produtos.push(Cypress.$(option).text());
        }
      });

      // Iterar sobre todas as combinações de Categoria e Produto
      categorias.forEach((categoria) => {
        produtos.forEach((produto) => {
          
          // Selecionar a Categoria
          cy.get('#select2-notificacao-not_categoria_cat_id-container').click();
          cy.get('.select2-results__option').contains(categoria).click();

          // Selecionar o Produto
          cy.get('#notificacao-not_produto_pro_id').select(produto);

          // Clicar no botão para validar a quantidade de registros
          cy.get('button[type="button"]').eq(0).click();

          // Esperar pelo resultado e coletar a mensagem
          cy.get('.msgRetornoBusca', { timeout: 10000 }).should('be.visible').then(($msg) => {
            const resultado = $msg.text();

            // Registrar o resultado no log do Cypress
            cy.log(`Categoria: ${categoria}, Produto: ${produto}, Resultado: ${resultado}`);
          });
        });
      });
    });
  });
});
})