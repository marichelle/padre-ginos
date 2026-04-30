import axios from 'axios'
import { describe, expect, test, vi, type Mock } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { usePizzaOfTheDay } from '../hooks/usePizzaOfTheDay'

vi.mock('axios')

function TestComponent() {
  const pizza = usePizzaOfTheDay()
  return <div>{pizza ? pizza.name : 'loading'}</div>
}

describe('usePizzaOfTheDay', () => {
  test('fetches and returns pizza of the day', async () => {
    const mockData = {
      id: '1',
      name: 'Margherita',
      description: 'Classic cheese & tomato',
      sizes: { S: 5, M: 7, L: 9 },
      category: 'classic',
      image: '',
    }

    const mockedAxios = axios as unknown as { get: Mock }
    mockedAxios.get.mockResolvedValue({ data: mockData })

    render(<TestComponent />)

    await waitFor(() => {
      expect(screen.getByText('Margherita')).toBeDefined()
    })
  })
})
