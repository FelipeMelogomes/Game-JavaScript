let vidas = 1;
let tempo = 60;
let contadorMosquitos = 0;

function desativarEventos(classe) {
  const elementos = document.querySelectorAll(`.${classe}`);

  elementos.forEach((elemento) => {
    elemento.removeEventListener('click', handleEventoClick);
    elemento.removeEventListener('selectstart', handleEventoSelecao);
  });

  function handleEventoClick(evento) {
    evento.preventDefault();
    evento.stopPropagation();
  }

  function handleEventoSelecao(evento) {
    evento.preventDefault();
  }
}

// toca musica
window.onclick = function () {
  const musica = document.getElementById('musica');
  musica.play();
};

// Altera a imagem do body aleatorio com o "click"
function changeBackgroundImage() {
  let imageArray = [
    'imagens/mapa2.jpg',
    'imagens/mapa3.jpg',
    'imagens/mapa4.jpg',
    'imagens/mapa5.jpg',
  ];

  let randomIndex = Math.floor(Math.random() * imageArray.length);
  let randomImage = imageArray[randomIndex];

  document.body.style.backgroundImage = `url('${randomImage}')`;
}

// obtém o nível do jogo a partir da URL da página
const nivel = window.location.search.replace('?', '') || 'normal';

// função para iniciar o jogo
function iniciarJogo() {
  const nivelSelecionado = document.getElementById('nivel').value;

  if (!nivelSelecionado) {
    alert('Selecione um nível para iniciar o jogo');
    return false;
  }

  window.location.href = `app.html?${nivelSelecionado}`;
}

// tempos por nível
const temposPorNivel = {
  facil: 2000,
  normal: 1500,
  medio: 1200,
  dificil: 1000,
  hard: 750,
  very_hard: 300,
};

// cria mosquito
const criaMosquitoTempo = temposPorNivel[nivel] || temposPorNivel.normal;

// obtém o tamanho da janela do navegador
function getTamanhoJanela() {
  const { innerHeight: altura, innerWidth: largura } = window;
  return { altura, largura };
}

const { altura, largura } = getTamanhoJanela();
console.log(altura, largura);

// Inicia o cronometro
function iniciarCronometro(tempoLimite, callbackVitoria) {
  const intervalo = 1000;
  let tempoRestante = tempoLimite;

  const cronometro = setInterval(function () {
    tempoRestante -= 1;
    if (tempoRestante < 0) {
      clearInterval(cronometro);
      callbackVitoria();
    } else {
      document.getElementById('cronometro').innerHTML = tempoRestante;
    }
  }, intervalo);

  return cronometro;
}

// finaliza o jogo
function finalizarJogo() {
  clearInterval(criaMosquito);
  window.location.href = 'vitoria.html';
}

const tempoLimite = 30;
const cronometro = iniciarCronometro(tempoLimite, finalizarJogo);

// remove o mosquito da tela
let mosquitosMortos = 0;

function removerMosquito() {
  document.getElementById('contagem-mosquitos').innerHTML =
    parseInt(document.getElementById('contagem-mosquitos').innerHTML) + 1;
  const mosquito = document.getElementById('mosquito');

  if (mosquito) {
    mosquito.remove();
    mosquitosMortos++;

    if (vidas > 3) {
      window.location.href = 'fim_de_jogo.html';
    } else {
      document.getElementById(`v${vidas}`).src = 'imagens/coracao_vazio.png';
      vidas++;
    }
  }
}

// cria um novo mosquito na tela
function criarMosquito() {
  const tamanhoMosquito = tamanhoAleatorio();
  const ladoMosquito = ladoAleatorio();
  const posicaoX = Math.max(0, Math.floor(Math.random() * largura) - 90);
  const posicaoY = Math.max(0, Math.floor(Math.random() * altura) - 90);

  const mosquito = document.createElement('img');
  mosquito.src = 'imagens/mosquito.png';
  mosquito.className = `${tamanhoMosquito} ${ladoMosquito}`;
  mosquito.style.left = `${posicaoX}px`;
  mosquito.style.top = `${posicaoY}px`;
  mosquito.style.position = 'absolute';
  mosquito.id = 'mosquito';
  mosquito.onclick = function () {
    this.remove();
  };

  document.body.appendChild(mosquito);
}

// posicao randomica
function posicaoRandomica() {
  removerMosquito();
  criarMosquito();
}

// tamanho aleatorio
function tamanhoAleatorio() {
  const classes = ['mosquito1', 'mosquito2', 'mosquito3'];
  const indiceAleatorio = Math.floor(Math.random() * classes.length);
  return classes[indiceAleatorio];
}

// lado aleatorio
function ladoAleatorio() {
  const lado = Math.floor(Math.random() * 2) === 0 ? 'ladoA' : 'ladoB';
  return lado;
}
