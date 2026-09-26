import request from 'supertest';
import app, { listaCarros } from './app.js';

describe('Testes de Integração da API de Carros', () => {

  test('GET /serve deve retornar a lista de carros e status 200', async () => {
    const res = await request(app).get('/serve');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('carros');
    expect(Array.isArray(res.body.carros)).toBe(true);
  });

  test('POST /serve deve cadastrar um novo carro e retornar 201', async () => {
    const novoCarro = {
      posicao: 11,
      nome: 'Corolla',
      marca: 'Toyota',
      preco: 150000,
      descricao: 'Sedã médio confiável.'
    };

    const res = await request(app).post('/serve').send(novoCarro);
    expect(res.statusCode).toEqual(201);
    expect(res.body.produto).toHaveProperty('id');
    expect(res.body.produto.nome).toBe('Corolla');
  });

  test('POST /serve deve retornar 400 se faltar dados obrigatórios', async () => {
    const res = await request(app).post('/serve').send({});
    expect(res.statusCode).toEqual(400);
  });

  test('DELETE /serve/:id deve retornar 404 se o carro não existir', async () => {
    const res = await request(app).delete('/serve/9999');
    expect(res.statusCode).toEqual(404);
    expect(res.body.mensagem).toBe('Carro não encontrado');
  });

  test('DELETE /serve/:id deve remover o carro e retornar 204', async () => {
    const res = await request(app).delete('/serve/1');
    expect(res.statusCode).toEqual(204);

    // Valida se o carro foi realmente removido da lista
    const busca = listaCarros.carros.find(c => c.id === 1);
    expect(busca).toBeUndefined();
  });
});