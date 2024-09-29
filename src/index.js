const express = require("express");
const path = require('path');
const app = express();
const { adicionarPontos, gerarClassificacao } = require('./funcoes.js')

app.use(express.static('./src/public'));

app.get('/', async (req, res) => {
    const options = {
        root: path.join('./src')
    };
 
    const fileName = 'index.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
});

app.get('/status', (req, res) => {
    res.send('OK');
})

app.get('/formulario', async (req, res) => {
    const options = {
        root: path.join('./src')
    };
 
    const fileName = 'form.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
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