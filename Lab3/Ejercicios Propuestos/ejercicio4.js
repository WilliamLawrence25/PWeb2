function codigoMeet() {
    let link = document.getElementById("URL").value;
    let codigo = link.replace(/-/g, '');
    let codigoFinal = codigo.substring(codigo.lastIndexOf('/') + 1);
    document.getElementById("resultado").innerText = "Codigo de sesion: " + codigoFinal;
}

