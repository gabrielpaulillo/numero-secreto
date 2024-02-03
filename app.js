// let title = document.querySelector('h1');
// title.innerHTML = 'Jogo do número secreto';

// let paragraph = document.querySelector('p');
// paragraph.innerHTML = 'Escolha um número entre 1 e 10';

let arrRandomNum = [];
let maxArrLength = 100;
let randomNum = randomNumGenerator();
let attempts = 1;

// A função 'showTextOnScreen' foi criada como boas práticas, para evitar a repetição dos comandos em programação.
// Na função abaixo, são declaradas 2 parâmetros 'tag' e 'text', as quais serão declaradas pelo programador somente ao chamar a função.
// No JS, é permitido que a função seja declarada depois que essa é chamada, porém é somente no JS, logo, a melhor prática é primeiro criar a function e somente depois chamá-la.
function showTextOnScreen(tag, text) {
  let element = document.querySelector(tag);
  element.innerHTML = text;
  responsiveVoice.speak(text, 'Brazilian Portuguese Male', {rate:1.5});
}

function showStartMessage() {
  showTextOnScreen('h1', 'Jogo do número secreto');
  showTextOnScreen('p', 'Escolha um número entre 1 e 100');
}

showStartMessage();

function checkGuess() {
  let userGuess = document.querySelector('input').value;
  if (userGuess == randomNum) {
    showTextOnScreen('h1', 'Parabéns!');
    let singOrPlural = attempts > 1 ? 'tentativas' : 'tentativa';
    let victoryMessage = `Você acertou o número secreto em ${attempts} ${singOrPlural}!`;
    showTextOnScreen('p', victoryMessage);
    // '.getElementById' selecionará o elemento HTML que possui a id inserida entre os parênteses. Utilizamos essa nova forma, porque no documento HTML há 2 botões, colocássemos 'document.querySelector("button")' seria selecionado o primeiro botão. Porém, nós queremos o segundo botão.
    // Como gostaríamos de habilitar o botão 'Novo Jogo', temos que remover o atributo do elemento lá do HTML. Como o JavaScript é bem descritivo, ele possui a propriedade '.removeAttribute()' que remover o atributo especificado entre os parênteses. 
    document.getElementById('reiniciar').removeAttribute('disabled');
  } else if (userGuess > randomNum) {
    showTextOnScreen('p', 'O número secreto é menor.');
    attempts++;
    cleanGuessField();
  } else {
    showTextOnScreen('p', 'O número secreto é maior.');
    attempts++;
    cleanGuessField();
  }
}

function randomNumGenerator() {
  let randomChosenNum = parseInt(Math.random() * maxArrLength + 1);
  let arrLength = arrRandomNum.length;

  if (arrLength == maxArrLength) {
    arrRandomNum = [];
  }

  if (arrRandomNum.includes(randomChosenNum)) {
    return randomNumGenerator();
  } else {
    arrRandomNum.push(randomChosenNum);
    console.log(arrRandomNum);
    return randomChosenNum;
  }
}

function cleanGuessField() {
  let guessField = document.querySelector('input');
  guessField.value = '';
}

function restartGame() {
  randomNum = randomNumGenerator();
  showStartMessage();
  cleanGuessField();
  attempts = 1;
  // '.setAttribute()' adiciona ou mesmo muda o estado do atributo dentro do elemento HTML. No caso, queremos que o estado 'disabled' esteja ativo.
  document.getElementById('reiniciar').setAttribute('disabled', true);
}