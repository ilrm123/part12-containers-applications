const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

const initialUsers = [
    {
      username: "tahvo123",
      name: "Tahvo",
      passwordHash: "t4hv015b35t"
    }
  ]
  
beforeEach(async () => {
    await User.deleteMany({})
    let userObject = new User(initialUsers[0])
    await userObject.save()
})

test('not created with too short username', async () => {
    const newUser = {
        username: "aa",
        name: "Ihmetyyppi",
        password: "salasalsa"
      }
      
      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect("username and/or password too short")
    
        const response = await api.get('/api/users')
      
        expect(response.body).toHaveLength(1)
})

test('not created with too short password', async () => {
    const newUser = {
        username: "aasi",
        name: "Ihmeaasi",
        password: "sa"
      }
      
      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect("username and/or password too short")
    
        const response = await api.get('/api/users')
      
        expect(response.body).toHaveLength(1)
})

test('not created with used username', async () => {
    const newUser = {
        username: "tahvo123",
        name: "huijari",
        password: "tahvosalsa"
      }
      
      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect("username already exists")
    
        const response = await api.get('/api/users')
      
        expect(response.body).toHaveLength(1)
})

afterAll(() => {
    mongoose.connection.close()
  })