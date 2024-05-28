document.addEventListener("DOMContentLoaded", () => {
    const btnMostrarRegiones = document.getElementById('btnMostrarRegiones');

    btnMostrarRegiones.addEventListener('click', () => {
        fetch('../data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la red');
                }
                return response.json();
            })
            .then(data => {
                mostrarRegiones(data);
                btnMostrarRegiones.style.display = 'none';
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});

function mostrarRegiones(data) {
    const regionList = document.getElementById('regionList');
    const casosConfirmadosPorRegion = {};

    data.forEach(regionData => {
        const region = regionData.region;
        let totalCasosConfirmados = 0;
        regionData.confirmed.forEach(caso => {
            totalCasosConfirmados += parseInt(caso.value);
        });
        casosConfirmadosPorRegion[region] = totalCasosConfirmados;
    });

    while(Object.keys(casosConfirmadosPorRegion).length > 10){
        let menorCantidad = Infinity;
        let regionMenorCasos = null;
        for (let region in casosConfirmadosPorRegion) {
            const cantidadCasos = casosConfirmadosPorRegion[region];
            if (cantidadCasos < menorCantidad) {
                menorCantidad = cantidadCasos;
                regionMenorCasos = region;
            }
        }
        delete casosConfirmadosPorRegion[regionMenorCasos];
    }

    for (let region in casosConfirmadosPorRegion) {
        const li = document.createElement('li');
        li.textContent = `${region}: ${casosConfirmadosPorRegion[region]}`;
        regionList.appendChild(li);
    }

    const totalLi = document.createElement('li');
    totalLi.style.marginTop = '20px';
    totalLi.textContent = `Total de casos: ${contarTotalCasos(casosConfirmadosPorRegion)}`;
    regionList.appendChild(totalLi);
}

function contarTotalCasos(casosConfirmadosPorRegion) {
    let totalCasos = 0;
    for (let region in casosConfirmadosPorRegion) {
        const casosRegion = casosConfirmadosPorRegion[region];
        totalCasos += casosRegion;
    }
    return totalCasos;
}