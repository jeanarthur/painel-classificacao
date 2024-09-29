const express = require("express");
const morgan = require('morgan');
const path = require('path');

const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const { adicionarPontos, gerarClassificacao } = require('./funcoes.js');

//Configurar o EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'src')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./src/public'));
app.use(morgan('dev'));

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

app.post('/enviar-formulario', (req, res) => {
    const team = req.body.team;
    const score = req.body.score;
    adicionarPontos(team, score);

    fs.readFile('pontuacao.json', (err, data) => {
        let pontuacoes = [];

        if (!err) {
            pontuacoes = JSON.parse(data);
        }

        pontuacoes.push({ team, score });

        fs.writeFile('pontuacao.json', JSON.stringify(pontuacoes, null, 2), (err) => {
            if (err) {
                console.error('Erro ao salvar pontuações:', err);
                return res.status(500).send('Erro ao salvar pontuações.');
            }
            res.send(`A equipe ${team} marcou ${score} pontos`);
        });
    });
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
