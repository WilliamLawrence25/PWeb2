document.addEventListener("DOMContentLoaded", function() {
    const btnConfirmadosRegion = document.getElementById('btnConfirmadosRegion');

    btnConfirmadosRegion.addEventListener('click', () => {
        // Realizar la solicitud
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "../data.json", true);
        xhr.onload = function() {
            if (xhr.status == 200) {
                var data = JSON.parse(xhr.responseText);
                mostrarConfirmadosPorRegion(data);
                btnConfirmadosRegion.style.display = 'none';
            } else {
                console.error('Error en la red:', xhr.statusText);
            }
        };
        xhr.onerror = function() {
            console.error('Error en la red.');
        };
        xhr.send();
    })
    
});

function mostrarConfirmadosPorRegion(data) {
    const regionesDiv = document.getElementById("regiones");

    // Objeto para almacenar el total de confirmados por region
    const confirmadosPorRegion = {};

    // Calcular el total de confirmados por región
    data.forEach((regionData) => {
        const region = regionData.region;
        const confirmados = regionData.confirmed.reduce((total, confirmado) => {
            return total + parseInt(confirmado.value);
        }, 0);
        confirmadosPorRegion[region] = confirmadosPorRegion[region] ? confirmadosPorRegion[region] + confirmados : confirmados;
    });

    // Mostrar el total por región
    for (let region in confirmadosPorRegion) {
        const totalConfirmados = confirmadosPorRegion[region];
        const paragraph = document.createElement("p");
        paragraph.textContent = region + ": " + totalConfirmados;
        regionesDiv.appendChild(paragraph);
    }
}
