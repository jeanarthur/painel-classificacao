const express = require("express");
const morgan = require('morgan');
const path = require('path');

const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const { adicionarPontos, gerarClassificacao } = require('./funcoes.js');

//Configuração do Squelize
const {Pontuacao} = require('../models');


//Configurar o EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./src/public'));
app.use(morgan('dev'));

app.get('/', async (req, res) => {
    const classificacao = await gerarClassificacao();
    res.render('index', { classificacao });
});

app.get('/status', (req, res) => {
    res.send('OK');
})

app.get('/formulario', async (req, res) => {
    const classificacao = await gerarClassificacao();
    res.render('form', { equipes: classificacao }); 
});

app.post('/enviar-formulario', async (req, res) => {
    const equipe = req.body.team;
    const pontuacao = req.body.score;
    adicionarPontos(equipe, pontuacao);
    try{
        await Pontuacao.create({equipe:equipe, pontuacao:pontuacao})
        res.send(`A equipe ${equipe} marcou ${pontuacao} pontos`);
    } catch(error) {
        if(error.name === 'SequelizeUniqueConstraintError') {
            res.send('Erro: Time em uso')
        } else {
            console.log(error)
            res.send('Erro ao cadastrar pontuacao')
        }
    }
    
    

    
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
