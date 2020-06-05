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

  it('it updates something in the dog by id', async() => {
    const dog = await Dog.create({
      dogBreed: 'Black Lab',
      description: 'Big happy and cuddly'
    });
    
    const newDog = {
      newBreed: 'Golden Labrador',
      newDescription: 'Super smiley and chill'
    };
   
    return request(app)
      .patch(`/dogs/${dog._id}`)
      .send({ 
        dogBreed: newDog.newBreed,
        description: newDog.newDescription 
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: dog.id,
          dogBreed: 'Golden Labrador',
          description: 'Super smiley and chill',
          __v: 0
        });
      });
  });

  it('it deletes a dog by id', async() => {
    const dog = await Dog.create({
      dogBreed: 'Black Lab',
      description: 'Big happy and cuddly'
    });

    return request(app)
      .delete(`/dogs/${dog._id}`)
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
