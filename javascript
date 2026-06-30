// Mapeamento dos elementos da interface
const display = document.getElementById('password-display');
const btnGenerate = document.getElementById('btn-generate');
const btnCopy = document.getElementById('btn-copy');
const slider = document.getElementById('length-slider');
const lengthVal = document.getElementById('length-val');
const indicator = document.getElementById('strength-indicator');

const chkUpper = document.getElementById('chk-uppercase');
const chkLower = document.getElementById('chk-lowercase');
const chkNumbers = document.getElementById('chk-numbers');
const chkSymbols = document.getElementById('chk-symbols');

// Dicionários de caracteres
const charSets = {
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lower: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>/?'
};

// Atualiza o contador de caracteres na tela em tempo real
slider.addEventListener('input', (e) => {
    lengthVal.textContent = e.target.value;
});

// Função para gerar a senha aleatória
function generatePassword() {
    let allowedChars = '';
    let typesCount = 0;

    if (chkUpper.checked) { allowedChars += charSets.upper; typesCount++; }
    if (chkLower.checked) { allowedChars += charSets.lower; typesCount++; }
    if (chkNumbers.checked) { allowedChars += charSets.numbers; typesCount++; }
    if (chkSymbols.checked) { allowedChars += charSets.symbols; typesCount++; }

    if (allowedChars === '') {
        display.value = 'Selecione 1 opção';
        updateStrength(0);
        return;
    }

    let password = '';
    const length = parseInt(slider.value);

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        password += allowedChars[randomIndex];
    }

    display.value = password;
    evaluateStrength(length, typesCount);
}

// Avalia a segurança baseado no tamanho e na variedade
function evaluateStrength(length, typesCount) {
    indicator.className = ''; // Limpa classes anteriores
    
    if (length < 8 || typesCount <= 1) {
        indicator.classList.add('weak');
    } else if (length >= 12 && typesCount >= 3) {
        indicator.classList.add('strong');
    } else {
        indicator.classList.add('medium');
    }
}

// Copiar para a área de transferência
btnCopy.addEventListener('click', () => {
    if (display.value && display.value !== 'Clique em Gerar' && display.value !== 'Selecione 1 opção') {
        navigator.clipboard.writeText(display.value);
        alert('Senha copiada com sucesso!');
    }
});

// Evento do botão principal
btnGenerate.addEventListener('click', generatePassword);
