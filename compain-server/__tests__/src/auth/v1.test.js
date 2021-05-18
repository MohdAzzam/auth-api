'use strict';
const server = require('../../../src/server').server;
const supergoose = require('@code-fellows/supergoose');
const request = supergoose(server);
let id;
describe('Testing server', () => {
  it('should send 404 error on a bad route', async () => {
    const response = await request.get('/wrongroute');
    expect(response.status).toEqual(404);
  });
  it('should send a 404 error when no food is found', async () => {
    const response = await request.get('/error');
    expect(response.status).toEqual(404);
  });
  it('Create a Food record', async () => {
    const response = await request.post('/api/v1/food/').send({
        name: "fish",
        calories: "20",
        type: "PROTIEN"
    })
    expect(response.status).toEqual(201);
    expect(response.body.type).toEqual("PROTIEN");
    id = response.body._id
  });
  // Update a record 
  it('Update a Food record', async () => {
    const response = await request.put(`/api/v1/food/${id}`).send({
        name: "Salmofish",
        calories: "20",
        type: "PROTIEN"
    });
    expect(response.status).toEqual(200);
    expect(response.body.type).toEqual('PROTIEN');
  });
  // Read a record
  it('Read a Food record', async () => {
    const response = await request.get(`/api/v1/food/${id}`);
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('Salmofish');
    expect(response.body.type).toEqual('PROTIEN');
  });
  // Read all Records
  it('Read all Food record', async () => {
    const response = await request.get('/api/v1/food/');
    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual('Salmofish');
    expect(response.body[0].type).toEqual('PROTIEN');
  });
  // Delete a record
  it('Delete a Food record', async () => {
    const response = await request.delete(`/api/v1/food/${id}`);
    expect(response.status).toEqual(200);
  });
 
  it('Create a Clothes record', async () => {
    const response = await request.post('/api/v1/clothes/').send({
        name: "highwaistJeans",
      color: "blue",
      size: "WomenClothing"
    })
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual("highwaistJeans");
    expect(response.body.size).toEqual("WomenClothing");
    id = response.body._id
  });
  // Update a record 
  it('Update a Clothes record', async () => {
    const response = await request.put(`/api/v1/clothes/${id}`).send({
      name: "highwaistJeans",
      color: "blue",
      size: "WomenClothing"
    });
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('highwaistJeans');
    expect(response.body.size).toEqual('WomenClothing');
  });
  // Read a record
  it('Read a Clothes record', async () => {
    const response = await request.get(`/api/v1/clothes/${id}`);
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('highwaistJeans');
    expect(response.body.size).toEqual('WomenClothing');
  });
  // Read all Records
  it('Read all Clothes record', async () => {
    const response = await request.get('/api/v1/clothes/');
    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual('highwaistJeans');
    expect(response.body[0].size).toEqual('WomenClothing');
  });
  // Delete a record
  it('Delete a Clothes record', async () => {
    const response = await request.delete(`/api/v1/clothes/${id}`);
    expect(response.status).toEqual(200);
  });
});