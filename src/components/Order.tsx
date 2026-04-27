import { useEffect, useState } from 'react'
import Pizza from './Pizza'
import axios from 'axios'
import { IPizza, PizzaSize } from '../types'
import { intl } from '../helpers'
import { PIZZA_SIZES } from '../constants'
import { usePizzas } from '../hooks/usePizzas'

function Order() {
  const [pizzaType, setPizzaType] = useState<string>('pepperoni')
  const [pizzaSize, setPizzaSize] = useState<PizzaSize>('M')
  const { pizzas, loading } = usePizzas()

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
