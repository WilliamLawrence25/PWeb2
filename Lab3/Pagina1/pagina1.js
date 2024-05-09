function cambiarTamaño(accion) {
    var texto = document.getElementById("texto");
    var fontSize = window.getComputedStyle(texto).fontSize;
    var currentSize = parseFloat(fontSize);
    var newSize;

    if (accion === 'aumentar') {
        newSize = currentSize + 2;
    } else if (accion === 'disminuir') {
        newSize = currentSize - 2;
    }

    texto.style.fontSize = newSize + 'px';
}

function cambiarColor(color) {
    var texto = document.getElementById("texto");
    texto.style.color = color;
}
