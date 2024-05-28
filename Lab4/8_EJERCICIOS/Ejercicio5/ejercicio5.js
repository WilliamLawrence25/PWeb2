document.addEventListener("DOMContentLoaded", function() {
    const btnMostrarGrafico = document.getElementById('mostrarGrafico');
    const contenedor = document.querySelector('.contenedor');

    btnMostrarGrafico.addEventListener('click', () => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "../data.json", true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                if (data.length > 0) {
                    mostrarGraficos(data);
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
    });
});

function mostrarGraficos(data) {
    const contenedor = document.querySelector('.contenedor');
    contenedor.innerHTML = ''; 

    data.forEach(regionData => {
        const canvasContainer = document.createElement('div');
        canvasContainer.classList.add('canvas-container');
        const canvas = document.createElement('canvas');
        canvas.id = `Grafico-${regionData.region}`;
        canvasContainer.appendChild(canvas);
        contenedor.appendChild(canvasContainer);

        let dates = regionData.confirmed.map(entry => entry.date);
        let values = regionData.confirmed.map(entry => parseInt(entry.value));
        let colors = generarRandomColor();

        let ctx = canvas.getContext('2d');
        new Chart(ctx, { 
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: `Número de Confirmados en ${regionData.region}`,
                    data: values,
                    borderColor: colors.solid,     
                    backgroundColor: colors.translucent,
                    fill: true,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    });
}

function generarRandomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    return {
        solid: `rgba(${r},${g},${b},1)`,
        translucent: `rgba(${r},${g},${b},0.2)`
    };
}