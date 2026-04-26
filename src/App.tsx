import { FC } from 'react'
import { createRoot } from 'react-dom/client'
import Pizza from './Pizza'

const App: FC = () => {
  return (
    <div>
      <Pizza
        name="The Big Meat Pizza"
        description="Bacon, Pepperoni, Italian Sausage, Chorizo Sausage"
        image="/public/pizzas/big_meat.webp"
      />
      <Pizza
        name="The Hawaiian Pizza"
        description="Sliced Ham, Pineapple, Mozzarella Cheese"
        image="/public/pizzas/hawaiian.webp"
      />
      <Pizza
        name="The Pepperoni Pizza"
        description="Mozzarella Cheese, Pepperoni"
        image="/public/pizzas/pepperoni.webp"
      />
    </div>
  )
}

const container = document.getElementById('root')
if (!container) {
  throw new Error('Root element not found')
}

const root = createRoot(container)
root.render(<App />)
