document.addEventListener("DOMContentLoaded", function() {
    const btnMostrarGrafico = document.getElementById('mostrarGrafico');
    const contenedor = document.querySelector('.contenedor');

    btnMostrarGrafico.addEventListener('click', () => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "../data.json", true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                let regions = data.filter(region => region.region !== "Lima" && region.region !== "Callao");
                if (regions.length > 0) {
                    mostrarGraficoComparativo(regions);
                    contenedor.style.display = 'flex';
                    btnMostrarGrafico.style.display = 'none';
                } else {
                    console.error("No se encontraron datos de regiones");
                }
            } else {
                console.error('Error en la red:', xhr.statusText);
            }
        };
        xhr.onerror = function() {
            console.error('Error en la red');
        };
        xhr.send();
    })
})

function mostrarGraficoComparativo(regions) {
    let labels = [];
    let datasets = [];

    regions.forEach(region => {
        let dates = region.confirmed.map(entry => entry.date);
        let values = region.confirmed.map(entry => parseInt(entry.value));

        if (labels.length === 0) {
            labels = dates;
        }

        datasets.push({
            label: region.region,
            data: values,
            borderColor: getRandomColor(),
            backgroundColor: getRandomColor(0.2),
            fill: false,
        })
    });
    let ctx = document.getElementById('GraficoComparativo').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasets
        }
    });
    
}
function getRandomColor(alpha = 1) {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}