const fs = require('fs').promises;

async function adicionarPontos(equipe, pontos){
    let pontuacoes = await obterPontuacoes();
    
    try {
        const temEquipe = Object.keys(pontuacoes).includes(equipe);

        if (temEquipe){
            pontuacoes[equipe].pontuacao = parseInt(pontuacoes[equipe].pontuacao) + parseInt(pontos);
        } else {
            pontuacoes[equipe] = {
                pontuacao: parseInt(pontos)
            }
        }

        await fs.writeFile('./src/pontuacao.json', JSON.stringify(pontuacoes));

    } catch (erro) {
        console.error(`Erro ao escrever arquivo: ${erro}`);
    }
}

async function gerarClassificacao() {
    let pontuacoes = await obterPontuacoes();
    pontuacoes.equipes = Object.keys(pontuacoes)
        .map(elem => { return { equipe: elem, pontuacao: parseInt(pontuacoes[elem].pontuacao) } });

    return pontuacoes.equipes.sort(function(a,b) {
        return a.pontuacao < b.pontuacao ? 1 : a.pontuacao > b.pontuacao ? -1 : 0;
    });
}

async function obterPontuacoes(){
    try {
        pontuacoes = await fs.readFile('./src/pontuacao.json', 'utf8');
        pontuacoes = JSON.parse(pontuacoes);
        return pontuacoes;
    } catch (erro){
        if (erro.code === 'ENOENT') {
            return await criarArquivoPontuacoes();
        } else {
            console.error(`Erro ao ler arquivo: ${erro}`);
        }
    }
}

async function criarArquivoPontuacoes(){
    try {
        pontuacoes = {};
        await fs.writeFile('./src/pontuacao.json', JSON.stringify(pontuacoes));
        return pontuacoes;

    } catch (erro) {
        console.error(`Erro ao criar arquivo de pontuações: ${erro}`);
    }
}

// Teste de adição e classificação de equipes
async function executar(){
    await adicionarPontos('xpto', 1);
    await adicionarPontos('xyz', 3);
    console.log(await gerarClassificacao());
}

// executar();

module.exports = {
    adicionarPontos,
    gerarClassificacao
}