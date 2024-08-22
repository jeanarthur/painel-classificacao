const fs = require('node:fs/promises');

async function adicionarPontos(equipe, pontos){
    let pontuacoes = await obterPontuacoes();
    
    try {
        const temEquipe = Object.keys(pontuacoes).includes(equipe);

        if (temEquipe){
            pontuacoes[equipe].pontuacao += pontos;
        } else {
            pontuacoes[equipe] = {
                pontuacao: pontos
            }
        }

        await fs.writeFile('./pontuacao.json', JSON.stringify(pontuacoes));

    } catch (erro) {
        console.error(`Erro ao escrever arquivo: ${erro}`);
    }
}

async function gerarClassificacao() {
    let pontuacoes = await obterPontuacoes();
    pontuacoes.equipes = Object.keys(pontuacoes)
        .map(elem => { return { equipe: elem, pontuacao: pontuacoes[elem].pontuacao } });

    return pontuacoes.equipes.sort(function(a,b) {
        return a.pontuacao < b.pontuacao ? 1 : a.pontuacao > b.pontuacao ? -1 : 0;
    });
}

async function obterPontuacoes(){
    try {
        pontuacoes = await fs.readFile('./pontuacao.json', 'utf8');
        pontuacoes = JSON.parse(pontuacoes);
        return pontuacoes;
    } catch (erro){
        console.error(`Erro ao ler arquivo: ${erro}`);
    }
}

// Teste de adição e classificação de equipes
async function executar(){
    await adicionarPontos('xpto', 1);
    await adicionarPontos('xyz', 3);
    console.log(await gerarClassificacao());
}

//executar();