const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Why I love fullstack',
    author: 'Taavi',
    url: 'www.fullstackisamazing.com',
    likes: 5
  },
  {
    title: 'Why I hate fullstack',
    author: 'Eetvartti',
    url: 'www.fullstackisnotcool.com',
    likes: 2
  },
  {
    title: 'Third title of blog',
    author: 'Apina',
    url: 'www.thethirdurl.com',
    likes: 2
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
})

test('blogs have type json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct amount of blogs', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(3)
})

test('blogs have id', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach(blog => expect(blog.id).toBeDefined())
})

test('new blog can be added', async () => {
  const newBlog = {
    title: 'newblog',
    author: 'newauthor',
    url: 'newurl.com',
    likes: 10
  }
  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(4)

})

test('likes value is 0 when not given', async () => {
  const newBlog = {
    title: 'nolikes',
    author: 'unlikedauthor',
    url: 'nolikes.com',
  }
  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
  
    expect(response.body.slice(-1)[0].likes).toEqual(0)

})

test('blog can be deleted', async () => {
  const response = await api.get('/api/blogs')
  
  const blogid = response.body.slice(0)[0].id

  await api
    .delete(`/api/blogs/${blogid}`)
    .expect(204)

  const newresponse = await api.get('/api/blogs')
  expect(newresponse.body).toHaveLength(2)
})


afterAll(() => {
  mongoose.connection.close()
})