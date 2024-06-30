
    contagemRegressiva()  
    const cartas = [
        {
            id: 1,
            img: "https://i.pinimg.com/736x/1d/2c/21/1d2c21c6145d0bd92958cf6e36975714.jpg",
            numero: 1,
            virada: false
        },
        {
            id: 2,
            img: "https://i.pinimg.com/736x/1d/2c/21/1d2c21c6145d0bd92958cf6e36975714.jpg",
            numero: 1,
            virada: false
        },
        {
            id: 3,
            img: "https://i.pinimg.com/236x/ea/33/84/ea33849bd80e205515aa63685d4eb20a.jpg",
            numero: 2,
            virada: false
        },
        {
            id: 4,
            img: "https://i.pinimg.com/236x/ea/33/84/ea33849bd80e205515aa63685d4eb20a.jpg",
            numero: 2,
            virada: false
        },
        {
            id: 5,
            img: "https://i.pinimg.com/550x/ee/43/43/ee43430fa97a687aaeb5b47909d06fb7.jpg",
            numero: 3,
            virada: false
        },
        {
            id: 6,
            img: "https://i.pinimg.com/550x/ee/43/43/ee43430fa97a687aaeb5b47909d06fb7.jpg",
            numero: 3,
            virada: false
        },
        {
            id: 7,
            img: "https://i.pinimg.com/564x/9e/7c/ec/9e7cec9a458a66bae6321aeb00a3c183.jpg",
            numero: 4,
            virada: false
        },
        {
            id: 8,
            img: "https://i.pinimg.com/564x/9e/7c/ec/9e7cec9a458a66bae6321aeb00a3c183.jpg",
            numero: 4,
            virada: false
        },
        {
            id: 9,
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYCkl89H-LtVLkYFskSMR7eVI2j9PJca_41Q&s",
            numero: 5,
            virada: false
        },
        {
            id: 10,
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYCkl89H-LtVLkYFskSMR7eVI2j9PJca_41Q&s",
            numero: 5,
            virada: false
        },
        {
            id: 11,
            img: "https://i.pinimg.com/564x/63/c4/32/63c432985d21e90b12615457bd00602d.jpg",
            numero: 6,
            virada: false
        },
        {
            id: 12,
            img: "https://i.pinimg.com/564x/63/c4/32/63c432985d21e90b12615457bd00602d.jpg",
            numero: 6,
            virada: false
        },
        {
            id: 15,
            img: "https://i.pinimg.com/originals/bc/0f/cd/bc0fcdb7db3be2d6d18c23eda07e432b.jpg",
            numero: 8,
            virada: false
        },
        {
            id: 16,
            img: "https://i.pinimg.com/originals/bc/0f/cd/bc0fcdb7db3be2d6d18c23eda07e432b.jpg",
            numero: 8,
            virada: false
        },
        {
            id: 17,
            img: "https://img.wattpad.com/cover/80425138-288-k224315.jpg",
            numero: 9,
            virada: false
        },
        {
            id: 18,
            img: "https://img.wattpad.com/cover/80425138-288-k224315.jpg",
            numero: 9,
            virada: false
        },
        {
            id: 19,
            img: "https://i.pinimg.com/474x/87/2b/6d/872b6dc21335323f31f5cb9ff540b779.jpg",
            numero: 10,
            virada: false
        },
        {
            id: 20,
            img: "https://i.pinimg.com/474x/87/2b/6d/872b6dc21335323f31f5cb9ff540b779.jpg",
            numero: 10,
            virada: false
        }

    ]


    const ulCartas = document.querySelector('.cartas');
    let cartaClicada = null;
    let cartasSelecionadas = [];
    let cartasAcertadas = JSON.parse(localStorage.getItem('cartasCertas')) || [];
    
    let vidas = JSON.parse(localStorage.getItem('vidas')) || 7;
    const vidasTela = document.getElementById('lifes');
    
    let pCertos = JSON.parse(localStorage.getItem('pontos')) || 0;
    let pCertosTela = document.querySelector('.pontos-certos');
    let pTotais = cartas.length / 2;
    let pTotaisTela = document.querySelector('.pontos-totais');
    
    exibirPontuacao(pCertos);
    
    let jogarDeNovo = document.getElementById('jogar-novamente');
    
    const shuffle = (cartas) => {
        for (let i = cartas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
        }
    };
    
    function carregarCartas() {
        const cartasSalvas = JSON.parse(localStorage.getItem('memoria')) || [];
        cartasSalvas.forEach(cartaSalva => {
            const carta = cartas.find(c => c.id === cartaSalva.id);
            if (carta) {
                carta.virada = true;
                cartasAcertadas.push(carta);
            }
        });
        renderCartas();
        atualizarVidasTela();
        exibirPontuacao();
    }
    
    const renderCartas = () => {
        ulCartas.innerHTML = '';
        cartas.forEach((carta) => {
            const li = document.createElement('li');
            const img = document.createElement('img');
            li.appendChild(img);
    
            if (carta.virada) {
                img.src = carta.img;
                li.classList.remove('oculta');
            } else {
                img.src = '';
                li.classList.add('oculta');
            }
    
            li.onclick = () => {
                if (!carta.virada && cartasSelecionadas.length < 2) {
                    viraCarta(carta);
                }
            };
    
            ulCartas.appendChild(li);
        });
    };
    
    const viraCarta = (carta) => {
        if (!carta.virada && cartasSelecionadas.length < 2) {
            carta.virada = true;
            cartasSelecionadas.push(carta);
            renderCartas();
    
            if (cartasSelecionadas.length === 2) {
                setTimeout(compararCartas, 1000);
            }
        }
    };
    
    function compararCartas() {
        const [primeiraCarta, segundaCarta] = cartasSelecionadas;
        if (primeiraCarta.numero === segundaCarta.numero) {
            pCertos++;
            salvarPontos();
            exibirPontuacao();
            cartasAcertadas.push(primeiraCarta, segundaCarta);
            atualizaCartasCertas();
            if (pCertos === pTotais) {
                exibirGanhador();
            }
        } else {
            primeiraCarta.virada = false;
            segundaCarta.virada = false;
            vidas--;
            salvarVidas();
            atualizarVidasTela();
            if (vidas === 0) {
                encerrarJogo();
            }
        }
        cartasSelecionadas = [];
        renderCartas();
    }
    
    function salvarPontos() {
        localStorage.setItem('pontos', JSON.stringify(pCertos));
    }
    
    function salvarVidas() {
        localStorage.setItem('vidas', JSON.stringify(vidas));
    }
    
    function atualizarVidasTela() {
        vidasTela.innerText = vidas > 0 ? vidas : "FIM";
    }
    
    function exibirPontuacao() {
        pCertosTela.innerText = pCertos;
        pTotaisTela.innerText = pTotais;
    }
    
    function atualizaCartasCertas() {
        localStorage.setItem('memoria', JSON.stringify(cartasAcertadas));
    }
    
    function encerrarJogo() {
        if (pCertos < pTotais) {
            document.body.innerHTML = `
            <div class="tela-final">
                <h2 class="game-over">GAME OVER!</h2>
                <h3 class="pontuacao-final">Sua pontuação: ${pCertos}/${pTotais}</h3>
                <button id="jogar-novamente">Jogar novamente</button>
            </div>
            `;
        }
        localStorage.clear();
    }
    
    function exibirGanhador() {
        document.body.innerHTML = `
        <div class="tela-final">
            <h2 class="text-win">Você Ganhou!</h2>
            <button id="jogar-novamente">Jogar novamente</button>
        </div>
        `;
        localStorage.clear();
    }
    
    document.body.addEventListener('click', e => {
        if (e.target.id === 'jogar-novamente') {
            window.location.reload();
        }
    });
    
    shuffle(cartas);
    renderCartas();
    document.addEventListener('DOMContentLoaded', carregarCartas);
    
    if (localStorage.getItem('encerrarJogo')) {
        encerrarJogo();
        localStorage.removeItem('encerrarJogo');
    }