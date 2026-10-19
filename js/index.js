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

                        <button onclick="deletarCarro (${carro.id})" 
                        style="background-color: #dc3545; 
                        color: white; border: none;
                        padding: 10px;
                        border-radius: 5px;
                        cursor: pointer;
                        width: 100%;
                        margin-top: 10px;">
                        Deletar Veículo
                        </button>
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
const form = document.getElementById("formNovoCarro");
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const novoCarro = {
        posicao: Number(document.getElementById("inputPosicao").value),
        nome: document.getElementById("inputNome").value,
        marca: document.getElementById("inputMarca").value,
        preco: Number(document.getElementById("inputPreco").value),
        descricao: document.getElementById("inputDescricao").value,
        cores: [], 
        vendas_julho_2026: 0 
    };
    adicionarCarro(novoCarro);
});
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
        alert("Veículo cadastrado com sucesso!"); 
        form.reset(); 
        buscarCarros(); 
    })
    .catch(erro => {
        console.error("Erro ao tentar adicionar o carro:", erro);
        alert("Falha ao salvar o novo veículo.");
    });
}
function deletarCarro(id) {
    if (!confirm("Tem certeza que deseja remover este veículo?")) {
        return;
    }

    fetch(`http://localhost:8080/serve/${id}`, {
        method: "DELETE"
    })
    .then(resposta => {
        if (resposta.ok) {
            console.log("Sucesso: Veículo deletado.");
            alert("Veículo removido com sucesso!");
            buscarCarros(); 
        } else {
            alert("Erro: O carro não foi encontrado ou não pôde ser deletado.");
        }
    })
    .catch(erro => {
        console.error("Erro ao tentar deletar o carro:", erro);
        alert("Falha na comunicação com o servidor.");
    });
}