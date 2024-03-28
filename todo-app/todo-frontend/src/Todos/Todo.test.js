import React from 'react'
import { render, screen } from '@testing-library/react'
import Todo from './Todo'

test('The todo is rendered', async () => {
    const todo = {
        "text": "Test todo",
        "done": false
    }

    render(<Todo todo={todo} />)

    const todoText = screen.getByText('Test todo')
    expect(todoText).toBeDefined()
})