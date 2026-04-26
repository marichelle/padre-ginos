import { useEffect, useState } from 'react'
import Pizza from './Pizza'
import axios from 'axios'
import { IPizza, PizzaSize } from '../types'
import { intl } from '../helpers'
import { PIZZA_SIZES } from '../constants'

function Order() {
  const [loading, setLoading] = useState<boolean>(true)
  const [pizzas, setPizzas] = useState<IPizza[]>([])
  const [pizzaType, setPizzaType] = useState<string>('pepperoni')
  const [pizzaSize, setPizzaSize] = useState<PizzaSize>('M')

  const fetchData = async () => {
    // Simulate delay
    // await new Promise((resolve) => setTimeout(resolve, 5000))
    const { data } = await axios.get('/api/pizzas')
    setPizzas(data.sort((a: IPizza, b: IPizza) => a.name.localeCompare(b.name)))
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return <>Loading...</>
  }

  const selectedPizza = pizzas.find((pizza) => pizza.id === pizzaType)
  const selectedPizzaPrice = selectedPizza?.sizes[pizzaSize] ?? 0

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
