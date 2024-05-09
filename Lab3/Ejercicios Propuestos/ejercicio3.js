function diasHastaArequipa() {
    let hoy = new Date();
    let diasArequipa = new Date(hoy.getFullYear(), 7, 14);
    let diferencia = diasArequipa - hoy;
    let diasRestantes = Math.ceil(diferencia / (1000*60*60*24));
    document.getElementById("contador").innerText = "Faltan " + diasRestantes + " dias para el dia de Arequipa";

}
diasHastaArequipa();

