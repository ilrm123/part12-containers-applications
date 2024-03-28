import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [show, setShow] = useState(false)

  const handleShowButton = () => {
    if (show === false) {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  const handleLike = () => {
    blogService.like(blog)
  }

  const handleRemove = () => {
    const confirm = window.confirm(`Remove ${blog.title}?`)

    if (confirm === true) {
      const token = JSON.parse(localStorage.getItem('LoggedBlogAppUser')).token
      blogService.remove(blog, token)}
  }

  return (
    <div>
      {blog.title}, written by {blog.author}

      {show === true
        ? <div></div> : <button id="showbutton" onClick={handleShowButton}>Show</button>}

      {show === false
        ? <div></div>
        : <div>
              Url:{blog.url}---Likes:{blog.likes}
          <button onClick={handleLike}>Like</button> ---
              User: {blog.user.name}
          <button onClick={handleShowButton}>Close</button>

          {blog.user.id === JSON.parse(localStorage.getItem('LoggedBlogAppUser')).id
            ? <button onClick={handleRemove}>Remove blog</button>
            : <div></div>
          }

        </div>
      }

    </div>
  )}

export default Blog