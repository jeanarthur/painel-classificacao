const express = require("express");
const morgan = require('morgan');
const path = require('path');
const { z } = require('zod');

const app = express();
const bodyParser = require('body-parser');
const { adicionarPontos, gerarClassificacao, obterPontuacoes } = require('./funcoes.js');

//Configuração do Squelize
const {Pontuacao} = require('../models');

const formularioSchema = z.object({
    team: z.string().min(1, "O nome da equipe é obrigatório"),
    score: z.string()
        .regex(/^[0-9]\d*$/, "A pontuação deve ser um número inteiro positivo")
});

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
    try{
        const parsedData = formularioSchema.parse(req.body);
            
        const { team, score } = parsedData;
        await adicionarPontos(team, score);

        const pontuacao = await obterPontuacoes();
        await Pontuacao.upsert({equipe:team, pontuacao:pontuacao[team].pontuacao});
        res.send(`A equipe ${team} marcou ${score} pontos`);
    } catch(error) {
        // Se a validação falhar, retorne um erro
        if (error instanceof z.ZodError) {
            return res.status(400).send(error.errors.map(e => e.message).join(', '));
        }
        
        if(error.name === 'SequelizeUniqueConstraintError') {
            res.send('Erro: Equipe em uso')
        } else {
            console.log(error)
            res.status(500).send('Erro interno do servidor');
        }
    }
});

app.listen(3000, () => {
    console.log("Servidor rodando...");
    console.log(`
        Para testes locais, abra no navegador:
        - http://localhost:3000/ -> Para visualizar o painel de classificação
        - http://localhost:3000/formulario -> Para visualizar o formulário de registro de pontos
        - http://localhost:3000/status -> Para visualizar um 'OK' indicando que o servidor está respondendo
    `);
});
