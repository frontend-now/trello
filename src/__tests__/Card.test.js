import React from 'react'
import { render } from '../../test_utils/utils'

import Card from '../components/Card'

import '@testing-library/jest-dom/extend-expect'

// Mock React beautiful dnd because Draggble and Droppable expects DragDropContext
jest.mock('react-beautiful-dnd', () => ({
  Droppable: ({ children }) => children({
    draggableProps: { style: {} },
    innerRef: jest.fn()
  }, {}),
  Draggable: ({ children }) => children({
    draggableProps: { style: {} },
    innerRef: jest.fn()
  }, {}),
  DragDropContext: ({ children }) => children
}))

describe('Testing Card Component', () => {
  test('Card can display properly', () => {
    const { getByText } = render(
      <Card id={1} listID={1} text="Test Label" />
    )

    expect(getByText('Test Label')).toBeInTheDocument()
  })
})
