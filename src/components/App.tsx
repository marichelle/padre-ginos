import { FC, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Order from './Order'
import PizzaOfTheDay from './PizzaOfTheDay'

const App: FC = () => {
  return (
    <StrictMode>
      <div>
        <h1 className="logo">Padre Gino's</h1>
        <Order />
        <PizzaOfTheDay />
      </div>
    </StrictMode>
  )
}

const container = document.getElementById('root')
if (!container) {
  throw new Error('Root element not found')
}

const root = createRoot(container)
root.render(<App />)
