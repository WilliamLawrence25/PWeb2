function calcular() {
    let num1 = parseInt(document.getElementById("numero1").value);
    let num2 = parseInt(document.getElementById("numero2").value);
    let signo = document.getElementById("operator").value;
    var resultado;
    switch (signo) {
        case 'suma':
            resultado = num1 + num2;
            break;
        case 'resta':
            resultado = num1 - num2;
            break;
        case 'multiplicacion':
            resultado = num1 * num2;
            break;
        case 'divicion':
            resultado = num1 / num2;
            break;
        case 'and':
            resultado = num1 & num2;
            break;
        case 'or':
            resultado = num1 | num2;
            break;
        case 'xor':
            resultado = num1 ^ num2;
            break;
        default:
            resultado = "Operador inválido";    
    }

    document.getElementById("resultado").innerText = "Resultado " + resultado;
}