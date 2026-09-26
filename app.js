import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

export const listaCarros = {
  carros: [
    {
      id: 1,
      posicao: 1,
      nome: 'Strada',
      marca: 'Fiat',
      preco: 116990,
      descricao: 'Picape compacta, versátil e muito utilizada tanto no trabalho quanto no uso urbano.',
      cores: ['#FFFFFF', '#000000', '#808080', '#C8C8C8', '#B22222'],
      vendas_julho_2026: 14912
    },
    {
      id: 2,
      posicao: 2,
      nome: 'Polo',
      marca: 'Volkswagen',
      preco: 96690,
      descricao: 'Hatch compacto com bom equilíbrio entre desempenho, economia e tecnologia.',
      cores: ['#FFFFFF', '#000000', '#C0C0C0', '#1E3A5F', '#808080'],
      vendas_julho_2026: 10340
    },
    {
      id: 3,
      posicao: 3,
      nome: 'Tera',
      marca: 'Volkswagen',
      preco: 107190,
      descricao: 'SUV compacto moderno, com posição de dirigir elevada e foco em tecnologia e praticidade.',
      cores: ['#FFFFFF', '#000000', '#C0C0C0', '#1F4E79', '#8B0000'],
      vendas_julho_2026: 10165
    },
    {
      id: 4,
      posicao: 4,
      nome: 'Onix',
      marca: 'Chevrolet',
      preco: 99990,
      descricao: 'Hatch compacto conhecido pelo baixo consumo, conectividade e bom pacote de equipamentos.',
      cores: ['#FFFFFF', '#000000', '#C0C0C0', '#1D4E89', '#8B0000'],
      vendas_julho_2026: 9313
    },
    {
      id: 5,
      posicao: 5,
      nome: 'Argo',
      marca: 'Fiat',
      preco: 89990,
      descricao: 'Hatch compacto com visual esportivo, bom espaço interno e proposta urbana.',
      cores: ['#FFFFFF', '#000000', '#C0C0C0', '#6B0000', '#1E3A5F'],
      vendas_julho_2026: 8612
    },
    {
      id: 6,
      posicao: 6,
      nome: 'Dolphin Mini',
      marca: 'BYD',
      preco: 119800,
      descricao: 'Carro elétrico compacto voltado para mobilidade urbana, com foco em eficiência e tecnologia.',
      cores: ['#FFFFFF', '#000000', '#87CEEB', '#B22222', '#C0C0C0'],
      vendas_julho_2026: 7265
    },
    {
      id: 7,
      posicao: 7,
      nome: 'T-Cross',
      marca: 'Volkswagen',
      preco: 119990,
      descricao: 'SUV compacto com bom espaço interno, tecnologia embarcada e ampla oferta de versões.',
      cores: ['#FFFFFF', '#000000', '#C0C0C0', '#1F4E79', '#808080'],
      vendas_julho_2026: 7070
    },
    {
      id: 8,
      posicao: 8,
      nome: 'Dolphin',
      marca: 'BYD',
      preco: 159990,
      descricao: 'Hatch elétrico com foco em eficiência, conforto, tecnologia e uso predominantemente urbano.',
      cores: ['#FFFFFF', '#000000', '#4682B4', '#B22222', '#C0C0C0'],
      vendas_julho_2026: 6492
    },
    {
      id: 9,
      posicao: 9,
      nome: 'EX2',
      marca: 'Geely',
      preco: 119990,
      descricao: 'SUV elétrico compacto que combina proposta urbana, tecnologia e bom aproveitamento interno.',
      cores: ['#FFFFFF', '#000000', '#C0C0C0', '#2F4F4F', '#B22222'],
      vendas_julho_2026: 5898
    },
    {
      id: 10,
      posicao: 10,
      nome: 'Creta',
      marca: 'Hyundai',
      preco: 149990,
      descricao: 'SUV compacto com conforto, bom nível de equipamentos e ampla presença no mercado brasileiro.',
      cores: ['#FFFFFF', '#000000', '#C0C0C0', '#1E3A5F', '#8B0000'],
      vendas_julho_2026: 5880
    }
  ]
};

// Rota GET
app.get('/serve', (req, res) => {
  res.json(listaCarros);
});

// Rota POST com validação para garantir passar nos testes
app.post('/serve', (req, res) => {
  const novoCarro = req.body;
  
  if (!novoCarro.nome || !novoCarro.marca) {
    return res.status(400).json({ mensagem: 'Dados incompletos' });
  }

  novoCarro.id = Date.now();
  listaCarros.carros.push(novoCarro);
  
  return res.status(201).json({ 
    mensagem: 'Produto armazenado com sucesso!', 
    produto: novoCarro 
  });
});

// Rota DELETE exigida pelo projeto
app.delete('/serve/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = listaCarros.carros.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: 'Carro não encontrado' });
  }

  listaCarros.carros.splice(index, 1);
  return res.status(204).send();
});

export default app;