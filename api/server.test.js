const request = require('supertest');
const server = require('./server.js');

const db = require('../database/dbConfig.js');
const Users = require('../models/usersModel.js');

describe('server.js', () => {
    describe('auth route', () => {
        describe('/api/auth/register', () => {
            beforeEach(async () => {
                // this function executes and clears out the table before each test
                await db('users').truncate();
              });

            it('should return JSON object', () => {
                let response;
    
                return request(server).post('/api/auth/register')
                .then(res => {
                    response = res;
    
                    expect(response.type).toEqual('application/json');
                })
            });
    
            it('should return a 400 status code if username and password is not provided', () => {
                let response;
                const invalidUser = { username: 'username' }

                return request(server)
                .post('/api/auth/register')
                .send(invalidUser)
                .then(res => {
                    response = res;
                    expect(response.status).toBe(400);
                })
            });
            
            it('should return a 201 status code if username and password is provided', () => {
                let response;
                const validUser = { username: 'username', password: 'password' }

                return request(server)
                .post('/api/auth/register')
                .send(validUser)
                .then(res => {
                    response = res;
                    expect(response.status).toBe(201);
                })
            });            
        });
        
        describe('/api/auth/login', () => {
            it('should return JSON object', () => {
                let response;
    
                return request(server).post('/api/auth/login')
                .then(res => {
                    response = res;
    
                    expect(response.type).toEqual('application/json');
                })
            });

            it('should send a 401 error if credentials are invalid', () => {
                const newUser = { username: 'dvcolin', password: 'password' };
                Users.insert(newUser)

                let response;
                return request(server)
                .post('/api/auth/login')
                .send({ username: 'dvcolin1', password: 'password' })
                .then(res => {
                    response = res;
                    expect(response.status).toBe(401);
                })
            });
    
        });
    })
})
