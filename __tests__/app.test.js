const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const app = require('../lib/app');
const Dog = require('../lib/models/dog');

describe('app routes', () => {
  const mongo = new MongoMemoryServer();
  beforeAll(() => {
    return mongo.getUri()
      .then(uri => mongoose.connect(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true
      }));
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });


  it('it creates a new dog', () => {
    return request(app)
      .post('/dogs')
      .send({
        dogBreed: 'Black Lab',
        description: 'Big happy and cuddly'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          dogBreed: 'Black Lab',
          description: 'Big happy and cuddly',
          __v: 0
        });
      });
  });

  it('it gets a list of all dogs', async() => {
    await Dog.create({
      dogBreed: 'Black Lab',
      description: 'Big happy and cuddly'
    });

    return request(app)
      .get('/dogs')
      .then(res => {
        expect(res.body).toEqual([
          {
            _id: expect.anything(),
            dogBreed: 'Black Lab',
            description: 'Big happy and cuddly',
            __v: 0
          }
        ]);
      });
  });

  it('gets a single dog by id', async() => {
    const dog = await Dog.create({
      dogBreed: 'Black Lab',
      description: 'Big happy and cuddly'
    });

    return request(app)
      .get(`/dogs/${dog._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: dog.id,
          dogBreed: 'Black Lab',
          description: 'Big happy and cuddly',
          __v: 0
        });
      });

  });


  
});
