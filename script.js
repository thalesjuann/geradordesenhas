const inputSenha = document.getElementById("senha");
const btnCopiar = document.getElementById("btn-copiar");
const msgCopiado = document.getElementById("msg-copiado");
const sliderTamanho = document.getElementById("tamanho");
const valorTamanho = document.getElementById("valor-tamanho");

const chkMaiusculas = document.getElementById("usar-maiusculas");
const chkMinusculas = document.getElementById("usar-minusculas");
const chkNumeros = document.getElementById("usar-numeros");
const chkSimbolos = document.getElementById("usar-simbolos");

const btnGerar = document.getElementById("btn-gerar");
const textoForca = document.getElementById("texto-forca");

const LETRAS_MAIUSCULAS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LETRAS_MINUSCULAS = "abcdefghijklmnopqrstuvwxyz";
const NUMEROS = "0123456789";
const SIMBOLOS = "!@#$%^&*()_+[]{}|;:,.<>?";

function aleatorio(str) {
  return str[Math.floor(Math.random() * str.length)];
}

function gerarSenha() {
  let caracteres = "";
  let senha = "";

  if (chkMaiusculas.checked) caracteres += LETRAS_MAIUSCULAS;
  if (chkMinusculas.checked) caracteres += LETRAS_MINUSCULAS;
  if (chkNumeros.checked) caracteres += NUMEROS;
  if (chkSimbolos.checked) caracteres += SIMBOLOS;

  if (caracteres === "") return "";

  for (let i = 0; i < sliderTamanho.value; i++) {
    senha += aleatorio(caracteres);
  }

  return senha;
}

function avaliarForca(senha) {
  let pontos = 0;
  if (senha.length >= 8) pontos++;
  if (/[A-Z]/.test(senha)) pontos++;
  if (/[0-9]/.test(senha)) pontos++;
  if (/[^A-Za-z0-9]/.test(senha)) pontos++;

  switch (pontos) {
    case 0:
    case 1:
      return { texto: "Fraca", cor: "red" };
    case 2:
      return { texto: "Média", cor: "orange" };
    case 3:
      return { texto: "Boa", cor: "yellow" };
    case 4:
      return { texto: "Forte", cor: "lime" };
  }
}

btnGerar.addEventListener("click", () => {
  const novaSenha = gerarSenha();
  inputSenha.value = novaSenha;

  const forca = avaliarForca(novaSenha);
  textoForca.textContent = forca.texto;
  textoForca.style.color = forca.cor;
});

btnCopiar.addEventListener("click", () => {
  if (!inputSenha.value) return;

  navigator.clipboard.writeText(inputSenha.value);
  btnCopiar.textContent = "✅";

  msgCopiado.classList.add("visivel");

  setTimeout(() => {
    btnCopiar.textContent = "📋";
    msgCopiado.classList.remove("visivel");
  }, 1500);
});

sliderTamanho.addEventListener("input", () => {
  valorTamanho.textContent = sliderTamanho.value;
});