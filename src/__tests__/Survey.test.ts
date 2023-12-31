import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../app';

import createConnection from '../database';

describe('Surveys', () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    });

    // Testa criar uma nova survey com o title e description mockados
    // é esperado que o response code retornado seja 201 com sucesso.
    it('Should be able to create a new survey', async () => {
        const response = await request(app)
            .post('/surveys')
            .send({
                title: 'Title Example',
                description: 'Description Example',
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
    });

    // Testa recuperar as surveys cadastradas na plataforma
    // é esperado o retorno da resposta deve conter as surveys com 2 campos no body, title e description.
    it('Should be able to get all surveys', async () => {
        await request(app)
            .post('/surveys')
            .send({
                title: 'Title Example 1',
                description: 'Description Example 1',
            });

        const response = request(app).get('/surveys');
        expect((await response).body.length).toBe(2);
    });
});