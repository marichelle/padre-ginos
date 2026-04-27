import { useEffect, useState } from 'react'
import { IPizza } from '../types'
import axios from 'axios'

export const usePizzas = (): {
  pizzas: IPizza[]
  loading: boolean
} => {
  const [loading, setLoading] = useState<boolean>(true)
  const [pizzas, setPizzas] = useState<IPizza[]>([])

  const fetchPizzas = async () => {
    // Simulate delay
    // await new Promise((resolve) => setTimeout(resolve, 5000))
    const { data } = await axios.get('/api/pizzas')
    const sortedPizzas = data.sort((a: IPizza, b: IPizza) =>
      a.name.localeCompare(b.name),
    )
    setLoading(false)
    setPizzas(sortedPizzas)
  }

  useEffect(() => {
    fetchPizzas()
  }, [])

  return {
    pizzas,
    loading,
  }
}
