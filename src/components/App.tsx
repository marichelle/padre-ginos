import { FC, StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import Header from './Header'
import Order from './Order'
import PizzaOfTheDay from './PizzaOfTheDay'
import { CartContext } from '../contexts'
import { ICartItem } from '../types'

const App: FC = () => {
  const cartHook = useState<ICartItem[]>([])
  return (
    <StrictMode>
      <CartContext.Provider value={cartHook}>
        <div>
          <Header />
          <Order />
          <PizzaOfTheDay />
        </div>
      </CartContext.Provider>
    </StrictMode>
  )
}

const container = document.getElementById('root')
if (!container) {
  throw new Error('Root element not found')
}

const root = createRoot(container)
root.render(<App />)
