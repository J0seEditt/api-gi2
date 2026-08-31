import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 8080;

app.use(express.json());

const listaCarros = {
        carros: [
            {
                posicao: 1,
                nome: "Strada",
                marca: "Fiat",
                preco: 116990,
                descricao:
                    "Picape compacta, versátil e muito utilizada tanto no trabalho quanto no uso urbano.",
                cores: [
                    "#FFFFFF",
                    "#000000",
                    "#808080",
                    "#C8C8C8",
                    "#B22222"
                ],
                vendas_julho_2026: 14912
            },

            {
                posicao: 2,
                nome: "Polo",
                marca: "Volkswagen",
                preco: 96690,
                descricao:
                    "Hatch compacto com bom equilíbrio entre desempenho, economia e tecnologia.",
                cores: [
                    "#FFFFFF",
                    "#000000",
                    "#C0C0C0",
                    "#1E3A5F",
                    "#808080"
                ],
                vendas_julho_2026: 10340
            },

            {
                posicao: 3,
                nome: "Tera",
                marca: "Volkswagen",
                preco: 107190,
                descricao:
                    "SUV compacto moderno, com posição de dirigir elevada e foco em tecnologia e praticidade.",
                cores: [
                    "#FFFFFF",
                    "#000000",
                    "#C0C0C0",
                    "#1F4E79",
                    "#8B0000"
                ],
                vendas_julho_2026: 10165
            },

            {
                posicao: 4,
                nome: "Onix",
                marca: "Chevrolet",
                preco: 99990,
                descricao:
                    "Hatch compacto conhecido pelo baixo consumo, conectividade e bom pacote de equipamentos.",
                cores: [
                    "#FFFFFF",
                    "#000000",
                    "#C0C0C0",
                    "#1D4E89",
                    "#8B0000"
                ],
                vendas_julho_2026: 9313
            },

            {
                posicao: 5,
                nome: "Argo",
                marca: "Fiat",
                preco: 89990,
                descricao:
                    "Hatch compacto com visual esportivo, bom espaço interno e proposta urbana.",
                cores: [
                    "#FFFFFF",
                    "#000000",
                    "#C0C0C0",
                    "#6B0000",
                    "#1E3A5F"
                ],
                vendas_julho_2026: 8612
            },

            {
                posicao: 6,
                nome: "Dolphin Mini",
                marca: "BYD",
                preco: 119800,
                descricao:
                    "Carro elétrico compacto voltado para mobilidade urbana, com foco em eficiência e tecnologia.",
                cores: [
                    "#FFFFFF",
                    "#000000",
                    "#87CEEB",
                    "#B22222",
                    "#C0C0C0"
                ],
                vendas_julho_2026: 7265
            },

            {
                posicao: 7,
                nome: "T-Cross",
                marca: "Volkswagen",
                preco: 119990,
                descricao:
                    "SUV compacto com bom espaço interno, tecnologia embarcada e ampla oferta de versões.",
                cores: [
                    "#FFFFFF",
                    "#000000",
                    "#C0C0C0",
                    "#1F4E79",
                    "#808080"
                ],
                vendas_julho_2026: 7070
            },

            {
                posicao: 8,
                nome: "Dolphin",
                marca: "BYD",
                preco: 159990,
                descricao:
                    "Hatch elétrico com foco em eficiência, conforto, tecnologia e uso predominantemente urbano.",
                cores: [
                    "#FFFFFF",
                    "#000000",
                    "#4682B4",
                    "#B22222",
                    "#C0C0C0"
                ],
                vendas_julho_2026: 6492
            },

            {
                posicao: 9,
                nome: "EX2",
                marca: "Geely",
                preco: 119990,
                descricao:
                    "SUV elétrico compacto que combina proposta urbana, tecnologia e bom aproveitamento interno.",
                cores: [
                    "#FFFFFF",
                    "#000000",
                    "#C0C0C0",
                    "#2F4F4F",
                    "#B22222"
                ],
                vendas_julho_2026: 5898
            },

            {
                posicao: 10,
                nome: "Creta",
                marca: "Hyundai",
                preco: 149990,
                descricao:
                    "SUV compacto com conforto, bom nível de equipamentos e ampla presença no mercado brasileiro.",
                cores: [
                    "#FFFFFF",
                    "#000000",
                    "#C0C0C0",
                    "#1E3A5F",
                    "#8B0000"
                ],
                vendas_julho_2026: 5880
            }
        ]
    };

app.get('/serve', (req, res) => {
    res.json(listaCarros);
});
app.post('/serve', (req, res) => {
    const novoCarro = req.body;
    
    listaCarros.carros.push(novoCarro);
    res.status(201).json({ 
        mensagem: "Produto armazenado com sucesso!", 
        produto: novoCarro 
    });
});
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});