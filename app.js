let listaDeNumerosSorteados = [];
let tentativas = 1;
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    if(chute==numeroSecreto){
        exibirTextoNaTela('h1','Você Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        exibirTextoNaTela('p',`Você precisou de ${tentativas} ${palavraTentativa}`);
        document.getElementById('reiniciar').removeAttribute('disabled');

    }
    else {
        if (chute > numeroSecreto) { exibirTextoNaTela ('p', '0 número secreto é menor');
        } else {
                exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeNúmerosSorteados = listaDeNumerosSorteados.length;
    if (quantidadeDeNúmerosSorteados == numeroLimite){
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }
    else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo(){
    let chute = document.querySelector('input');
    chute.value = '';
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1','Jogo do Número Secreto');
    exibirTextoNaTela('p','Escolha um número de 0 a 10');
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}