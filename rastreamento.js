const AFTERSHIP_API_KEY = " asat_253f3f5873d54d9d840be8f370a256e7
"; // Insira sua chave de API aqui

async function rastrearEncomenda(numeroRastreamento) {
    const url = `https://api.aftership.com/v4/trackings/${numeroRastreamento}`;
    
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "aftership-api-key": AFTERSHIP_API_KEY
        }
    });

    if (!response.ok) {
        throw new Error("Erro ao buscar rastreamento. Verifique o código de rastreio.");
    }

    const data = await response.json();
    return data.data.tracking;
}

function exibirResultado(trackingData) {
    let resultadoHTML = `<h3>Rastreamento para: ${trackingData.tracking_number}</h3>`;
    resultadoHTML += `<p>Status: ${trackingData.tag}</p>`;
    resultadoHTML += "<ul>";

    trackingData.checkpoints.forEach(ponto => {
        resultadoHTML += `<li>${ponto.location} - ${ponto.message} (${ponto.checkpoint_time})</li>`;
    });

    resultadoHTML += "</ul>";

    document.getElementById("resultado").innerHTML = resultadoHTML;
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("rastrearBtn").addEventListener("click", async function () {
        const codigo = document.getElementById("codigoRastreamento").value.trim();
        if (codigo === "") {
            alert("Por favor, insira um código de rastreamento.");
            return;
        }

        try {
            const trackingData = await rastrearEncomenda(codigo);
            exibirResultado(trackingData);
        } catch (error) {
            document.getElementById("resultado").innerHTML = `<p style="color: red;">${error.message}</p>`;
        }
    });
});
