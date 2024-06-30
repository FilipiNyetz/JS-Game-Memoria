let cronometro = document.querySelector('.timer');
let tempoDecorrido = JSON.parse(localStorage.getItem('tempoRestante')) || 120;

function contagemRegressiva() {
    if (tempoDecorrido > 0) {
        mostrarTempo();
        tempoDecorrido--;
        localStorage.setItem('tempoRestante', JSON.stringify(tempoDecorrido));
        setTimeout(contagemRegressiva, 1000);
    } else {
        cronometro.textContent = 'Tempo esgotado';
        encerrarJogo();
    }
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorrido * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR', { minute: '2-digit', second: '2-digit' });
    cronometro.innerHTML = `${tempoFormatado}`;
}

function encerrarJogo() {
    // Enviar sinal para encerrar o jogo
    localStorage.setItem('encerrarJogo', 'true');
    localStorage.removeItem('tempoRestante'); // Remover o tempo restante ao encerrar o jogo
}

document.body.addEventListener('click', e => {
    if (e.target.id === 'jogar-novamente') {
        localStorage.removeItem('tempoRestante'); // Remover o tempo restante ao reiniciar o jogo
        window.location.reload();
    }
});

// Iniciar contagem regressiva quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    contagemRegressiva();
});
