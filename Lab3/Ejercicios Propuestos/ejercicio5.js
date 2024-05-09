document.getElementByI("formulario").addEventListener("submit", function(event) {
    
    let cantidadValores = parseInt(document.getElementById("cantidadValores").value);
    var tablaHTML = "<table><tr><th>Valores</th></tr>";
    for (let i = 0; i < cantidadValores; i++){
        let numero = Math.floor(Math.random() * 100) + 1;
            tablaHTML += "<tr><th>" + numero + "</th></tr>";
    }
    tablaHTML += "</table>";
    document.getElementById("tablaContainer").innerHTML = tablaHTML; 

    let valores = document.querySelectorAll("#tablaContainer table td");
    let suma = 0;
    for (let i = 0; i < valores.length; i++){
        suma += parseInt(valores[i]);
    }
    document.getElementById("resultado").innerText = "La suma total es: " + suma;
});

