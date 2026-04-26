import { useEffect, useState } from 'react'
import Pizza from './Pizza'
import axios from 'axios'

const PIZZA_SIZES = [
  {
    id: 'pizza-s',
    name: 'Small',
    value: 'S',
  },
  {
    id: 'pizza-m',
    name: 'Medium',
    value: 'M',
  },
  {
    id: 'pizza-l',
    name: 'Large',
    value: 'L',
  },
]

const intl = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

type PizzaSize = 'S' | 'M' | 'L'
interface IPizza {
  id: string
  name: string
  description: string
  sizes: Record<PizzaSize, number>
  category: string
  image: string
}

function Order() {
  const [loading, setLoading] = useState<boolean>(true)
  const [pizzas, setPizzas] = useState<IPizza[]>([])
  const [pizzaType, setPizzaType] = useState<string>('pepperoni')
  const [pizzaSize, setPizzaSize] = useState<PizzaSize>('M')
  let selectedPizza: IPizza | undefined = undefined
  let selectedPizzaPrice = 0

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('/api/pizzas')
      if (data) {
        setPizzas(
          data.sort((a: IPizza, b: IPizza) => a.name.localeCompare(b.name)),
        )
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return <>Loading...</>
  }

  selectedPizza = pizzas.find((pizza) => pizza.id === pizzaType)
  selectedPizzaPrice = selectedPizza?.sizes[pizzaSize] ?? 0

  return (
    <div className="order">
      <h2>Create Order</h2>
      <form>
        {/* Order Form */}
        <div>
          {/* Pizza Type */}
          <div>
            <label htmlFor="pizza-type">Pizza Type</label>
            <select
              name="pizza-type"
              value={pizzaType}
              onChange={(e) => setPizzaType(e.target.value)}
            >
              {pizzas.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          {/* Pizza Size */}
          <div>
            <label htmlFor="pizza-size">Pizza Size</label>
            <div>
              {PIZZA_SIZES.map(({ id, name, value }) => (
                <span key={id}>
                  <input
                    id={id}
                    name="pizza-size"
                    type="radio"
                    value={value}
                    defaultChecked={pizzaSize === value}
                    onChange={(e) => setPizzaSize(e.target.value as PizzaSize)}
                  />
                  <label htmlFor={id}>{name}</label>
                </span>
              ))}
            </div>
          </div>

          <button type="submit">Add to Cart</button>
        </div>

        {/* Selected Pizza */}
        {selectedPizza && (
          <div className="order-pizza">
            <Pizza
              name={selectedPizza.name}
              description={selectedPizza.description}
              image={selectedPizza.image}
            />
            <p>{intl.format(selectedPizzaPrice)}</p>
          </div>
        )}
      </form>
    </div>
  )
}

export default Order
