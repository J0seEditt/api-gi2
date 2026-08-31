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
const form = document.getElementById("formNovoCarro");

// 2. Intercepta o evento de "submit" (clique no botão Salvar)
form.addEventListener("submit", function(event) {
    
    // Impede o recarregamento automático da página (Comando crucial!)
    event.preventDefault();

    // 3. Captura os valores dos inputs usando getElementById
    // Usamos Number() para garantir que posição e preço sejam números, não textos
    const novoCarro = {
        posicao: Number(document.getElementById("inputPosicao").value),
        nome: document.getElementById("inputNome").value,
        marca: document.getElementById("inputMarca").value,
        preco: Number(document.getElementById("inputPreco").value),
        descricao: document.getElementById("inputDescricao").value,
        cores: [], // Array vazio por padrão
        vendas_julho_2026: 0 // Valor inicial padrão
    };

    // 4. Envia o objeto montado para a API
    adicionarCarro(novoCarro);
});

// 5. Função de disparo do POST (com pequenas melhorias de usabilidade)
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
        alert("Veículo cadastrado com sucesso!"); // Avisa o usuário
        form.reset(); // Limpa os campos do formulário automaticamente
        buscarCarros(); // Atualiza a lista na tela
    })
    .catch(erro => {
        console.error("Erro ao tentar adicionar o carro:", erro);
        alert("Falha ao salvar o novo veículo.");
    });
}