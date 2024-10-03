# Painel de Classificação

# Instalação

## Preparação do Projeto

Clone o repositório \
`git clone https://github.com/jeanarthur/painel-classificacao.git`

Instale as dependências do Node \
`npm install`

## Preparação do Banco

Instale o utilitário
`npm install -g sequelize-cli`

Inicialize o banco de dados
`npx sequelize-cli db:migrate`

# Execução

## Página

### Para testar somente as páginas (`index.html` ou `form.html`)
Abra o HTML no navegador ou instale a extensão do LiveServer no Visual Code.

### Para testar com servidor local 

Execute \
`node src/index.js`

Abra no navegador:
 - http://localhost:3000/ -> Para visualizar o painel de classificação
 - http://localhost:3000/formulario -> Para visualizar o formulário de registro de pontos
 - http://localhost:3000/status -> Para visualizar um 'OK' indicando que o servidor está respondendo


## Javascript (NodeJS)

### Para testar somente as funções 

Descomente a linha `// executar();` do arquivo `src/funcoes.js`

Execute \
`node src/funcoes.js`
