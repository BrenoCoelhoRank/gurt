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

// Seleciona o elemento que mostra o tempo para descobrir a senha
// Adicionei este seletor, caso ele não esteja no seu HTML, crie um span ou div com a classe 'entropia'
const valorEntropia = document.querySelector('.entropia');


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

for (let i = 0; i < checkbox.length; i++) { // Usei 'let' para 'i' para melhor prática
    checkbox[i].onclick = geraSenha;
}

geraSenha(); // Gera a senha inicial ao carregar a página

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

    // Se nenhum checkbox for selecionado, a senha não deve ser gerada ou deve ser vazia
    if (alfabeto.length === 0) {
        campoSenha.value = '';
        classificaSenha(0); // Passa 0 para entropia caso não haja caracteres
        return; // Sai da função
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
    console.log(entropia);

    // Remove todas as classes de força e define a largura inicial para 0
    forcaSenha.classList.remove('fraca', 'media', 'forte');
    forcaSenha.style.width = '0%'; // Garante que a barra comece vazia antes de preencher

    if (entropia > 57) {
        forcaSenha.classList.add('forte');
        forcaSenha.style.width = '100%'; // Define a largura para forte
    } else if (entropia > 35) { // Não precisa do '&& entropia < 57' pois a condição anterior já o exclui
        forcaSenha.classList.add('media');
        forcaSenha.style.width = '50%'; // Define a largura para média
    } else if (entropia > 0 && entropia <= 35) { // Adicionado entropia > 0 para senhas vazias
        forcaSenha.classList.add('fraca');
        forcaSenha.style.width = '25%'; // Define a largura para fraca
    }

    // Atualiza o texto de tempo para descobrir a senha
    if (tamanhoAlfabeto === 0 || entropia === 0) {
        valorEntropia.textContent = "Selecione pelo menos uma característica para a senha.";
    } else {
        const diasParaDescobrir = Math.floor(2 ** entropia / (100e6 * 60 * 60 * 24));
        if (diasParaDescobrir > 0) {
            valorEntropia.textContent = "Um computador pode levar até " + diasParaDescobrir + " dias para descobrir essa senha.";
        } else {
            // Para senhas muito fracas que levam menos de 1 dia
            valorEntropia.textContent = "Um computador pode levar pouco tempo para descobrir essa senha.";
        }
    }
}