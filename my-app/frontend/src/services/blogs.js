import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  console.log(config)

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const like = async unlikedBlog => {
  let likedBlog = { ...unlikedBlog }
  likedBlog.likes = unlikedBlog.likes + 1
  delete likedBlog.user

  const blogUrl = `${baseUrl}/${unlikedBlog.id}`

  const response = await axios.put(blogUrl, likedBlog)
  return response.data
}

const remove = async (blogToRemove, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` }
  }

  const blogUrl = `${baseUrl}/${blogToRemove.id}`

  console.log(config)

  const response = await axios.delete(blogUrl, config)
  return response.data
}

export default { setToken, getAll, create, like, remove }