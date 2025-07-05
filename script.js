const audio = document.getElementById('MusicaFundo');
const botao = document.querySelector('.btn-musica');
const musicaCarta = document.getElementById("MusicaCarta");
const btnCarta = document.querySelector(".carta-dentro button");

function mostrarMensagem(elemento) {
  const caixa = elemento.closest('.media-box-foto') || elemento.closest('.media-box-video');
  const texto = caixa.querySelector('.text-box');

  // Remover 'ativo' de todos os outros
  document.querySelectorAll('.media-box-foto, .media-box-video').forEach(c => {
    c.classList.remove('ativo');
  });

  // Adicionar 'ativo' no clicado
  caixa.classList.add('ativo');

  if (texto.classList.contains('mostrar')) {
    texto.classList.remove('mostrar');
    setTimeout(() => {
      texto.style.display = 'none';
      texto.textContent = '';
    }, 500);
  } else {
    const textoCompleto = texto.getAttribute('data-texto') || texto.textContent;
    texto.style.display = 'block';
    texto.textContent = '';
    texto.classList.add('mostrar');

    let i = 0;
    function digitar() {
      if (i < textoCompleto.length) {
        texto.textContent += textoCompleto.charAt(i);
        i++;
        setTimeout(digitar, 40);
      }
    }
    digitar();
  }
}

function alternarMusica() {
  if (!musicaCarta.paused) {
    musicaCarta.pause();
    if (btnCarta) btnCarta.textContent = " Tocar música";
  }

  if (audio.paused) {
    audio.play();
    botao.textContent = " Parar música";
  } else {
    audio.pause();
    botao.textContent = "Nossa música";
  }
}

window.addEventListener("load", () => {
  const caixas = document.querySelectorAll(".media-box-foto, .media-box-video");
  caixas.forEach((caixa, index) => {
    setTimeout(() => {
      caixa.classList.add("visivel");
    }, 200 * index);
  });
});

function abrirCarta() {
  const carta = document.getElementById("cartaAnimada");

  carta.classList.toggle("virada");

  if (!carta.classList.contains("virada")) {
    if (!musicaCarta.paused) {
      musicaCarta.pause();
      musicaCarta.currentTime = 0;
    }
    if (btnCarta) btnCarta.textContent = " Tocar música";
  }
}

function pararMusicaCarta(event) {
  event.stopPropagation();

  const musicaFundo = document.getElementById("MusicaFundo");

  if (!musicaFundo.paused) {
    musicaFundo.pause();
    botao.textContent = "Nossa música";
  }

  if (musicaCarta.paused) {
    musicaCarta.play();
    event.target.textContent = " Parar música";
  } else {
    musicaCarta.pause();
    event.target.textContent = " Tocar música";
  }
}

function atualizarContador() {
  const inicio = new Date('2019-09-21T00:00:00');
  const agora = new Date();
  let diff = agora - inicio;

  const segundos = Math.floor(diff / 1000) % 60;
  const minutos = Math.floor(diff / (1000 * 60)) % 60;
  const horas = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const diasTotais = Math.floor(diff / (1000 * 60 * 60 * 24));

  const inicioData = new Date(inicio);
  const agoraData = new Date(agora);

  let anos = agoraData.getFullYear() - inicioData.getFullYear();
  let meses = agoraData.getMonth() - inicioData.getMonth();
  let dias = agoraData.getDate() - inicioData.getDate();

  if (dias < 0) {
    meses--;
    dias += new Date(agoraData.getFullYear(), agoraData.getMonth(), 0).getDate();
  }
  if (meses < 0) {
    anos--;
    meses += 12;
  }

  const texto = `<br><strong>${anos} anos, ${meses} meses, ${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos</strong>`;
  document.getElementById('contadorTempo').innerHTML = texto;
}

setInterval(atualizarContador, 1000);
atualizarContador();

const videos = document.querySelectorAll('video');

videos.forEach(video => {
  video.addEventListener('play', () => {
    if (!audio.paused) {
      audio.volume = 0.2;
    }

    if (!musicaCarta.paused) {
      musicaCarta.pause();
      musicaCarta.currentTime = 0;
      if (btnCarta) btnCarta.textContent = " Tocar música";
    }
  });

  video.addEventListener('pause', () => {
    if (!audio.paused) {
      audio.volume = 1.0;
    }
  });

  video.addEventListener('ended', () => {
    if (!audio.paused) {
      audio.volume = 1.0;
    }
  });
});

window.addEventListener("scroll", () => {
  const galeria = document.getElementById("galeriaPolaroid");
  if (!galeria) return;
  const topoGaleria = galeria.getBoundingClientRect().top;
  const alturaJanela = window.innerHeight;

  if (topoGaleria < alturaJanela - 100) {
    galeria.classList.add("visivel");
  }
});

const mensagensCartas = [
  "Na Labia pq foi assim q me conquistou kkkkkk.",
  "Você é enngraçada.",
  "Você é linda perfeita e TOTOSONA.",
  "Seu sorriso é lindo.",
  "Seus olhos são Indescritíveis eles simplesmente me deixa hipnotizado.",
  "Você me faz rir independente do que aconteça.",
  "Inteligente, companheira, me trata como um principe e eu me amarro nisso."
];

function mostrarCartinhas() {
  document.getElementById('blocosCartas').style.display = 'flex';
}

function mostrarMensagemAtrasada(bloco, index) {
  let tempo = 2;
  bloco.onclick = null;
  bloco.innerHTML = `Esta mensagem irá abrir em ${tempo} segundos`;

  const intervalo = setInterval(() => {
    tempo--;
    if (tempo > 0) {
      bloco.innerHTML = `Esta mensagem irá abrir em ${tempo} segundos`;
    } else {
      clearInterval(intervalo);
      bloco.innerHTML = mensagensCartas[index];
    }
  }, 1000);
}

function mostrarMensagemBotao(botao) {
  const caixa = botao.closest('.media-box-video');
  const texto = caixa.querySelector('.text-box');

  // Remover 'ativo' de todos os outros
  document.querySelectorAll('.media-box-foto, .media-box-video').forEach(c => {
    c.classList.remove('ativo');
    c.querySelector('.text-box').classList.remove('mostrar');
    c.querySelector('.text-box').style.display = 'none';
  });

  // Mostrar só essa mensagem
  caixa.classList.add('ativo');

  const textoCompleto = texto.getAttribute('data-texto') || texto.textContent;
  texto.style.display = 'block';
  texto.textContent = '';
  texto.classList.add('mostrar');

  let i = 0;
  function digitar() {
    if (i < textoCompleto.length) {
      texto.textContent += textoCompleto.charAt(i);
      i++;
      setTimeout(digitar, 40);
    }
  }
  digitar();
}
