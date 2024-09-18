function calcularINSS(salarioBruto) {
    if (salarioBruto <= 1412) {
        return salarioBruto * 0.075;
    } else if (salarioBruto <= 2666.68) {
        return 1412 * 0.075 + (salarioBruto - 1412) * 0.09;
    } else if (salarioBruto <= 4000.03) {
        return 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (salarioBruto - 2666.68) * 0.12;
    } else if (salarioBruto <= 7786.02) {
        return 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (4000.03 - 2666.68) * 0.12 + (salarioBruto - 4000.03) * 0.14;
    } else {
        return 7786.02 * 0.14; // Teto do INSS
    }
}

function calcularIR(salarioBruto, dependentes) {
    let baseIR = salarioBruto - calcularINSS(salarioBruto) - (dependentes * 189.59);
    if (baseIR <= 2112.00) {
        return 0;
    } else if (baseIR <= 2826.65) {
        return (baseIR * 0.075) - 158.40;
    } else if (baseIR <= 3751.05) {
        return (baseIR * 0.15) - 370.40;
    } else if (baseIR <= 4664.68) {
        return (baseIR * 0.225) - 651.73;
    } else {
        return (baseIR * 0.275) - 884.96;
    }
}

function calcularSalario() {
    const salarioBruto = parseFloat(document.getElementById("salarioBruto").value);
    const dependentes = parseInt(document.getElementById("dependentes").value);
    const pensao = parseFloat(document.getElementById("pensao").value);
    const outrosDescontos = parseFloat(document.getElementById("outrosDescontos").value);

    if (isNaN(salarioBruto) || isNaN(dependentes) || isNaN(pensao) || isNaN(outrosDescontos)) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    const inss = calcularINSS(salarioBruto);
    const ir = calcularIR(salarioBruto, dependentes);
    const descontosTotais = inss + ir + pensao + outrosDescontos;
    const salarioLiquido = salarioBruto - descontosTotais;

    document.getElementById("resultado").innerHTML = `Salário Líquido: R$ ${salarioLiquido.toFixed(2)}`;
}