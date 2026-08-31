function buscarCarros() {
    fetch("http://localhost:8080/serve")
        .then(resposta => resposta.json())
        .then(dados => {
            const container = document.getElementById("carsContainer");
            container.innerHTML = ""; 
            dados.carros.forEach(carro => {
                container.innerHTML += `
                    <div class="card">
                        <img src="${carro.foto}" alt="${carro.nome}">
                        <h3>${carro.posicao}. ${carro.marca} ${carro.nome}</h3>
                        <p>${carro.descricao}</p>
                        <p><strong>Preço:</strong> R$ ${carro.preco}</p>
                    </div>
                `;
            });
        })
        .catch(erro => {
            console.error("Erro ao buscar os carros:", erro);
            document.getElementById("carsContainer").innerHTML = "Erro ao carregar os dados.";
        });
}

buscarCarros();
function adicionarCarro(novoCarro) {
    fetch("http://localhost:8080/serve", {
        method: "POST",
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(novoCarro)
    })
    .then(resposta => resposta.json())
    .then(dados => {
        console.log("Sucesso:", dados.mensagem);

        buscarCarros(); 
    })
    .catch(erro => {
        console.error("Erro ao tentar adicionar o carro:", erro);
        alert("Falha ao salvar o novo veículo.");
    });
}
