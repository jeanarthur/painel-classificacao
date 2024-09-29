const express = require("express");
const path = require('path');
const app = express();
const { adicionarPontos, gerarClassificacao } = require('./funcoes.js');

//Configurar o EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'src')));

app.get('/', async (req, res) => {
    const options = {
        root: path.join('./src')
    };
    const classificacao = await gerarClassificacao();

    res.render('index', { classificacao });
});

app.get('/status', (req, res) => {
    res.send('OK');
})

app.get('/output.css', async (req, res) => {
    const options = {
        root: path.join('./src')
    };
 
    const fileName = 'output.css';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
});

app.get('/background.png', async (req, res) => {
    const options = {
        root: path.join('./src')
    };
 
    const fileName = 'background.png';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
});

app.get('/formulario', async (req, res) => {
    const options = {
        root: path.join('./src')
    };
 
    const classificacao = await gerarClassificacao();
    res.render('form', { equipes: classificacao }); 
});

app.get('/enviar-formulario', async (req, res) => {

    const team = req.query.team;
    const score = req.query.score;
    adicionarPontos(team,score)

    res.send(`A equipe ${team} marcou ${score} pontos`) 
});

app.listen(3000, ()=>{
    console.log("Servidor rodando...");
    console.log(`
        Para testes locais, abra no navegador:
        - http://localhost:3000/ -> Para visualizar o painel de classificação
        - http://localhost:3000/formulario -> Para visualizar o formulário de registro de pontos
        - http://localhost:3000/status -> Para visualizar um 'OK' indicando que o servidor está respondendo
    `);
});