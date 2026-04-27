import { intl } from '../helpers'
import { ICartItem, ICartProps } from '../types'

function Cart({ cart, checkout }: ICartProps) {
  let cartTotal = cart.reduce((acc, cartItem) => acc + cartItem.price, 0)

  return (
    <div className="cart">
      <h2>Cart</h2>
      <ul>
        {cart.map(({ pizza, price, size }, index) => (
          <li key={index}>
            <span className="size">{size}</span> &nbsp;
            <span className="type">{pizza.name}</span> &nbsp;
            <span className="price">{intl.format(price)}</span>
          </li>
        ))}
      </ul>
      <p>Total: {intl.format(cartTotal)}</p>
      <button onClick={checkout}>Checkout</button>
    </div>
  )
}

export default Cart
