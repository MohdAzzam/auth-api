'use strict';
process.env.SECRET='mysecret';
const supergoose = require('@code-fellows/supergoose');
require('dotenv').config();
const server = require('../../../src/server').server;
const Users = require('../../../src/auth/models/users.js');
const jwt = require('jsonwebtoken');
const request = supergoose(server);
let users = { admin: { username: 'admin', password: '1234', role: 'admin' } };
beforeAll(async (done) => {
    await new Users(users.admin).save();
    done();
});
const user = { username: 'admin' };
const token = jwt.sign(user, process.env.SECRET);
let id;
console.log(token);
describe('test api/v2/food', () => {
    it(' POST /food', async () => {
        const response = await request.post('/api/v2/food').send({ name: 'banana', calories: 10, type: 'VEGETABLE' }).set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(201);
        expect(response.body.name).toEqual('banana');
        id = response.body._id;
    });
    it('it handle Get All food', async () => {
        const res = await request.get('/api/v2/food').set('Authorization', `Bearer ${token}`);
        expect(res.status).toEqual(200);
    });
    it('it handle Get', async () => {
        const res = await request.get(`/api/v2/food/${id}`).set('Authorization', `Bearer ${token}`);
        expect(res.status).toEqual(200);
        expect(res.body.name).toEqual('banana');
    });
    it('it handle PUT', async () => {
        const res = await request.put(`/api/v2/food/${id}`).send({ name: 'mooz', calories: 10, type: 'VEGETABLE' }).set('Authorization', `Bearer ${token}`);
        expect(res.status).toEqual(200);
        expect(res.body.name).toEqual('mooz');
    });
    it('it handle DELETE', async () => {
        const res = await request.put(`/api/v2/food/${id}`).set('Authorization', `Bearer ${token}`);
        expect(res.status).toEqual(200);
        expect(res.body.name).toEqual('mooz');
    });
});