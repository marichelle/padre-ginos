import { SubmitEventHandler, useState } from 'react'
import Cart from './Cart'
import Pizza from './Pizza'
import { PIZZA_SIZES } from '../constants'
import { intl } from '../helpers'
import { usePizzas } from '../hooks/usePizzas'
import { ICartItem, PizzaSize } from '../types'
import axios from 'axios'

function Order() {
  const [cart, setCart] = useState<ICartItem[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [pizzaType, setPizzaType] = useState<string>('pepperoni')
  const [pizzaSize, setPizzaSize] = useState<PizzaSize>('M')
  const { pizzas, loading: fetching } = usePizzas()

  const checkout = async () => {
    setLoading(true)
    await axios.post('/api/order', { cart })
    setCart([])
    setLoading(false)
  }

  if (loading || fetching) {
    return <>Loading...</>
  }

  const selectedPizza = pizzas.find((pizza) => pizza.id === pizzaType)
  const selectedPizzaPrice = selectedPizza?.sizes[pizzaSize] ?? 0

  const handleSubmit: SubmitEventHandler = (e) => {
    e.preventDefault()
    setCart((prevCart) => {
      return selectedPizza
        ? [
            ...prevCart,
            {
              pizza: selectedPizza,
              price: selectedPizzaPrice,
              size: pizzaSize,
            },
          ]
        : prevCart
    })
  }

  return (
    <div className="order-page">
      <div className="order">
        <h2>Create Order</h2>
        <form onSubmit={handleSubmit}>
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
                      onChange={(e) =>
                        setPizzaSize(e.target.value as PizzaSize)
                      }
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
      {loading ? <h2>Loading...</h2> : <Cart cart={cart} checkout={checkout} />}
    </div>
  )
}

export default Order
