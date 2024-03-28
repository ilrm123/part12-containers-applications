import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

test('Only title and author are rendered by default', async () => {
  const blog = {
    title: 'Titteli',
    author: 'Autoori',
    url: 'urli',
    likes: 10,
    user: 'abc123'
  }

  render(<Blog blog={blog} />)

  const titleauthor = screen.getByText('Titteli, written by Autoori')
  expect(titleauthor).toBeDefined()
})

