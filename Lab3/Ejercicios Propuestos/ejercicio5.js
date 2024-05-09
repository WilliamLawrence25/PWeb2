document.getElementById("formulario").addEventListener("submit", function(event) {
    event.preventDefault();

    let cantidadValores = parseInt(document.getElementById("cantidadValores").value);
    var tablaHTML = "<table><tr><th>Valores</th></tr>";
    let suma = 0;
    for (let i = 0; i < cantidadValores; i++) {
        let numero = Math.floor(Math.random() * 100) + 1;
        tablaHTML += "<tr><th>" + numero + "</th></tr>";
        suma += numero;
    }
    tablaHTML += "</table>";
    document.getElementById("tablaContainer").innerHTML = tablaHTML;

    document.getElementById("resultado").innerText = "La suma total es: " + suma;
});
