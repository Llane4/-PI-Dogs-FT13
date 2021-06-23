/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn ,Temperament} = require('../../src/db.js');
const { v4:uuidv4} =require('uuid')
const agent = session(app);

const dog = {
  name: 'Pug',
  image: "https://cdn2.thedogapi.com/images/BFRYBufpm",
  life_span: "10 - 14 years",
  temperament: "Docile, Alert, Responsive, Dignified, Composed, Friendly, Receptive, Faithful, Courageous",
  weight:"29 - 52"
  ,
  height:"61 - 71",
  id: uuidv4()
  
  };
const temperamentos={
  id:61233,
  name:"Asustado"
}

describe('Dogs routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );

  });
  describe('GET /alldogs', () => {
    it('should get 200', () =>
      agent.get('/alldogs').expect(200)
    );
  });
  describe('GET /dogs/:idRaza', () => {
    it('Deberia devolver que no existe id', () =>
      agent.get('/dogs/hola').expect("No existe una raza de perro con ese ID")
    );
    it('Deberia devolver 200', () =>{
      const pugg=dog.id
      agent.get(`/dogs/${pugg}`).expect(200)}
    );
    
  });
  

}

  
);
describe('Dogs post routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true }));
  it('responde que no se agrego ', function(){
    return agent.post('/dog')
      .send({
       name:"doggo"
      })
      .expect("No se agrego el perro");
  });
  it('responde que se agrego ', function(){
    return agent.post('/dog')
      .send(dog)
      .expect("Se agrego el perro");
  });
    
  

}

  
);
describe('Temperament routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Temperament.sync({ force: true })
    .then(() => Temperament.create(temperamentos)));
  describe('GET /temperament/', () => {
    it('should get 200 temperament', () =>
      agent.get('/temperament/').expect(200)
    );
    
    
  });
}
  
);
