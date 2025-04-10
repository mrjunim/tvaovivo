const textoSobre = "StreamXcellence é um portal sombrio dedicado exclusivamente ao horror.";
let i = 0;

function digitarTexto() {
    if (i < textoSobre.length) {
        document.getElementById("texto-sobre").innerHTML += textoSobre.charAt(i);
        i++;
        setTimeout(digitarTexto, 50);
    }
}

window.onload = digitarTexto;
