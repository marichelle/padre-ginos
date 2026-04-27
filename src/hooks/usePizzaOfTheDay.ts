import { useEffect, useState } from 'react'
import { IPizza } from '../types'
import axios from 'axios'

export const usePizzaOfTheDay = (): IPizza | null => {
  const [pizzaOfTheDay, setPizzaOfTheDay] = useState<IPizza | null>(null)

  const fetchPizzaOfTheDay = async () => {
    const { data } = await axios.get('/api/pizza-of-the-day')
    setPizzaOfTheDay(data)
  }

  useEffect(() => {
    fetchPizzaOfTheDay()
  }, [])

  return pizzaOfTheDay
}
