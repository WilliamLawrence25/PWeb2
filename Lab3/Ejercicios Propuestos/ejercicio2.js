
document.getElementById("botonInvertir").addEventListener("click", function(){
    let texto = document.getElementById("texto").value;
    let texInvertido = texto.split("").reverse().join("");
    document.getElementById("resultado").innerText = texInvertido;
});


