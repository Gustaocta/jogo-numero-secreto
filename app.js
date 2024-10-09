let numerosSorteados = [];
let limite = 10;
let numeroSecreto = numeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, text) {
  let campo = document.querySelector(tag);
  campo.innerHTML = text;
  responsiveVoice.speak(text, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMsgInicial() {
  exibirTextoNaTela("h1", "Escolha um número");
  exibirTextoNaTela("p", "Escolha um número de 1 - 10");
}

exibirMsgInicial();

function verificarChute() {
  let chute = document.querySelector("input").value;

  if (chute == numeroSecreto) {
    exibirTextoNaTela("h1", "Acertou!");
    let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";

    let msgTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;

    exibirTextoNaTela("p", msgTentativas);

    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (chute > numeroSecreto) {
      exibirTextoNaTela("p", "O número secreto é menor!");
    } else {
      exibirTextoNaTela("p", "O número secreto é maior!");
    }
    tentativas++;
    limpaTela();
  }
}

function numeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * limite + 1);
  let quantidadeElementos = numerosSorteados.length;

  if(quantidadeElementos == limite) {
    numerosSorteados = [];
  }

  if(numerosSorteados.includes(numeroEscolhido)){
    return numeroAleatorio();
  } else{
        numerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limpaTela() {
  chute = document.querySelector("input");
  chute.value = "";
}

function reiniciarJogo() {
  numeroSecreto = numeroAleatorio();
  limpaTela();
  tentativas = 1;
  exibirMsgInicial();
  document.getElementById("reiniciar").setAttribute("disabled", true);
}
