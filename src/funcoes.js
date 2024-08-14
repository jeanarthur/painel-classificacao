const fs = require('node:fs/promises');

async function adicionarPontos(equipe, pontos){
    let pontuacoes = await obterPontuacoes();
    
    try {
        const index = pontuacoes.map(elem => elem.equipe).indexOf(equipe);

        if (index === -1){
            pontuacoes.push({
                equipe: equipe,
                pontuacao: pontos
            })
        } else {
            pontuacoes[index].pontuacao += pontos;
        }

        fs.writeFile('./pontuacao.json', JSON.stringify(pontuacoes));

    } catch (erro) {
        console.error(`Erro ao escrever arquivo: ${erro}`);
    }
}

async function gerarClassificacao() {
    let pontuacoes = await obterPontuacoes();
    return pontuacoes.sort(function(a,b) {
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

adicionarPontos('xpto', 1);
adicionarPontos('xyz', 3);
gerarClassificacao()
    .then(res => console.log(res));