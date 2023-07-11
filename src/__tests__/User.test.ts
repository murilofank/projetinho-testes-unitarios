import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../app';

import createConnection from '../database';

describe('Users', () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    });

    // Testa criar um novo usuário com os campos email e name mockados.
    // o retorno da response deve ser o code 201 caso obtenha sucesso.
    it('Should be able to create a new user', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                email: 'user@example.com',
                name: 'User Example',
            });

        expect(response.status).toBe(201);
    });

    // Testa criar um usuário com um email já cadastrado na plataforma.
    // é esperado que a response retorne o code 400.
    it('Should not be able to create user with exists email', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                email: 'user@example.com',
                name: 'User Example',
            });

        expect(response.status).toBe(400);
    });
});