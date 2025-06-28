const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*?';
const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca');

const valorEntropia = document.querySelector('.entropia');
const textoForca = document.querySelector('#texto-forca-senha');


botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;

function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}
function aumentaTamanho() {
    if (tamanhoSenha < 20) {
        tamanhoSenha++;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].onclick = geraSenha;
}

geraSenha();

function geraSenha() {
    let alfabeto = '';
    if (checkbox[0].checked) {
        alfabeto = alfabeto + letrasMaiusculas;
    }
    if (checkbox[1].checked) {
        alfabeto = alfabeto + letrasMinusculas;
    }
    if (checkbox[2].checked) {
        alfabeto = alfabeto + numeros;
    }
    if (checkbox[3].checked) {
        alfabeto = alfabeto + simbolos;
    }

    if (alfabeto.length === 0) {
        campoSenha.value = '';
        classificaSenha(0);
        return;
    }

    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        let numeroAleatorio = Math.random() * alfabeto.length;
        numeroAleatorio = Math.floor(numeroAleatorio);
        senha = senha + alfabeto[numeroAleatorio];
    }
    campoSenha.value = senha;
    classificaSenha(alfabeto.length);
}

function classificaSenha(tamanhoAlfabeto) {
    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);

    forcaSenha.classList.remove('fraca', 'media', 'forte');
    forcaSenha.style.width = '0%';
    if (textoForca) textoForca.textContent = '';

    if (entropia > 57) {
        forcaSenha.classList.add('forte');
        forcaSenha.style.width = '100%';
        if (textoForca) textoForca.textContent = 'Forte';
    } else if (entropia > 35) {
        forcaSenha.classList.add('media');
        forcaSenha.style.width = '50%';
        if (textoForca) textoForca.textContent = 'Média';
    } else if (entropia > 0 && entropia <= 35) {
        forcaSenha.classList.add('fraca');
        forcaSenha.style.width = '25%';
        if (textoForca) textoForca.textContent = 'Fraca';
    } else {
        forcaSenha.style.width = '0%';
        if (textoForca) textoForca.textContent = '';
    }

    if (tamanhoAlfabeto === 0 || entropia === 0 || isNaN(entropia)) {
        valorEntropia.textContent = "Selecione pelo menos uma característica para a senha.";
    } else {
        const diasParaDescobrir = Math.floor(2 ** entropia / (100e6 * 60 * 60 * 24));
        if (diasParaDescobrir > 0) {
            valorEntropia.textContent = "Um computador pode levar até " + diasParaDescobrir + " dias para descobrir essa senha.";
        } else {
            valorEntropia.textContent = "Um computador pode levar pouco tempo para descobrir essa senha.";
        }
    }
}