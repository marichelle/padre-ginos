import { ChangeEvent, useCallback, useState } from 'react'
import Pizza from './Pizza'

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

function Order() {
  const [pizzaSize, setPizzaSize] = useState<string>('M')
  const [pizzaType, setPizzaType] = useState<string>('pepperoni')

  return (
    <div className="order">
      <h2>Create Order</h2>
      <form>
        <div>
          <div>
            <label htmlFor="pizza-type">Pizza Type</label>
            <select
              name="pizza-type"
              value={pizzaType}
              onChange={(e) => setPizzaType(e.target.value)}
            >
              <option value="pepperoni">The Pepperoni Pizza</option>
              <option value="hawaiian">The Hawaiian Pizza</option>
              <option value="big_meat">The Big Meat Pizza</option>
            </select>
          </div>
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
                    onChange={(e) => setPizzaSize(e.target.value)}
                  />
                  <label htmlFor={id}>{name}</label>
                </span>
              ))}
            </div>
          </div>
          <button type="submit">Add to Cart</button>
        </div>
        <div className="order-pizza">
          <Pizza
            name="Pepperoni"
            description="Mozzarella Cheese, Pepperoni"
            image="/public/pizzas/pepperoni.webp"
          />
          <p>$13.37</p>
        </div>
      </form>
    </div>
  )
}

export default Order
