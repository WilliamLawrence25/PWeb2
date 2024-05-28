document.addEventListener("DOMContentLoaded", function(){
    const btnMostrarGrafico = document.getElementById('mostrarGrafico');
    const contenedor = document.querySelector('.contenedor');

    btnMostrarGrafico.addEventListener('click', () => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "../data.json", true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                let arequipaData = data.find(region => region.region === "Arequipa");
                if (arequipaData) {
                    mostrarGrafico(arequipaData.confirmed);
                    contenedor.style.display = 'flex';
                    btnMostrarGrafico.style.display = 'none';
                } else {
                    console.error("No se econtraron datos de Arequipa");
                }
            } else {
                console.error('Error en la red:',xhr.statusText);
            }
        };
        xhr.onerror = function() {
            console.error('Error en la red');
        };
        xhr.send();
    });
    
})

function mostrarGrafico(arequipaData) {
    let dates = arequipaData.map(entry => entry.date);
    let values = arequipaData.map(entry => parseInt(entry.value));
    
    let ctx = document.getElementById('Grafico').getContext('2d');
    let graphic = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Numero de Confirmados',
                data: values,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            }]
        }   
    });
}